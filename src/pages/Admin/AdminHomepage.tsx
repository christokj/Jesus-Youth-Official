import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios, { AxiosError } from "axios";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import {
  FaCalendarCheck,
  FaCalendarDays,
  FaCopy,
  FaHandHoldingDollar,
  FaPhone,
  FaSpinner,
  FaUserCheck,
  FaUsers,
  FaWhatsapp,
} from "react-icons/fa6";
import { toast } from "sonner";
import Reveal from "../../components/Reveal";
import { axiosInstance } from "../../config/axiosInstance";
import { clearAdminSession, expireAdminSession, getAdminSessionExpiry } from "../../utils/adminAuth";

interface Student {
  _id: string;
  name: string;
  age: number;
  programYear?: number;
  unit: string;
  address: string;
  mobile: string;
  place: string;
  maritalStatus: string;
  dob: string;
  parish: string;
  gender: string;
  prayerRequest?: string;
  paid?: boolean;
  visited?: boolean;
  createdAt?: string;
}

interface Admin {
  _id: string;
  username: string;
  email: string;
  createdAt?: string;
}

type TabKey = "students" | "admins";
type FilterValue = "all" | "paid" | "unpaid" | "visited" | "not-visited";
type SortValue = "recent" | "name" | "age-high" | "age-low";

interface DeletedStudentBackup {
  backupId: string;
  deletedAt: number;
  expiresAt: number;
  student: Student;
}

const adminSessionDurationMs = 3 * 60 * 60 * 1000;
const deletedStudentsStorageKey = "adminDeletedStudentsBackup";
const deleteRecoveryWindowMs = 10 * 60 * 1000;

const formatTimeRemaining = (milliseconds: number) => {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, "0");
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${hours}:${minutes}:${seconds}`;
};

const formatRecoveryTimeRemaining = (milliseconds: number) => {
  const totalSeconds = Math.max(0, Math.floor(milliseconds / 1000));
  const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, "0");
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const formatDateFilterValue = (dateValue?: string) => {
  if (!dateValue) {
    return "";
  }

  const parsedDate = new Date(dateValue);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const year = parsedDate.getFullYear();
  const month = String(parsedDate.getMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const readDeletedStudentBackups = () => {
  const rawValue = localStorage.getItem(deletedStudentsStorageKey);

  if (!rawValue) {
    return [] as DeletedStudentBackup[];
  }

  try {
    const parsedValue = JSON.parse(rawValue) as DeletedStudentBackup[];
    const currentTime = Date.now();

    return parsedValue.filter((item) => item.expiresAt > currentTime);
  } catch {
    return [] as DeletedStudentBackup[];
  }
};

const writeDeletedStudentBackups = (backups: DeletedStudentBackup[]) => {
  localStorage.setItem(deletedStudentsStorageKey, JSON.stringify(backups));
};

const getApiErrorMessage = (error: unknown, fallbackMessage: string) => {
  if (error instanceof AxiosError) {
    return (
      (typeof error.response?.data?.message === "string" && error.response.data.message) ||
      error.message ||
      fallbackMessage
    );
  }

  return fallbackMessage;
};

const isHandledAdminAuthError = (error: unknown) =>
  axios.isCancel(error) || (error instanceof AxiosError && error.response?.status === 401);

function AdminHomepage() {
  const candidatesPerPage = 8;
  const navigate = useNavigate();
  const [students, setStudents] = useState<Student[]>([]);
  const [admins, setAdmins] = useState<Admin[]>([]);
  const [activeTab, setActiveTab] = useState<TabKey>("students");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedYear, setSelectedYear] = useState<2025 | 2026>(2026);
  const [genderFilter, setGenderFilter] = useState("all");
  const [unitFilter, setUnitFilter] = useState("all");
  const [parishFilter, setParishFilter] = useState("all");
  const [maritalFilter, setMaritalFilter] = useState("all");
  const [paymentFilter, setPaymentFilter] = useState<FilterValue>("all");
  const [visitedFilter, setVisitedFilter] = useState<FilterValue>("all");
  const [registrationDateFilter, setRegistrationDateFilter] = useState("");
  const [sortBy, setSortBy] = useState<SortValue>("recent");
  const [candidatePage, setCandidatePage] = useState(1);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [sessionTimeRemaining, setSessionTimeRemaining] = useState(adminSessionDurationMs);
  const [deletingStudentId, setDeletingStudentId] = useState<string | null>(null);
  const [deletingAdminId, setDeletingAdminId] = useState<string | null>(null);
  const [updatingPaidId, setUpdatingPaidId] = useState<string | null>(null);
  const [updatingVisitedId, setUpdatingVisitedId] = useState<string | null>(null);
  const [deletedStudentBackups, setDeletedStudentBackups] = useState<DeletedStudentBackup[]>([]);
  const [recoveryNow, setRecoveryNow] = useState(Date.now());
  const [restoringBackupId, setRestoringBackupId] = useState<string | null>(null);

  useEffect(() => {
    const expiryTime = getAdminSessionExpiry();
    if (expiryTime) {
      setSessionTimeRemaining(Math.max(0, expiryTime - Date.now()));
    }

    setDeletedStudentBackups(readDeletedStudentBackups());

    void Promise.all([fetchStudents(2026), fetchAdmins()]).finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const tick = () => {
      const expiryTime = getAdminSessionExpiry();

      if (!expiryTime) {
        expireAdminSession("Admin session information is missing. Please login again.");
        setSessionTimeRemaining(0);
        return;
      }

      const remainingTime = expiryTime - Date.now();

      if (remainingTime <= 0) {
        expireAdminSession("Admin session expired. Please login again.");
        setSessionTimeRemaining(0);
        return;
      }

      setSessionTimeRemaining(remainingTime);
    };

    tick();
    const intervalId = window.setInterval(tick, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      const nextValue = readDeletedStudentBackups();
      setDeletedStudentBackups(nextValue);
      setRecoveryNow(Date.now());
      writeDeletedStudentBackups(nextValue);
    }, 1000);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  const fetchStudents = async (year = selectedYear) => {
    try {
      const response = await axiosInstance.get<Student[]>("/admin/get-data", { params: { year } });
      setStudents(response.data);
      setSelectedStudentId((current) => current ?? response.data[0]?._id ?? null);
      return response.data;
    } catch (error: unknown) {
      if (isHandledAdminAuthError(error)) {
        return [] as Student[];
      }

      toast.error(getApiErrorMessage(error, "Failed to fetch candidates."));
      return [] as Student[];
    }
  };

  const fetchAdmins = async () => {
    try {
      const response = await axiosInstance.get<Admin[]>("/admin/get-admins");
      setAdmins(response.data);
    } catch (error: unknown) {
      if (isHandledAdminAuthError(error)) {
        return;
      }

      toast.error(getApiErrorMessage(error, "Failed to fetch admins."));
    }
  };

  useEffect(() => {
    void fetchStudents(selectedYear);
    setSelectedStudentId(null);
  }, [selectedYear]);

  const unitOptions = useMemo(() => ["all", ...new Set(students.map((student) => student.unit).filter(Boolean))], [students]);
  const parishOptions = useMemo(() => ["all", ...new Set(students.map((student) => student.parish).filter(Boolean))], [students]);
  const maritalOptions = useMemo(() => ["all", ...new Set(students.map((student) => student.maritalStatus).filter(Boolean))], [students]);

  const filteredStudents = useMemo(() => {
    const base = students.filter((student) => {
      const haystack = [student.name, student.unit, student.place, student.parish, student.mobile, student.address, student.gender, student.prayerRequest]
        .join(" ")
        .toLowerCase();

      const matchesSearch = haystack.includes(searchTerm.toLowerCase());
      const matchesGender = genderFilter === "all" || (student.gender || "").toLowerCase() === genderFilter.toLowerCase();
      const matchesUnit = unitFilter === "all" || student.unit === unitFilter;
      const matchesParish = parishFilter === "all" || student.parish === parishFilter;
      const matchesMarital = maritalFilter === "all" || student.maritalStatus === maritalFilter;
      const matchesPayment = paymentFilter === "all" || (paymentFilter === "paid" ? Boolean(student.paid) : !student.paid);
      const matchesVisited = visitedFilter === "all" || (visitedFilter === "visited" ? Boolean(student.visited) : !student.visited);
      const matchesRegistrationDate =
        !registrationDateFilter || formatDateFilterValue(student.createdAt) === registrationDateFilter;

      return matchesSearch && matchesGender && matchesUnit && matchesParish && matchesMarital && matchesPayment && matchesVisited && matchesRegistrationDate;
    });

    return [...base].sort((first, second) => {
      if (sortBy === "name") return first.name.localeCompare(second.name);
      if (sortBy === "age-high") return (second.age || 0) - (first.age || 0);
      if (sortBy === "age-low") return (first.age || 0) - (second.age || 0);
      return new Date(second.createdAt || "").getTime() - new Date(first.createdAt || "").getTime();
    });
  }, [students, searchTerm, genderFilter, unitFilter, parishFilter, maritalFilter, paymentFilter, visitedFilter, registrationDateFilter, sortBy]);

  const filteredAdmins = useMemo(
    () => admins.filter((admin) => [admin.username, admin.email].join(" ").toLowerCase().includes(searchTerm.toLowerCase())),
    [admins, searchTerm],
  );

  const totalCandidatePages = Math.max(1, Math.ceil(filteredStudents.length / candidatesPerPage));
  const paginatedStudents = useMemo(() => {
    const startIndex = (candidatePage - 1) * candidatesPerPage;
    return filteredStudents.slice(startIndex, startIndex + candidatesPerPage);
  }, [filteredStudents, candidatePage]);
  const currentPageStart = filteredStudents.length === 0 ? 0 : (candidatePage - 1) * candidatesPerPage + 1;
  const currentPageEnd = Math.min(candidatePage * candidatesPerPage, filteredStudents.length);

  useEffect(() => {
    setCandidatePage(1);
  }, [searchTerm, selectedYear, genderFilter, unitFilter, parishFilter, maritalFilter, paymentFilter, visitedFilter, registrationDateFilter, sortBy]);

  useEffect(() => {
    setCandidatePage((current) => Math.min(current, totalCandidatePages));
  }, [totalCandidatePages]);

  useEffect(() => {
    if (filteredStudents.length === 0) {
      setSelectedStudentId(null);
      return;
    }

    if (selectedStudentId && filteredStudents.some((student) => student._id === selectedStudentId)) {
      return;
    }

    setSelectedStudentId(paginatedStudents[0]?._id ?? filteredStudents[0]?._id ?? null);
  }, [filteredStudents, paginatedStudents, selectedStudentId]);

  const selectedStudent = filteredStudents.find((student) => student._id === selectedStudentId) ?? filteredStudents[0] ?? null;

  const topUnits = useMemo(
    () =>
      Object.entries(
        students.reduce<Record<string, number>>((accumulator, student) => {
          const key = student.unit || "Unassigned";
          accumulator[key] = (accumulator[key] || 0) + 1;
          return accumulator;
        }, {}),
      )
        .sort((a, b) => b[1] - a[1])
        .slice(0, 4),
    [students],
  );

  const recentRegistrations = useMemo(
    () => [...students].sort((a, b) => new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()).slice(0, 5),
    [students],
  );

  const updateStudentState = (id: string, patch: Partial<Student>) => {
    setStudents((current) => current.map((item) => (item._id === id ? { ...item, ...patch } : item)));
  };

  const handlePaidToggle = async (id: string, paid: boolean) => {
    setUpdatingPaidId(id);

    try {
      await axiosInstance.post("/admin/update-paid", { id, paid });
      updateStudentState(id, { paid });
      toast.success(`Marked as ${paid ? "paid" : "unpaid"}.`);
    } catch {
      toast.error("Unable to update paid status.");
    } finally {
      setUpdatingPaidId(null);
    }
  };

  const handleVisitedToggle = async (id: string, visited: boolean) => {
    setUpdatingVisitedId(id);

    try {
      await axiosInstance.post("/admin/update-visited", { id, visited });
      updateStudentState(id, { visited });
      toast.success(`Marked as ${visited ? "visited" : "not visited"}.`);
    } catch {
      toast.error("Unable to update visited status.");
    } finally {
      setUpdatingVisitedId(null);
    }
  };

  const handleGenderChange = async (id: string, gender: string) => {
    try {
      await axiosInstance.post("/admin/update-gender", { id, gender });
      updateStudentState(id, { gender });
      toast.success("Gender updated.");
    } catch {
      toast.error("Unable to update gender.");
    }
  };

  const handleDeleteStudent = async (student: Student) => {
    const confirmed = window.confirm(`Delete candidate "${student.name}" from ${selectedYear} registrations?`);
    if (!confirmed) return;

    const finalConfirmed = window.confirm(`This will remove "${student.name}" now. Do you want to continue?`);
    if (!finalConfirmed) return;

    setDeletingStudentId(student._id);

    try {
      await axiosInstance.delete(`/admin/delete-student/${student._id}`);
      const backupEntry: DeletedStudentBackup = {
        backupId: `${student._id}-${Date.now()}`,
        deletedAt: Date.now(),
        expiresAt: Date.now() + deleteRecoveryWindowMs,
        student,
      };
      const nextBackups = [backupEntry, ...readDeletedStudentBackups()].slice(0, 12);
      writeDeletedStudentBackups(nextBackups);
      setDeletedStudentBackups(nextBackups);
      setRecoveryNow(Date.now());
      setStudents((current) => current.filter((item) => item._id !== student._id));
      setSelectedStudentId((current) => (current === student._id ? null : current));
      toast.success("Candidate deleted. You can recover it for a short time.");
    } catch (error: unknown) {
      if (isHandledAdminAuthError(error)) {
        return;
      }

      toast.error(getApiErrorMessage(error, "Unable to delete candidate."));
    } finally {
      setDeletingStudentId(null);
    }
  };

  const handleDeleteAdmin = async (admin: Admin) => {
    const confirmed = window.confirm(`Delete admin "${admin.username}"?`);
    if (!confirmed) return;

    const finalConfirmed = window.confirm(`This will permanently remove admin "${admin.username}". Do you want to continue?`);
    if (!finalConfirmed) return;

    setDeletingAdminId(admin._id);

    try {
      await axiosInstance.delete(`/admin/delete-admin/${admin._id}`);
      setAdmins((current) => current.filter((item) => item._id !== admin._id));
      toast.success("Admin deleted successfully.");
    } catch (error: unknown) {
      if (isHandledAdminAuthError(error)) {
        return;
      }

      toast.error(getApiErrorMessage(error, "Unable to delete admin."));
    } finally {
      setDeletingAdminId(null);
    }
  };

  const handleRestoreStudent = async (backup: DeletedStudentBackup) => {
    setRestoringBackupId(backup.backupId);

    try {
      const { student } = backup;
      await axiosInstance.post("/user/register", {
        name: student.name,
        age: Number(student.age),
        unit: student.unit,
        address: student.address,
        mobile: student.mobile,
        place: student.place,
        maritalStatus: student.maritalStatus,
        dob: student.dob,
        parish: student.parish,
        gender: student.gender,
        prayerRequest: student.prayerRequest || "",
        programYear: student.programYear ?? selectedYear,
      });

      const refreshedStudents = await fetchStudents((student.programYear as 2025 | 2026 | undefined) ?? selectedYear);
      const restoredCandidate = [...refreshedStudents]
        .reverse()
        .find(
          (item) =>
            item.name === student.name &&
            String(item.mobile) === String(student.mobile) &&
            item.dob === student.dob &&
            item.programYear === (student.programYear ?? selectedYear),
        );

      if (student.paid && restoredCandidate?._id) {
        await axiosInstance.post("/admin/update-paid", { id: restoredCandidate._id, paid: true });
      }

      if (student.visited && restoredCandidate?._id) {
        await axiosInstance.post("/admin/update-visited", { id: restoredCandidate._id, visited: true });
      }

      const nextBackups = readDeletedStudentBackups().filter((item) => item.backupId !== backup.backupId);
      writeDeletedStudentBackups(nextBackups);
      setDeletedStudentBackups(nextBackups);
      setRecoveryNow(Date.now());
      await fetchStudents(selectedYear);
      toast.success("Candidate restored successfully.");
    } catch (error: unknown) {
      if (isHandledAdminAuthError(error)) {
        return;
      }

      toast.error(getApiErrorMessage(error, "Unable to restore candidate."));
    } finally {
      setRestoringBackupId(null);
    }
  };

  const downloadPdf = () => {
    const doc = new jsPDF("landscape");
    doc.text("Jesus Youth Chengaloor Registrations", 14, 20);
    autoTable(doc, {
      startY: 28,
      head: [["Name", "Unit", "Mobile", "Place", "Parish", "Gender", "Prayer Request", "Paid", "Visited"]],
      body: filteredStudents.map((student) => [student.name, student.unit, String(student.mobile), student.place, student.parish, student.gender || "Not set", student.prayerRequest || "-", student.paid ? "Yes" : "No", student.visited ? "Yes" : "No"]),
    });
    doc.save("jesus-youth-registrations.pdf");
  };

  const downloadCsv = () => {
    const headers = ["Name", "Age", "Unit", "Mobile", "Place", "Parish", "Gender", "Marital Status", "Prayer Request", "Paid", "Visited"];
    const rows = filteredStudents.map((student) => [student.name, student.age, student.unit, student.mobile, student.place, student.parish, student.gender, student.maritalStatus, student.prayerRequest || "", student.paid ? "Yes" : "No", student.visited ? "Yes" : "No"]);
    const csv = [headers, ...rows].map((row) => row.map((value) => `"${String(value ?? "").replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "jesus-youth-registrations.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  const copyMobile = async (mobile: string) => {
    try {
      await navigator.clipboard.writeText(String(mobile));
      toast.success("Mobile number copied.");
    } catch {
      toast.error("Could not copy mobile number.");
    }
  };

  const openWhatsApp = (mobile: string, name: string) => {
    const cleaned = String(mobile).replace(/\D/g, "");
    const finalMobile = cleaned.length === 10 ? `91${cleaned}` : cleaned;
    const message = `Praise the Lord ${name}, this is Jesus Youth Chengaloor regarding your registration.`;
    window.open(`https://wa.me/${finalMobile}?text=${encodeURIComponent(message)}`, "_blank");
  };

  const resetFilters = () => {
    setSearchTerm("");
    setGenderFilter("all");
    setUnitFilter("all");
    setParishFilter("all");
    setMaritalFilter("all");
    setPaymentFilter("all");
    setVisitedFilter("all");
    setRegistrationDateFilter("");
    setSortBy("recent");
  };

  const logout = () => {
    clearAdminSession();
    toast.success("Logged out successfully.");
    navigate("/");
  };

  return (
    <section className="section shell dashboard-shell">
      <Reveal className="dashboard-hero glass-panel">
        <div>
          <span className="eyebrow">Admin dashboard</span>
          <h1>Steward registrations for program year {selectedYear} with clarity.</h1>
          <p>Old and new candidates are now separated by year, so you can manage {selectedYear} registrations without mixing them with another batch.</p>
          <div className="dashboard-session-timer">
            <span className="status-badge">Auto logout in {formatTimeRemaining(sessionTimeRemaining)}</span>
          </div>
        </div>
        <div className="dashboard-hero__actions">
          <button type="button" className="button button--secondary" onClick={downloadPdf}>Export PDF</button>
          <button type="button" className="button button--secondary" onClick={downloadCsv}>Export CSV</button>
          <button type="button" className="button button--primary" onClick={logout}>Logout</button>
        </div>
      </Reveal>

      <div className="dashboard-stats">
        <div className="glass-panel stat-card"><span>Total candidates</span><strong>{students.length}</strong></div>
        <div className="glass-panel stat-card"><span>Paid</span><strong>{students.filter((item) => item.paid).length}</strong></div>
        <div className="glass-panel stat-card"><span>Visited</span><strong>{students.filter((item) => item.visited).length}</strong></div>
        <div className="glass-panel stat-card"><span>Pending follow-up</span><strong>{students.filter((item) => !item.visited).length}</strong></div>
        <div className="glass-panel stat-card"><span>Admins</span><strong>{admins.length}</strong></div>
      </div>

      <div className="dashboard-overview">
        <Reveal className="glass-panel dashboard-summary">
          <div className="dashboard-summary__header">
            <h2>Registration insights</h2>
            <span>{students.length > 0 ? "Live from the database" : "Waiting for registrations"}</span>
          </div>
          <div className="dashboard-insights-grid">
            <div className="insight-block">
              <div className="insight-block__icon"><FaUsers /></div>
              <div>
                <strong>Top units</strong>
                {topUnits.length > 0 ? topUnits.map(([unit, count]) => <span key={unit}>{unit}: {count}</span>) : <span>No unit data yet</span>}
              </div>
            </div>
            <div className="insight-block">
              <div className="insight-block__icon"><FaCalendarDays /></div>
              <div>
                <strong>Recent registrations</strong>
                {recentRegistrations.length > 0 ? recentRegistrations.map((student) => <span key={student._id}>{student.name} • {student.unit}</span>) : <span>No recent registrations yet</span>}
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal className="glass-panel dashboard-summary" delay={100}>
          <div className="dashboard-summary__header">
            <h2>Quick actions</h2>
            <span>Keep the workflow moving</span>
          </div>
          <div className="dashboard-quick-actions">
            <button type="button" className="button button--primary" onClick={() => navigate("/admin-register")}>Add candidate</button>
            <button type="button" className="button button--ghost" onClick={() => fetchStudents(selectedYear)}>Refresh current year</button>
            <button type="button" className="button button--ghost" onClick={fetchAdmins}>Refresh admin data</button>
          </div>
        </Reveal>
      </div>

      {deletedStudentBackups.length > 0 ? (
        <Reveal className="glass-panel dashboard-summary" delay={140}>
          <div className="dashboard-summary__header">
            <h2>Recently deleted candidates</h2>
            <span>Recovery available for {Math.floor(deleteRecoveryWindowMs / 60000)} minutes only</span>
          </div>
          <div className="dashboard-list">
            {deletedStudentBackups.map((backup) => (
              <article key={backup.backupId} className="dashboard-item">
                <div className="dashboard-item__content">
                  <div>
                    <h3>{backup.student.name}</h3>
                    <p>
                      {(backup.student.programYear ?? "Unknown year")} • {backup.student.unit} • {backup.student.place}
                    </p>
                  </div>
                  <span className="status-badge">
                    Recover in {formatRecoveryTimeRemaining(backup.expiresAt - recoveryNow)}
                  </span>
                </div>
                <div className="dashboard-item__meta">
                  <span>Mobile: {backup.student.mobile}</span>
                  <span>Parish: {backup.student.parish}</span>
                </div>
                <div className="dashboard-item__actions">
                  <button
                    type="button"
                    className="button button--primary"
                    onClick={() => handleRestoreStudent(backup)}
                    disabled={restoringBackupId === backup.backupId}
                  >
                    {restoringBackupId === backup.backupId ? "Restoring..." : "Restore Candidate"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </Reveal>
      ) : null}

      <div className="glass-panel dashboard-panel">
        <div className="dashboard-panel__toolbar">
          <div className="tab-switcher">
            <button type="button" className={activeTab === "students" ? "is-active" : ""} onClick={() => setActiveTab("students")}>Candidates</button>
            <button type="button" className={activeTab === "admins" ? "is-active" : ""} onClick={() => setActiveTab("admins")}>Admins</button>
          </div>
          <label className="field field--compact">
            <span>Program year</span>
            <select value={selectedYear} onChange={(event) => setSelectedYear(Number(event.target.value) as 2025 | 2026)}>
              <option value={2026}>2026 new candidates</option>
              <option value={2025}>2025 previous candidates</option>
            </select>
          </label>
          <label className="field field--compact">
            <span>Search</span>
            <input value={searchTerm} onChange={(event) => setSearchTerm(event.target.value)} placeholder={activeTab === "students" ? "Search name, unit, place, parish, mobile, prayer request" : "Search admin records"} />
          </label>
        </div>

        {loading ? (
          <div className="dashboard-empty">Loading dashboard data...</div>
        ) : activeTab === "students" ? (
          <>
            <div className="dashboard-filters">
              <label className="field"><span>Gender</span><select value={genderFilter} onChange={(event) => setGenderFilter(event.target.value)}><option value="all">All</option><option value="male">Male</option><option value="female">Female</option><option value="other">Other</option></select></label>
              <label className="field"><span>Unit</span><select value={unitFilter} onChange={(event) => setUnitFilter(event.target.value)}>{unitOptions.map((option) => <option key={option} value={option}>{option === "all" ? "All units" : option}</option>)}</select></label>
              <label className="field"><span>Parish</span><select value={parishFilter} onChange={(event) => setParishFilter(event.target.value)}>{parishOptions.map((option) => <option key={option} value={option}>{option === "all" ? "All parishes" : option}</option>)}</select></label>
              <label className="field"><span>Marital status</span><select value={maritalFilter} onChange={(event) => setMaritalFilter(event.target.value)}>{maritalOptions.map((option) => <option key={option} value={option}>{option === "all" ? "All statuses" : option}</option>)}</select></label>
              <label className="field"><span>Payment</span><select value={paymentFilter} onChange={(event) => setPaymentFilter(event.target.value as FilterValue)}><option value="all">All</option><option value="paid">Paid</option><option value="unpaid">Unpaid</option></select></label>
              <label className="field"><span>Visit status</span><select value={visitedFilter} onChange={(event) => setVisitedFilter(event.target.value as FilterValue)}><option value="all">All</option><option value="visited">Visited</option><option value="not-visited">Not visited</option></select></label>
              <label className="field"><span>Registration date</span><input type="date" value={registrationDateFilter} onChange={(event) => setRegistrationDateFilter(event.target.value)} /></label>
              <label className="field"><span>Sort by</span><select value={sortBy} onChange={(event) => setSortBy(event.target.value as SortValue)}><option value="recent">Most recent</option><option value="name">Name</option><option value="age-high">Age high to low</option><option value="age-low">Age low to high</option></select></label>
              <button type="button" className="button button--ghost" onClick={resetFilters}>Reset filters</button>
            </div>

            <div className="dashboard-results">
              <div className="dashboard-results__count">
                Showing {currentPageStart}-{currentPageEnd} of {filteredStudents.length} filtered candidates for {selectedYear}
              </div>
              <div className="badge-group">
                <span className="status-badge"><FaUserCheck />{students.filter((item) => item.paid).length} paid</span>
                <span className="status-badge"><FaCalendarDays />{students.filter((item) => item.visited).length} visited</span>
              </div>
            </div>

            <div className="dashboard-candidates-layout">
              <div className="dashboard-list">
                {filteredStudents.length === 0 ? (
                  <div className="dashboard-empty">No candidates found for the current filters.</div>
                ) : (
                  paginatedStudents.map((student) => (
                    <article key={student._id} className={`dashboard-item ${selectedStudent?._id === student._id ? "is-selected" : ""}`}>
                      <button type="button" className="dashboard-item__select" onClick={() => setSelectedStudentId(student._id)}>
                        <div className="dashboard-item__content">
                          <div>
                            <h3>{student.name}</h3>
                            <p>{student.unit} • {student.place} • {student.parish}</p>
                          </div>
                          <div className="badge-group">
                            <span className={`status-badge ${student.paid ? "is-success" : ""}`}>{student.paid ? "Paid" : "Unpaid"}</span>
                            <span className={`status-badge ${student.visited ? "is-success" : ""}`}>{student.visited ? "Visited" : "Not visited"}</span>
                          </div>
                        </div>
                        <div className="dashboard-item__meta">
                          <span>Mobile: {student.mobile}</span>
                          <span>Gender: {student.gender || "Not set"}</span>
                          <span>Age: {student.age}</span>
                        </div>
                      </button>
                      <div className="dashboard-item__actions">
                        <button
                          type="button"
                          className={`dashboard-icon-button ${student.paid ? "is-active is-paid" : ""}`.trim()}
                          onClick={() => handlePaidToggle(student._id, !student.paid)}
                          disabled={updatingPaidId === student._id}
                          aria-label={student.paid ? "Mark as unpaid" : "Mark as paid"}
                          title={student.paid ? "Mark as unpaid" : "Mark as paid"}
                        >
                          {updatingPaidId === student._id ? <FaSpinner className="is-spinning" /> : <FaHandHoldingDollar />}
                          <span>{student.paid ? "Paid" : "Mark Paid"}</span>
                        </button>
                        <button
                          type="button"
                          className={`dashboard-icon-button ${student.visited ? "is-active is-visited" : ""}`.trim()}
                          onClick={() => handleVisitedToggle(student._id, !student.visited)}
                          disabled={updatingVisitedId === student._id}
                          aria-label={student.visited ? "Mark as not visited" : "Mark as visited"}
                          title={student.visited ? "Mark as not visited" : "Mark as visited"}
                        >
                          {updatingVisitedId === student._id ? <FaSpinner className="is-spinning" /> : <FaCalendarCheck />}
                          <span>{student.visited ? "Visited" : "Mark Visited"}</span>
                        </button>
                        <button
                          type="button"
                          className="dashboard-icon-button"
                          onClick={() => copyMobile(student.mobile)}
                          aria-label="Copy mobile number"
                          title="Copy mobile number"
                        >
                          <FaCopy />
                          <span>Copy</span>
                        </button>
                        <button
                          type="button"
                          className="button button--danger"
                          onClick={() => handleDeleteStudent(student)}
                          disabled={deletingStudentId === student._id}
                        >
                          {deletingStudentId === student._id ? "Deleting..." : "Delete"}
                        </button>
                      </div>
                    </article>
                  ))
                )}

                {filteredStudents.length > 0 ? (
                  <div className="dashboard-pagination glass-panel">
                    <div className="dashboard-pagination__summary">
                      <strong>Page {candidatePage} of {totalCandidatePages}</strong>
                      <span>Newest registrations appear first.</span>
                    </div>
                    <div className="dashboard-pagination__controls">
                      <button type="button" className="button button--ghost" onClick={() => setCandidatePage((current) => Math.max(1, current - 1))} disabled={candidatePage === 1}>
                        Previous
                      </button>
                      <button type="button" className="button button--ghost" onClick={() => setCandidatePage((current) => Math.min(totalCandidatePages, current + 1))} disabled={candidatePage === totalCandidatePages}>
                        Next
                      </button>
                    </div>
                  </div>
                ) : null}
              </div>

              <aside className="dashboard-detail glass-panel">
                {selectedStudent ? (
                  <>
                    <div className="dashboard-detail__header">
                      <div>
                        <span className="eyebrow">Candidate profile</span>
                        <h2>{selectedStudent.name}</h2>
                        <p>Registered on {selectedStudent.createdAt ? new Date(selectedStudent.createdAt).toLocaleDateString() : "N/A"}</p>
                      </div>
                      <div className="badge-group">
                        <span className={`status-badge ${selectedStudent.paid ? "is-success" : ""}`}>{selectedStudent.paid ? "Paid" : "Unpaid"}</span>
                        <span className={`status-badge ${selectedStudent.visited ? "is-success" : ""}`}>{selectedStudent.visited ? "Visited" : "Not visited"}</span>
                      </div>
                    </div>

                    <div className="dashboard-detail__grid">
                      <div><strong>Unit</strong><span>{selectedStudent.unit || "N/A"}</span></div>
                      <div><strong>Parish</strong><span>{selectedStudent.parish || "N/A"}</span></div>
                      <div><strong>Place</strong><span>{selectedStudent.place || "N/A"}</span></div>
                      <div><strong>Age</strong><span>{selectedStudent.age || "N/A"}</span></div>
                      <div><strong>Date of birth</strong><span>{selectedStudent.dob || "N/A"}</span></div>
                      <div><strong>Marital status</strong><span>{selectedStudent.maritalStatus || "N/A"}</span></div>
                      <div className="dashboard-detail__full"><strong>Address</strong><span>{selectedStudent.address || "N/A"}</span></div>
                      <div><strong>Mobile</strong><span>{selectedStudent.mobile || "N/A"}</span></div>
                      <div>
                        <strong>Gender</strong>
                        <select className="dashboard-inline-select" value={selectedStudent.gender || ""} onChange={(event) => handleGenderChange(selectedStudent._id, event.target.value)}>
                          <option value="">Select gender</option><option value="Male">Male</option><option value="Female">Female</option><option value="Other">Other</option>
                        </select>
                      </div>
                      <div className="dashboard-detail__full"><strong>Prayer request</strong><span>{selectedStudent.prayerRequest?.trim() || "None shared"}</span></div>
                    </div>

                    <div className="dashboard-detail__actions">
                      <a className="button button--secondary" href={`tel:${selectedStudent.mobile}`}><FaPhone /> Call</a>
                      <button type="button" className="button button--secondary" onClick={() => openWhatsApp(selectedStudent.mobile, selectedStudent.name)}><FaWhatsapp /> WhatsApp</button>
                      <button
                        type="button"
                        className="button button--danger"
                        onClick={() => handleDeleteStudent(selectedStudent)}
                        disabled={deletingStudentId === selectedStudent._id}
                      >
                        {deletingStudentId === selectedStudent._id ? "Deleting..." : "Delete Candidate"}
                      </button>
                    </div>
                  </>
                ) : (
                  <div className="dashboard-empty">Select a candidate to view full profile details.</div>
                )}
              </aside>
            </div>
          </>
        ) : (
          <div className="dashboard-list">
            {filteredAdmins.length === 0 ? (
              <div className="dashboard-empty">No admins found.</div>
            ) : (
              filteredAdmins.map((admin) => (
                <article key={admin._id} className="dashboard-item">
                  <div className="dashboard-item__content">
                    <div><h3>{admin.username}</h3><p>{admin.email}</p></div>
                    <span className="status-badge is-success">Admin account</span>
                  </div>
                  <div className="dashboard-item__meta"><span>Created: {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : "N/A"}</span></div>
                  <div className="dashboard-item__actions">
                    <button
                      type="button"
                      className="button button--danger"
                      onClick={() => handleDeleteAdmin(admin)}
                      disabled={deletingAdminId === admin._id}
                    >
                      {deletingAdminId === admin._id ? "Deleting..." : "Delete Admin"}
                    </button>
                  </div>
                </article>
              ))
            )}
          </div>
        )}
      </div>
    </section>
  );
}

export default AdminHomepage;

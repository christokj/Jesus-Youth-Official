import { ChangeEvent, FormEvent, WheelEvent, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import Reveal from "./Reveal";
import { axiosInstance } from "../config/axiosInstance";

const unitOptions = [
  "St George",
  "St Paul",
  "Kalvari",
  "St John",
  "Rose Mystica",
  "Francis Assisi",
  "Kochuthresya",
  "Jesus Christ",
  "Christhuraj",
  "St Joseph",
  "Cherupushpam",
  "Lourde Matha",
  "Thiruhrudayam",
  "Thirukkudumbam",
  "St Antony's",
  "Karmalamatha",
  "Mother Theresa",
  "St Jude",
  "Chavara Kuriakose",
  "St Raphael",
  "Alphonsamma",
  "Mariam Thresya",
  "Merimatha",
  "St Sebastian",
  "St Xavier",
  "Vyakulamatha",
  "St Michael",
  "Vimalahrudayam",
  "St Thomas",
  "Other",
];

const parishOptions = ["Chengaloor", "Other"] as const;

interface RegistrationFormData {
  name: string;
  age: string;
  unit: string;
  address: string;
  mobile: string;
  place: string;
  maritalStatus: string;
  dob: string;
  parish: string;
  parishOther: string;
  gender: string;
  prayerRequest: string;
}

type FormErrors = Partial<Record<keyof RegistrationFormData, string>>;

interface CandidateSuggestion {
  _id: string;
  name: string;
  unit?: string;
  place?: string;
  mobile?: number;
}

interface CandidateDetails {
  _id: string;
  name: string;
  age: number;
  unit: string;
  address: string;
  mobile: number;
  place: string;
  maritalStatus: string;
  dob: string;
  parish: string;
  gender: string;
  prayerRequest?: string;
}

interface RegistrationFormProps {
  enablePreviousYearLookup?: boolean;
  eyebrow: string;
  title: string;
  description?: string;
  successMessage: string;
  successRedirectTo: string;
  submitLabel?: string;
}

const initialForm: RegistrationFormData = {
  name: "",
  age: "",
  unit: "",
  address: "",
  mobile: "",
  place: "",
  maritalStatus: "",
  dob: "",
  parish: "",
  parishOther: "",
  gender: "",
  prayerRequest: "",
};

const registrationYear = 2026;

function RegistrationForm({
  enablePreviousYearLookup = false,
  eyebrow,
  title,
  description,
  successMessage,
  successRedirectTo,
  submitLabel = "Complete Registration",
}: RegistrationFormProps) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<RegistrationFormData>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [candidateMatches, setCandidateMatches] = useState<CandidateSuggestion[]>([]);
  const [isSearchingCandidates, setIsSearchingCandidates] = useState(false);
  const [isHydratingCandidate, setIsHydratingCandidate] = useState(false);
  const [showCandidateDropdown, setShowCandidateDropdown] = useState(false);
  const activeRequestRef = useRef(0);

  const ageNote = useMemo(() => "For this form, the accepted age is 30 or below.", []);
  const isOtherParishSelected = formData.parish === "Other";
  const [mainTitle, titleAccent] = useMemo(() => {
    const [head, ...rest] = title.split(",");
    const accent = rest.join(",").trim();

    return [head.trim(), accent];
  }, [title]);

  const getParishFormState = (parish: string) => {
    if (parishOptions.includes(parish as (typeof parishOptions)[number])) {
      return {
        parish,
        parishOther: "",
      };
    }

    return {
      parish: "Other",
      parishOther: parish,
    };
  };

  const preventNumberInputScroll = (event: WheelEvent<HTMLInputElement>) => {
    event.currentTarget.blur();
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;

    if (name === "name" && enablePreviousYearLookup) {
      setShowCandidateDropdown(true);
    }

    if (name === "parish") {
      setFormData((current) => ({
        ...current,
        parish: value,
        parishOther: value === "Other" ? current.parishOther : "",
      }));
      setErrors((current) => ({ ...current, parish: undefined, parishOther: undefined }));
      return;
    }

    setFormData((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  useEffect(() => {
    if (!enablePreviousYearLookup) {
      return;
    }

    const candidateName = formData.name.trim();

    if (candidateName.length < 2) {
      setCandidateMatches([]);
      setShowCandidateDropdown(false);
      setIsSearchingCandidates(false);
      return;
    }

    const requestId = activeRequestRef.current + 1;
    activeRequestRef.current = requestId;
    setIsSearchingCandidates(true);

    const timeoutId = window.setTimeout(async () => {
      try {
        const response = await axiosInstance.get<CandidateSuggestion[]>("/user/previous-year/search", {
          params: { name: candidateName },
        });

        if (activeRequestRef.current !== requestId) {
          return;
        }

        setCandidateMatches(response.data);
        setShowCandidateDropdown(true);
      } catch {
        if (activeRequestRef.current !== requestId) {
          return;
        }

        setCandidateMatches([]);
      } finally {
        if (activeRequestRef.current === requestId) {
          setIsSearchingCandidates(false);
        }
      }
    }, 250);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [enablePreviousYearLookup, formData.name]);

  const handleCandidateSelect = async (candidateId: string) => {
    setIsHydratingCandidate(true);

    try {
      const response = await axiosInstance.get<CandidateDetails>(`/user/previous-year/${candidateId}`);
      const candidate = response.data;
      const parishState = getParishFormState(candidate.parish || "");

      setFormData({
        name: candidate.name || "",
        age: candidate.age ? String(candidate.age) : "",
        unit: candidate.unit || "",
        address: candidate.address || "",
        mobile: candidate.mobile ? String(candidate.mobile) : "",
        place: candidate.place || "",
        maritalStatus: candidate.maritalStatus || "",
        dob: candidate.dob || "",
        parish: parishState.parish,
        parishOther: parishState.parishOther,
        gender: candidate.gender || "",
        prayerRequest: candidate.prayerRequest || "",
      });
      setErrors({});
      setCandidateMatches([]);
      setShowCandidateDropdown(false);
      toast.success("Candidate details loaded from 2025 registration.");
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof error.response === "object" &&
          error.response !== null &&
          "data" in error.response &&
          typeof error.response.data === "object" &&
          error.response.data !== null &&
          "message" in error.response.data
          ? String(error.response.data.message)
          : "Unable to load candidate details.";
      toast.error(message);
    } finally {
      setIsHydratingCandidate(false);
    }
  };

  const validateForm = () => {
    const nextErrors: FormErrors = {};
    const phoneRegex = /^[6-9]\d{9}$/;
    const age = Number(formData.age);

    if (!formData.name.trim()) nextErrors.name = "Full name is required.";
    if (!phoneRegex.test(formData.mobile)) nextErrors.mobile = "Enter a valid 10-digit mobile number.";
    if (!formData.place.trim()) nextErrors.place = "Place is required.";
    if (!formData.address.trim()) nextErrors.address = "Address is required.";
    if (!formData.unit) nextErrors.unit = "Please choose a unit.";
    if (!formData.maritalStatus) nextErrors.maritalStatus = "Please choose marital status.";
    if (!formData.parish) nextErrors.parish = "Please choose a parish.";
    if (formData.parish === "Other" && !formData.parishOther.trim()) nextErrors.parishOther = "Please enter your parish name.";
    if (!formData.gender) nextErrors.gender = "Please choose a gender.";
    if (!formData.dob) nextErrors.dob = "Date of birth is required.";
    if (!Number.isFinite(age) || age < 1 || age > 50) nextErrors.age = "Age must be between 1 and 50.";

    setErrors(nextErrors);
    const validationMessages = Object.values(nextErrors).filter(Boolean);

    if (validationMessages.length > 0) {
      toast.error(validationMessages[0] ?? "Please correct the highlighted form errors.");
    }

    return validationMessages.length === 0;
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting || !validateForm()) return;

    setIsSubmitting(true);
    try {
      await axiosInstance.post("/user/register", {
        ...formData,
        age: Number(formData.age),
        parish: formData.parish === "Other" ? formData.parishOther.trim() : formData.parish,
        programYear: registrationYear,
      });
      toast.success(successMessage);
      navigate(successRedirectTo);
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
          error !== null &&
          "response" in error &&
          typeof error.response === "object" &&
          error.response !== null &&
          "data" in error.response &&
          typeof error.response.data === "object" &&
          error.response.data !== null &&
          "message" in error.response.data
          ? String(error.response.data.message)
          : "Unable to submit the registration right now.";
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="section shell section--tight">
      <Reveal className="page-header page-header--centered">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className={titleAccent ? "page-header__title-lockup" : undefined}>
          <span className={titleAccent ? "page-header__title-main" : undefined}>{mainTitle}</span>
          {titleAccent ? <small className="page-header__title-accent">{titleAccent}</small> : null}
        </h1>
      </Reveal>

      <Reveal delay={120}>
        <form className="glass-panel form-panel" onSubmit={handleSubmit} autoComplete="off">
          <div className="form-grid">
            <label className={`field ${enablePreviousYearLookup ? "field--dropdown" : ""}`.trim()}>
              <span>Full name</span>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                onFocus={() => enablePreviousYearLookup && setShowCandidateDropdown(formData.name.trim().length >= 2)}
                placeholder="Enter your name"
              />
              {enablePreviousYearLookup && showCandidateDropdown && formData.name.trim().length >= 2 && (
                <div className="field-dropdown">
                  {isSearchingCandidates ? (
                    <button type="button" className="field-dropdown__item field-dropdown__item--status" disabled>
                      Searching 2025 registrations...
                    </button>
                  ) : candidateMatches.length > 0 ? (
                    candidateMatches.map((candidate) => (
                      <button
                        key={candidate._id}
                        type="button"
                        className="field-dropdown__item"
                        onClick={() => void handleCandidateSelect(candidate._id)}
                        disabled={isHydratingCandidate}
                      >
                        <strong>{candidate.name}</strong>
                        <span>{[candidate.unit, candidate.place, candidate.mobile].filter(Boolean).join(" • ")}</span>
                      </button>
                    ))
                  ) : (
                    <button type="button" className="field-dropdown__item field-dropdown__item--status" disabled>
                      No matching 2025 registrations found.
                    </button>
                  )}
                </div>
              )}
              {errors.name && <small>{errors.name}</small>}
            </label>

            <label className="field">
              <span>Age</span>
              <input
                name="age"
                type="number"
                value={formData.age}
                onChange={handleChange}
                onWheel={preventNumberInputScroll}
                min={1}
                max={50}
                placeholder="Enter age"
              />
              {errors.age ? <small>{errors.age}</small> : <em>{ageNote}</em>}
            </label>

            <label className="field">
              <span>Mobile number</span>
              <input
                name="mobile"
                type="tel"
                value={formData.mobile}
                onChange={handleChange}
                placeholder="10-digit mobile number"
              />
              {errors.mobile && <small>{errors.mobile}</small>}
            </label>

            <label className="field">
              <span>Place</span>
              <input name="place" value={formData.place} onChange={handleChange} placeholder="Your place" />
              {errors.place && <small>{errors.place}</small>}
            </label>

            <label className="field">
              <span>Date of birth</span>
              <input name="dob" type="date" value={formData.dob} onChange={handleChange} />
              {errors.dob && <small>{errors.dob}</small>}
            </label>

            <label className="field">
              <span>Unit</span>
              <select name="unit" value={formData.unit} onChange={handleChange}>
                <option value="">Choose a unit</option>
                {unitOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.unit && <small>{errors.unit}</small>}
            </label>

            <label className="field">
              <span>Marital status</span>
              <select name="maritalStatus" value={formData.maritalStatus} onChange={handleChange}>
                <option value="">Select status</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
                <option value="Divorced">Divorced</option>
                <option value="Widowed">Widowed</option>
              </select>
              {errors.maritalStatus && <small>{errors.maritalStatus}</small>}
            </label>

            <label className="field">
              <span>Parish</span>
              <select name="parish" value={formData.parish} onChange={handleChange}>
                <option value="">Select parish</option>
                {parishOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
              {errors.parish && <small>{errors.parish}</small>}
            </label>

            {isOtherParishSelected ? (
              <label className="field">
                <span>Type your parish</span>
                <input
                  name="parishOther"
                  value={formData.parishOther}
                  onChange={handleChange}
                  placeholder="Enter your parish name"
                />
                {errors.parishOther && <small>{errors.parishOther}</small>}
              </label>
            ) : null}

            <label className="field">
              <span>Gender</span>
              <select name="gender" value={formData.gender} onChange={handleChange}>
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.gender && <small>{errors.gender}</small>}
            </label>

            <label className="field field--full">
              <span>Address</span>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                rows={5}
                placeholder="Enter your address"
              />
              {errors.address && <small>{errors.address}</small>}
            </label>

            <label className="field field--full">
              <span>Prayer request (optional)</span>
              <textarea
                name="prayerRequest"
                value={formData.prayerRequest}
                onChange={handleChange}
                rows={4}
                placeholder="Share any prayer intention you'd like us to remember."
              />
            </label>
          </div>

          <div className="form-panel__actions">
            <button type="submit" className="button button--primary" disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : submitLabel}
            </button>
          </div>

          {isHydratingCandidate && <p className="form-panel__hint">Loading selected candidate details...</p>}
        </form>
      </Reveal>
    </section>
  );
}

export default RegistrationForm;

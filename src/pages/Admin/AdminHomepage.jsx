import React, { useEffect, useState, useMemo } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';
import {
    Box, Typography, TextField, Button, Grid, Card, CardContent, CircularProgress,
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, MenuItem,
    FormControl, InputLabel, Tooltip, IconButton, Switch, FormControlLabel,
    Divider, Tabs, Tab, TablePagination, Chip
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import DownloadIcon from '@mui/icons-material/Download';
import LogoutIcon from '@mui/icons-material/Logout';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import GroupIcon from '@mui/icons-material/Group';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SearchIcon from '@mui/icons-material/Search';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import FilterListIcon from '@mui/icons-material/FilterList';
import RefreshIcon from '@mui/icons-material/Refresh';
import PersonIcon from '@mui/icons-material/Person';

function AdminHomepage() {
    const [students, setStudents] = useState([]);
    const [admins, setAdmins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const navigate = useNavigate();

    // Candidate Filters
    const [searchTerm, setSearchTerm] = useState('');
    const [filterPaid, setFilterPaid] = useState('all');
    const [filterVisited, setFilterVisited] = useState('all');
    const [filterGender, setFilterGender] = useState('all');
    const [filterUnit, setFilterUnit] = useState('all');
    const [filterParish, setFilterParish] = useState('all');
    const [filterMarital, setFilterMarital] = useState('all');

    // Pagination - Candidates
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    // Pagination - Admins
    const [adminPage, setAdminPage] = useState(0);
    const [adminRowsPerPage, setAdminRowsPerPage] = useState(10);

    // Admin search
    const [adminSearchTerm, setAdminSearchTerm] = useState('');

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/admin-login');
        else {
            fetchStudentData();
            fetchAdminData();
        }
    }, [navigate]);

    const fetchStudentData = async () => {
        try {
            const response = await axiosInstance.get('/admin/get-data');
            setStudents(response.data);
        } catch (error) {
            toast.error('Failed to fetch students');
        } finally {
            setLoading(false);
        }
    };

    const fetchAdminData = async () => {
        try {
            const response = await axiosInstance.get('/admin/get-admins');
            setAdmins(response.data);
        } catch (error) {
            toast.error('Failed to fetch admins');
        }
    };

    // Derive unique values for filter dropdowns
    const uniqueUnits = useMemo(() => [...new Set(students.map(s => s.unit).filter(Boolean))].sort(), [students]);
    const uniqueParishes = useMemo(() => [...new Set(students.map(s => s.parish).filter(Boolean))].sort(), [students]);
    const uniqueMaritalStatuses = useMemo(() => [...new Set(students.map(s => s.maritalStatus).filter(Boolean))].sort(), [students]);

    // Filtered students
    const filteredStudents = useMemo(() => {
        return students.filter(student => {
            const matchesName = student.name?.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesPaid = filterPaid === 'all' || (filterPaid === 'paid' ? student.paid : !student.paid);
            const matchesVisited = filterVisited === 'all' || (filterVisited === 'visited' ? student.visited : !student.visited);
            const matchesGender = filterGender === 'all' || student.gender?.toLowerCase() === filterGender.toLowerCase();
            const matchesUnit = filterUnit === 'all' || student.unit === filterUnit;
            const matchesParish = filterParish === 'all' || student.parish === filterParish;
            const matchesMarital = filterMarital === 'all' || student.maritalStatus === filterMarital;
            return matchesName && matchesPaid && matchesVisited && matchesGender && matchesUnit && matchesParish && matchesMarital;
        });
    }, [students, searchTerm, filterPaid, filterVisited, filterGender, filterUnit, filterParish, filterMarital]);

    // Filtered admins
    const filteredAdmins = useMemo(() => {
        return admins.filter(admin =>
            admin.username?.toLowerCase().includes(adminSearchTerm.toLowerCase()) ||
            admin.email?.toLowerCase().includes(adminSearchTerm.toLowerCase())
        );
    }, [admins, adminSearchTerm]);

    // Paginated slices
    const paginatedStudents = useMemo(() => {
        return filteredStudents.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);
    }, [filteredStudents, page, rowsPerPage]);

    const paginatedAdmins = useMemo(() => {
        return filteredAdmins.slice(adminPage * adminRowsPerPage, adminPage * adminRowsPerPage + adminRowsPerPage);
    }, [filteredAdmins, adminPage, adminRowsPerPage]);

    const resetFilters = () => {
        setSearchTerm('');
        setFilterPaid('all');
        setFilterVisited('all');
        setFilterGender('all');
        setFilterUnit('all');
        setFilterParish('all');
        setFilterMarital('all');
        setPage(0);
    };

    const activeFilterCount = [filterPaid, filterVisited, filterGender, filterUnit, filterParish, filterMarital].filter(f => f !== 'all').length + (searchTerm ? 1 : 0);

    const handlePaidToggle = async (id, paid) => {
        if (!window.confirm('Are you sure?')) return;
        try {
            await axiosInstance.post('/admin/update-paid', { id, paid });
            setStudents(prev => prev.map(s => s._id === id ? { ...s, paid } : s));
            toast.success(`Marked as ${paid ? 'Paid' : 'Unpaid'}`);
        } catch { toast.error('Failed to update paid status'); }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) return;
        try {
            await axiosInstance.delete(`/admin/delete-student/${id}`);
            setStudents(prev => prev.filter(s => s._id !== id));
            toast.success('Student deleted successfully');
        } catch { toast.error('Failed to delete student'); }
    };

    const handleDeleteAdmin = async (id) => {
        if (!window.confirm('Are you sure you want to delete this admin?')) return;
        try {
            await axiosInstance.delete(`/admin/delete-admin/${id}`);
            setAdmins(prev => prev.filter(a => a._id !== id));
            toast.success('Admin deleted successfully');
        } catch { toast.error('Failed to delete admin'); }
    };

    const handleGenderChange = async (id, gender) => {
        if (!window.confirm(`Change gender to ${gender}?`)) return;
        try {
            await axiosInstance.post('/admin/update-gender', { id, gender });
            setStudents(prev => prev.map(s => s._id === id ? { ...s, gender } : s));
            toast.success('Gender updated successfully');
        } catch { toast.error('Failed to update gender'); }
    };

    const handleWhatsappInvite = (mobile, gender) => {
        if (!gender) { toast.error('Please select a gender before sending invite.'); return; }
        let inviteLink = '';
        if (gender.toLowerCase() === 'male') inviteLink = 'https://chat.whatsapp.com/Iy7qeRNVStV32le7sEYxC6';
        else if (gender.toLowerCase() === 'female') inviteLink = 'https://chat.whatsapp.com/DS7wiLO1EsFHJR1tJvGqUM';
        else { toast.error('Only Male or Female gender are allowed for group invites.'); return; }
        let cleanedMobile = mobile.toString().replace(/\D/g, '');
        if (cleanedMobile.length === 10) cleanedMobile = '91' + cleanedMobile;
        else if (!cleanedMobile.startsWith('91')) { toast.error('Invalid mobile number.'); return; }
        const message = `Hi! Join our Rooted in Christ 2k25 WhatsApp group: ${inviteLink}`;
        window.open(`https://wa.me/${cleanedMobile}?text=${encodeURIComponent(message)}`, '_blank');
    };

    const handleVisitedToggle = async (id, visited) => {
        if (!window.confirm('Are you sure you want to change the visited status?')) return;
        try {
            await axiosInstance.post('/admin/update-visited', { id, visited });
            setStudents(prev => prev.map(s => s._id === id ? { ...s, visited } : s));
            toast.success(`Marked as ${visited ? 'Visited' : 'Not Visited'}`);
        } catch { toast.error('Failed to update visited status'); }
    };

    const downloadPDF = () => {
        const doc = new jsPDF('landscape');
        doc.text('Students Data', 14, 20);
        const tableColumn = ['No.', 'Name', 'Age', 'Unit', 'Address', 'Mobile', 'Place', 'Marital Status', 'DOB', 'Parish', 'Gender', 'Paid', 'Visited', 'Date'];
        const tableRows = filteredStudents.map((student, index) => ([
            index + 1, student.name, student.age || '', student.unit || '', student.address || '',
            student.mobile || '', student.place || '', student.maritalStatus || '', student.dob || '',
            student.parish || '', student.gender || '', student.paid ? 'Yes' : 'No',
            student.visited ? 'Yes' : 'No', new Date(student.createdAt).toLocaleDateString()
        ]));
        autoTable(doc, { head: [tableColumn], body: tableRows, startY: 30, styles: { fontSize: 8, cellPadding: 2 }, columnStyles: { 0: { cellWidth: 10 } } });
        doc.save('students_data.pdf');
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
        toast.success('Logged out successfully');
    };

    // Reusable styles
    const headCellSx = { bgcolor: '#090325', color: '#aaa6c3', fontWeight: 'bold', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em' };
    const bodyCellSx = { borderBottom: '1px solid rgba(255,255,255,0.05)' };
    const filterSelectSx = { minWidth: 140, '& .MuiSelect-select': { py: 1 } };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: 'background.default' }}>
                <CircularProgress color="primary" />
            </Box>
        );
    }

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default", pt: { xs: 10, md: 12 }, pb: 8, px: { xs: 2, md: 4 } }}>
            <Toaster position="top-center" richColors />

            <Box sx={{ maxWidth: 1400, mx: "auto" }}>
                {/* Header */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4, flexWrap: 'wrap', gap: 2 }}>
                    <Typography variant="h3" sx={{ color: "white", fontWeight: "bold" }}>
                        Admin Dashboard
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                        <Button variant="outlined" startIcon={<DownloadIcon />} onClick={downloadPDF}
                            sx={{ color: "text.primary", borderColor: "rgba(145, 94, 255, 0.5)" }}>
                            Download PDF
                        </Button>
                        <Button variant="contained" color="error" startIcon={<LogoutIcon />} onClick={logout}>
                            Logout
                        </Button>
                    </Box>
                </Box>

                {/* KPI Cards */}
                <Grid container spacing={3} sx={{ mb: 4 }}>
                    {[
                        { label: 'Total Candidates', value: students.length, icon: <GroupIcon color="primary" fontSize="large" />, bgColor: 'rgba(145, 94, 255, 0.1)' },
                        { label: 'Total Paid', value: students.filter(s => s.paid).length, icon: <PaymentIcon sx={{ color: '#00cea8' }} fontSize="large" />, bgColor: 'rgba(0, 206, 168, 0.1)' },
                        { label: 'Total Visited', value: students.filter(s => s.visited).length, icon: <CheckCircleIcon sx={{ color: '#ec008c' }} fontSize="large" />, bgColor: 'rgba(236, 0, 140, 0.1)' },
                        { label: 'Total Admins', value: admins.length, icon: <AdminPanelSettingsIcon sx={{ color: '#FFD700' }} fontSize="large" />, bgColor: 'rgba(255, 215, 0, 0.1)' },
                    ].map((card, i) => (
                        <Grid item xs={6} sm={3} key={i}>
                            <Card sx={{ bgcolor: "background.paper", border: "1px solid rgba(145, 94, 255, 0.2)", borderRadius: '16px' }}>
                                <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                    <Box sx={{ bgcolor: card.bgColor, p: 2, borderRadius: '50%' }}>
                                        {card.icon}
                                    </Box>
                                    <Box>
                                        <Typography variant="body2" color="text.secondary">{card.label}</Typography>
                                        <Typography variant="h4" color="white" fontWeight="bold">{card.value}</Typography>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>

                {/* Tabs */}
                <Card sx={{ bgcolor: "background.paper", border: "1px solid rgba(145, 94, 255, 0.2)", borderRadius: '16px', overflow: 'hidden' }}>
                    <Tabs value={activeTab} onChange={(e, v) => setActiveTab(v)}
                        sx={{
                            bgcolor: 'rgba(0,0,0,0.3)',
                            '& .MuiTab-root': { color: '#aaa6c3', fontWeight: 600, textTransform: 'none', fontSize: '1rem' },
                            '& .Mui-selected': { color: '#915EFF' },
                            '& .MuiTabs-indicator': { backgroundColor: '#915EFF', height: 3 }
                        }}>
                        <Tab icon={<PersonIcon />} iconPosition="start" label="Manage Candidates" />
                        <Tab icon={<AdminPanelSettingsIcon />} iconPosition="start" label="Manage Admins" />
                    </Tabs>

                    {/* ============ TAB 0: CANDIDATES ============ */}
                    {activeTab === 0 && (
                        <Box>
                            {/* Filter Bar */}
                            <Box sx={{ p: 2, bgcolor: 'rgba(0,0,0,0.15)' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                                    <FilterListIcon sx={{ color: '#915EFF' }} />
                                    <Typography variant="subtitle1" color="white" fontWeight="bold">
                                        Filters
                                    </Typography>
                                    {activeFilterCount > 0 && (
                                        <Chip label={`${activeFilterCount} active`} size="small" color="primary" sx={{ ml: 1 }} />
                                    )}
                                    <Box sx={{ flexGrow: 1 }} />
                                    <Button size="small" startIcon={<RefreshIcon />} onClick={resetFilters}
                                        sx={{ color: '#aaa6c3', textTransform: 'none' }}>
                                        Reset All
                                    </Button>
                                </Box>

                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6} md={3}>
                                        <TextField
                                            placeholder="Search by name..."
                                            value={searchTerm}
                                            onChange={(e) => { setSearchTerm(e.target.value); setPage(0); }}
                                            fullWidth size="small"
                                            InputProps={{ startAdornment: <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} /> }}
                                        />
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={1.5}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Paid</InputLabel>
                                            <Select value={filterPaid} label="Paid" onChange={(e) => { setFilterPaid(e.target.value); setPage(0); }} sx={filterSelectSx}>
                                                <MenuItem value="all">All</MenuItem>
                                                <MenuItem value="paid">Paid</MenuItem>
                                                <MenuItem value="unpaid">Unpaid</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={1.5}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Visited</InputLabel>
                                            <Select value={filterVisited} label="Visited" onChange={(e) => { setFilterVisited(e.target.value); setPage(0); }} sx={filterSelectSx}>
                                                <MenuItem value="all">All</MenuItem>
                                                <MenuItem value="visited">Visited</MenuItem>
                                                <MenuItem value="not_visited">Not Visited</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={1.5}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Gender</InputLabel>
                                            <Select value={filterGender} label="Gender" onChange={(e) => { setFilterGender(e.target.value); setPage(0); }} sx={filterSelectSx}>
                                                <MenuItem value="all">All</MenuItem>
                                                <MenuItem value="Male">Male</MenuItem>
                                                <MenuItem value="Female">Female</MenuItem>
                                                <MenuItem value="Other">Other</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={1.5}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Unit</InputLabel>
                                            <Select value={filterUnit} label="Unit" onChange={(e) => { setFilterUnit(e.target.value); setPage(0); }} sx={filterSelectSx}>
                                                <MenuItem value="all">All Units</MenuItem>
                                                {uniqueUnits.map(u => <MenuItem key={u} value={u}>{u}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={1.5}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Parish</InputLabel>
                                            <Select value={filterParish} label="Parish" onChange={(e) => { setFilterParish(e.target.value); setPage(0); }} sx={filterSelectSx}>
                                                <MenuItem value="all">All Parishes</MenuItem>
                                                {uniqueParishes.map(p => <MenuItem key={p} value={p}>{p}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={6} sm={4} md={1.5}>
                                        <FormControl fullWidth size="small">
                                            <InputLabel>Marital</InputLabel>
                                            <Select value={filterMarital} label="Marital" onChange={(e) => { setFilterMarital(e.target.value); setPage(0); }} sx={filterSelectSx}>
                                                <MenuItem value="all">All</MenuItem>
                                                {uniqueMaritalStatuses.map(m => <MenuItem key={m} value={m}>{m}</MenuItem>)}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </Box>

                            <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

                            {/* Results info */}
                            <Box sx={{ px: 3, py: 1, display: 'flex', alignItems: 'center', bgcolor: 'rgba(0,0,0,0.1)' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Showing {paginatedStudents.length} of {filteredStudents.length} candidates
                                    {filteredStudents.length !== students.length && ` (filtered from ${students.length} total)`}
                                </Typography>
                            </Box>

                            <TableContainer>
                                <Table stickyHeader aria-label="candidates table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={headCellSx}>No.</TableCell>
                                            <TableCell sx={headCellSx}>Name</TableCell>
                                            <TableCell sx={headCellSx}>Contact</TableCell>
                                            <TableCell sx={headCellSx}>Gender</TableCell>
                                            <TableCell sx={headCellSx}>Status</TableCell>
                                            <TableCell sx={headCellSx} align="center">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedStudents.length > 0 ? (
                                            paginatedStudents.map((student, index) => (
                                                <TableRow hover key={student._id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                                    <TableCell sx={bodyCellSx}>{page * rowsPerPage + index + 1}</TableCell>
                                                    <TableCell sx={{ ...bodyCellSx, color: 'white', fontWeight: 'bold' }}>
                                                        {student.name}
                                                        <Typography variant="caption" display="block" color="text.secondary">
                                                            Age: {student.age} | {student.maritalStatus}
                                                        </Typography>
                                                        <Typography variant="caption" display="block" color="primary.main">
                                                            {student.unit} • {student.parish}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell sx={bodyCellSx}>
                                                        <Typography variant="body2">{student.mobile}</Typography>
                                                        <Typography variant="caption" color="text.secondary">{student.place}</Typography>
                                                    </TableCell>
                                                    <TableCell sx={bodyCellSx}>
                                                        <FormControl size="small" variant="outlined" sx={{ minWidth: 100 }}>
                                                            <Select value={student.gender || ''} onChange={(e) => handleGenderChange(student._id, e.target.value)}
                                                                displayEmpty sx={{ color: 'white', bgcolor: 'rgba(255,255,255,0.05)' }}>
                                                                <MenuItem value="" disabled>Select</MenuItem>
                                                                <MenuItem value="Male">Male</MenuItem>
                                                                <MenuItem value="Female">Female</MenuItem>
                                                                <MenuItem value="Other">Other</MenuItem>
                                                            </Select>
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell sx={bodyCellSx}>
                                                        <FormControlLabel
                                                            control={<Switch checked={student.paid || false} onChange={(e) => handlePaidToggle(student._id, e.target.checked)} color="primary" size="small" />}
                                                            label={<Typography variant="body2">Paid</Typography>}
                                                            sx={{ display: 'block', mb: 0.5 }}
                                                        />
                                                        <FormControlLabel
                                                            control={<Switch checked={student.visited || false} onChange={(e) => handleVisitedToggle(student._id, e.target.checked)} color="success" size="small" />}
                                                            label={<Typography variant="body2">Visited</Typography>}
                                                            sx={{ display: 'block' }}
                                                        />
                                                    </TableCell>
                                                    <TableCell align="center" sx={bodyCellSx}>
                                                        <Tooltip title="Send WhatsApp Invite">
                                                            <IconButton color="success" onClick={() => handleWhatsappInvite(student.mobile, student.gender)} size="small">
                                                                <WhatsAppIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                                                    No candidates found matching your filters.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <TablePagination
                                component="div"
                                count={filteredStudents.length}
                                page={page}
                                onPageChange={(e, newPage) => setPage(newPage)}
                                rowsPerPage={rowsPerPage}
                                onRowsPerPageChange={(e) => { setRowsPerPage(parseInt(e.target.value, 10)); setPage(0); }}
                                rowsPerPageOptions={[5, 10, 25, 50, 100]}
                                sx={{
                                    borderTop: '1px solid rgba(255,255,255,0.05)',
                                    color: '#aaa6c3',
                                    '& .MuiTablePagination-selectIcon': { color: '#aaa6c3' },
                                    '& .MuiTablePagination-actions button': { color: '#aaa6c3' },
                                }}
                            />
                        </Box>
                    )}

                    {/* ============ TAB 1: ADMINS ============ */}
                    {activeTab === 1 && (
                        <Box>
                            <Box sx={{ p: 3, display: 'flex', alignItems: 'center', bgcolor: 'rgba(0,0,0,0.2)', gap: 2, flexWrap: 'wrap' }}>
                                <SearchIcon sx={{ color: 'text.secondary' }} />
                                <TextField
                                    variant="standard"
                                    placeholder="Search admins by name or email..."
                                    value={adminSearchTerm}
                                    onChange={(e) => { setAdminSearchTerm(e.target.value); setAdminPage(0); }}
                                    fullWidth
                                    InputProps={{ disableUnderline: true, sx: { color: 'white', fontSize: '1.1rem' } }}
                                />
                                <Button variant="outlined" size="small" onClick={() => navigate('/admin-signup')}
                                    sx={{ color: '#915EFF', borderColor: '#915EFF', textTransform: 'none', whiteSpace: 'nowrap' }}>
                                    + Add Admin
                                </Button>
                            </Box>
                            <Divider sx={{ borderColor: 'rgba(255,255,255,0.05)' }} />

                            <Box sx={{ px: 3, py: 1, display: 'flex', alignItems: 'center', bgcolor: 'rgba(0,0,0,0.1)' }}>
                                <Typography variant="body2" color="text.secondary">
                                    Showing {paginatedAdmins.length} of {filteredAdmins.length} admins
                                </Typography>
                            </Box>

                            <TableContainer>
                                <Table stickyHeader aria-label="admins table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell sx={headCellSx}>No.</TableCell>
                                            <TableCell sx={headCellSx}>Username</TableCell>
                                            <TableCell sx={headCellSx}>Email</TableCell>
                                            <TableCell sx={headCellSx}>Created</TableCell>
                                            <TableCell sx={headCellSx} align="center">Actions</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {paginatedAdmins.length > 0 ? (
                                            paginatedAdmins.map((admin, index) => (
                                                <TableRow hover key={admin._id}>
                                                    <TableCell sx={bodyCellSx}>{adminPage * adminRowsPerPage + index + 1}</TableCell>
                                                    <TableCell sx={{ ...bodyCellSx, color: 'white', fontWeight: 'bold' }}>
                                                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                                            <AdminPanelSettingsIcon sx={{ color: '#FFD700', fontSize: 20 }} />
                                                            {admin.username}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell sx={bodyCellSx}>
                                                        <Typography variant="body2" color="text.secondary">{admin.email}</Typography>
                                                    </TableCell>
                                                    <TableCell sx={bodyCellSx}>
                                                        <Typography variant="body2" color="text.secondary">
                                                            {admin.createdAt ? new Date(admin.createdAt).toLocaleDateString() : 'N/A'}
                                                        </Typography>
                                                    </TableCell>
                                                    <TableCell align="center" sx={bodyCellSx}>
                                                        <Tooltip title="Delete Admin">
                                                            <IconButton color="error" onClick={() => handleDeleteAdmin(admin._id)} size="small">
                                                                <DeleteIcon />
                                                            </IconButton>
                                                        </Tooltip>
                                                    </TableCell>
                                                </TableRow>
                                            ))
                                        ) : (
                                            <TableRow>
                                                <TableCell colSpan={5} align="center" sx={{ py: 6, color: 'text.secondary' }}>
                                                    No admins found.
                                                </TableCell>
                                            </TableRow>
                                        )}
                                    </TableBody>
                                </Table>
                            </TableContainer>

                            <TablePagination
                                component="div"
                                count={filteredAdmins.length}
                                page={adminPage}
                                onPageChange={(e, newPage) => setAdminPage(newPage)}
                                rowsPerPage={adminRowsPerPage}
                                onRowsPerPageChange={(e) => { setAdminRowsPerPage(parseInt(e.target.value, 10)); setAdminPage(0); }}
                                rowsPerPageOptions={[5, 10, 25]}
                                sx={{
                                    borderTop: '1px solid rgba(255,255,255,0.05)',
                                    color: '#aaa6c3',
                                    '& .MuiTablePagination-selectIcon': { color: '#aaa6c3' },
                                    '& .MuiTablePagination-actions button': { color: '#aaa6c3' },
                                }}
                            />
                        </Box>
                    )}
                </Card>
            </Box>
        </Box>
    );
}

export default AdminHomepage;

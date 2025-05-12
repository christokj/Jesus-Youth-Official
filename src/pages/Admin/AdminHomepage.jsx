import React, { useEffect, useState } from 'react';
import { axiosInstance } from '../../config/axiosInstance';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'sonner';

function AdminHomepage() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) navigate('/admin-login');
        else fetchStudentData();
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

    const handlePaidToggle = async (id, paid) => {
        if (!window.confirm('Are you sure ')) return;
        try {
            await axiosInstance.post('/admin/update-paid', { id, paid });
            setStudents(prev =>
                prev.map(student =>
                    student._id === id ? { ...student, paid } : student
                )
            );
            toast.success(`Marked as ${paid ? 'Paid' : 'Unpaid'}`);
        } catch {
            toast.error('Failed to update paid status');
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Are you sure you want to delete this student?')) return;
        try {
            await axiosInstance.delete(`/admin/delete-student/${id}`);
            setStudents(prev => prev.filter(student => student._id !== id));
            toast.success('Student deleted successfully');
        } catch (error) {
            toast.error('Failed to delete student');
        }
    };

    const downloadPDF = () => {
        const doc = new jsPDF('landscape');
        doc.text('Students Data', 14, 20);
        const tableColumn = [
            'No.', 'Name', 'Age', 'Unit', 'Address', 'Mobile',
            'Place', 'Marital Status', 'DOB', 'Parish', 'Gender', 'Date/Time'
        ];
        const tableRows = filteredStudents.map((student, index) => ([
            index + 1,
            student.name,
            student.age || '',
            student.unit || '',
            student.address || '',
            student.mobile || '',
            student.place || '',
            student.maritalStatus || '',
            student.dob || '',
            student.parish || '',
            student.gender || '',
            new Date(student.createdAt).toLocaleString()
        ]));
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            styles: { fontSize: 9, cellPadding: 3 },
            columnStyles: { 0: { cellWidth: 10 } }
        });
        doc.save('students_data.pdf');
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
        toast.success('Logged out successfully');
    };

    const filteredStudents = students.filter(student =>
        student.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6 pt-16">
            <Toaster position="top-center" richColors />

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center max-w-6xl mx-auto mb-6 gap-4">
                <h1 className="text-3xl font-bold text-blue-600">Admin - Students List</h1>
                <div className="flex items-center gap-2">
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name..."
                        className="input input-bordered input-sm w-52"
                    />
                    <button onClick={logout} className="btn btn-primary btn-outline btn-sm normal-case">
                        Logout
                    </button>
                    <button onClick={downloadPDF} className="btn btn-primary btn-outline btn-sm normal-case">
                        Download
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {filteredStudents.length > 0 ? (
                    filteredStudents.map((student, index) => (
                        <div key={student._id} className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-all">
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">
                                    {index + 1}. {student.name}
                                </h2>
                                <div className="flex items-center gap-2">
                                    <label className="flex items-center gap-1">
                                        <input
                                            type="checkbox"
                                            checked={student.paid || false}
                                            onChange={(e) => handlePaidToggle(student._id, e.target.checked)}
                                            className="toggle toggle-sm"
                                        />
                                        <span className="text-sm">{student.paid ? 'Paid' : 'Unpaid'}</span>
                                    </label>
                                    <button
                                        onClick={() => handleDelete(student._id)}
                                        className="btn btn-xs btn-error text-white"
                                        title="Delete student"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 gap-2 text-gray-600">
                                <p><span className="font-bold">Age:</span> {student.age}</p>
                                <p><span className="font-bold">Unit:</span> {student.unit}</p>
                                <p><span className="font-bold">Address:</span> {student.address}</p>
                                <p><span className="font-bold">Mobile:</span> {student.mobile}</p>
                                <p><span className="font-bold">Place:</span> {student.place}</p>
                                <p><span className="font-bold">Marital Status:</span> {student.maritalStatus}</p>
                                <p><span className="font-bold">DOB:</span> {student.dob}</p>
                                <p><span className="font-bold">Parish:</span> {student.parish}</p>
                                {student.gender && <p><span className="font-bold">Gender:</span> {student.gender}</p>}
                                {student.createdAt && (
                                    <p><span className="font-bold">Date/Time:</span> {new Date(student.createdAt).toLocaleString()}</p>
                                )}
                            </div>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-center col-span-2">No students found.</p>
                )}
            </div>
        </div>
    );
}

export default AdminHomepage;

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

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/admin-login');
        } else {
            fetchStudentData();
        }
    }, [navigate]);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/');
        toast.success('Logged out successfully');
    };

    const downloadPDF = () => {
        const doc = new jsPDF('landscape');
        doc.text('Students Data', 14, 20);
        const tableColumn = [
            'No.', 'Name', 'Age', 'Unit', 'Address', 'Mobile',
            'Place', 'Marital Status', 'DOB', 'Parish'
        ];
        const tableRows = filteredStudents.map((student, index) => ([
            index + 1, student.name, student.age, student.unit, student.address,
            student.mobile, student.place, student.maritalStatus,
            student.dob, student.parish
        ]));
        autoTable(doc, {
            head: [tableColumn],
            body: tableRows,
            startY: 30,
            styles: {
                fontSize: 9,         // optional: slightly smaller text for more space
                cellPadding: 3       // optional: controls padding inside cells
            },
            columnStyles: {
                0: { cellWidth: 10 },   // No.
                1: { cellWidth: 30 },   // Name
                2: { cellWidth: 15 },   // Age
                3: { cellWidth: 40 },   // Unit
                4: { cellWidth: 40 },   // Address
                5: { cellWidth: 25 },   // Mobile
                6: { cellWidth: 30 },   // Place
                7: { cellWidth: 25 },   // Marital Status
                8: { cellWidth: 25 },   // DOB
                9: { cellWidth: 25 }    // Parish
            }
        });
        doc.save('students_data.pdf');
    };

    const filteredStudents = students.filter(student =>
        student.name.toLowerCase().includes(searchTerm.toLowerCase())
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
                        <div key={index} className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-all">
                            <div className="flex justify-between items-start">
                                <h2 className="text-xl font-semibold mb-4 text-gray-700">{student.name}</h2>
                                {/* Optional: Delete button */}
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

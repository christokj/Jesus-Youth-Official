import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../config/axiosInstance';

function AdminHomepage() {
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Replace with your actual API URL
        axiosInstance.get("https://your-api-url.com/api/students")
            .then((response) => {
                setStudents(response.data); // Assuming API returns an array of student objects
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error fetching students:", error);
                setLoading(false);
            });
    }, []);

    const downloadPDF = () => {
        const doc = new jsPDF();

        doc.text("Students Data", 14, 20);

        const tableColumn = ["Name", "Age", "Unit", "Address", "Mobile", "Place", "Marital Status", "DOB", "Parish"];
        const tableRows = [];

        students.forEach((student) => {
            const studentData = [
                student.name,
                student.age,
                student.unit,
                student.address,
                student.mobile,
                student.place,
                student.maritalStatus,
                student.dob,
                student.parish,
            ];
            tableRows.push(studentData);
        });

        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 30,
        });

        doc.save("students_data.pdf");
    };


    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <span className="loading loading-spinner loading-lg text-blue-500"></span>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="flex justify-between items-center max-w-6xl mx-auto mb-6">
                <h1 className="text-3xl font-bold text-blue-600">Admin - Students List</h1>
                <button
                    onClick={downloadPDF}
                    className="btn btn-primary btn-sm normal-case"
                >
                    Download PDF
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
                {students.map((student, index) => (
                    <div key={index} className="bg-white shadow-md rounded-2xl p-6 hover:shadow-xl transition-all">
                        <h2 className="text-xl font-semibold mb-4 text-gray-700">{student.name}</h2>
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
                ))}
            </div>
        </div>
    )
}

export default AdminHomepage
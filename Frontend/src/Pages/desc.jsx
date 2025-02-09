import React, { useEffect, useState } from 'react';
import './desc.css'; // Assuming there's a CSS file for styles

const DentalDoctorsList = () => {
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                const response = await fetch('API_ENDPOINT_HERE'); // Replace with actual API endpoint
                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchDoctors();
    }, []);

    if (loading) return <div>Loading...</div>;

    return (
        <div className='doctors-list'>
            <h1>Available Dental Doctors</h1>
            <ul>
                {doctors.map((doctor) => (
                    <li key={doctor.id} className='doctor-item'>
                        <h2>{doctor.name}</h2>
                        <p>{doctor.specialization}</p>
                        <p>{doctor.contact}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DentalDoctorsList;
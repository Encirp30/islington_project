import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './profile.css';

interface IUser {
    _id: string;
    username: string;
    email?: string;
    phone?: string;
    address?: string;
    createdAt?: string;
}

export default function Profile() {
    const [user, setUser] = useState<IUser | null>(null);
    const { id } = useParams(); // user id from URL

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem("token");
                const res = await axios.get(`http://localhost:3000/api/auth/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUser(res.data);
            } catch (err) {
                console.error("Failed to load profile", err);
            }
        };

        fetchProfile();
    }, [id]);

    if (!user) return <div>Loading...</div>;

    return (
        <div className="profile-container">
            <h1>User Profile</h1>
            <p><strong>Username:</strong> {user.username}</p>
            <p><strong>Email:</strong> {user.email || "N/A"}</p>
            <p><strong>Phone:</strong> {user.phone || "N/A"}</p>
            <p><strong>Address:</strong> {user.address || "N/A"}</p>
            <p><strong>Joined:</strong> {new Date(user.createdAt || "").toLocaleDateString()}</p>
        </div>
    );
}

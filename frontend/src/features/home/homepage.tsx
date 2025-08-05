import { useState, useEffect } from 'react';
import './homepage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';


interface IUser{
    _id:string,
    username:string,
    email:string,
}

export default function Home() {
    const [search, setSearch] = useState('');
    const [users, setUsers] = useState<IUser[]>([]);
    const navigate = useNavigate();

    const handleLogin = () => {
        navigate('/');
    };

    //  Fetch users from backend
    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const token = localStorage.getItem("token"); // Assuming you store JWT here
                const res = await axios.get(`http://localhost:3000/api/auth/search?q=${search}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setUsers(res.data);
            } catch (err) {
                console.error('Failed to fetch users', err);
            }
        };

        fetchUsers();
    }, [search]); // Triggers API call whenever search changes

    return (
        <>
            <div className="header">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search..."
                    className="search-bar"
                />

                <button onClick={handleLogin}>Login</button>
            </div>

            <div className="home-container">
                <div className="user-list">
                    {users.map(user => (
                        <div key={user._id} className="user-card">
                            <h3>{user.username}</h3>
                            <p>{user.email || "Email not available"}</p>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

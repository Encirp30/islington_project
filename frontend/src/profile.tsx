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
    const { id } = useParams();

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
            <h1>PROFILE</h1>
            
            <div className="profile-content">
                <div className="avatar-section">
                    <div className="avatar">
                        <span>{user.username?.slice(0, 2).toUpperCase() || 'AK'}</span>
                    </div>
                    
                    <div className="upload-section">
                        <h3>Connect with me</h3>
                        <div className="social-links">
                            <a href="#" className="social-link facebook">
                                <i className="fab fa-facebook-f"></i>
                                Facebook
                            </a>
                            <a href="#" className="social-link linkedin">
                                <i className="fab fa-linkedin-in"></i>
                                LinkedIn
                            </a>
                            <a href="#" className="social-link github">
                                <i className="fab fa-github"></i>
                                GitHub
                            </a>
                            <a href="#" className="social-link twitter">
                                <i className="fab fa-twitter"></i>
                                Twitter
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="info-section">
                    <div className="info-card">
                        <h3>
                            <i className="fas fa-user"></i>
                            Personal Information
                        </h3>
                        <div className="info-item">
                            <div className="info-label">Username:</div>
                            <div className="info-value">{user.username}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Email:</div>
                            <div className="info-value">{user.email || "Santosh07@gmail.com"}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Phone:</div>
                            <div className="info-value">{user.phone || "+1 (123) 456-7890"}</div>
                        </div>
                        <div className="info-item">
                            <div className="info-label">Address:</div>
                            <div className="info-value">{user.address || "123 Main St, Sofia, Bulgaria"}</div>
                        </div>
                    </div>
                    
                    <div className="about-section">
                        <h3>
                            <i className="fas fa-info-circle"></i>
                            About Me
                        </h3>
                        <div className="about-text">
                            I am {user.username}.
                            I'm passionate about web development and creating user-friendly interfaces.
                            I specialize in React development and UI/UX design.
                        </div>
                    </div>
                    
                    <div className="stats-container">
                        <div className="stat-item">
                            <div className="stat-value">15</div>
                            <div className="stat-label">Projects</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">77</div>
                            <div className="stat-label">Connections</div>
                        </div>
                        <div className="stat-item">
                            <div className="stat-value">5</div>
                            <div className="stat-label">Years Experience</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
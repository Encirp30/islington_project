import { useNavigate } from 'react-router-dom';
import './login.css';
import { useState, type FormEvent, type ChangeEvent } from 'react';
import { loginApi } from "../../../shared/config/api";
import type { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [fieldErrors, setFieldErrors] = useState({
        username: '',
        password: ''
    });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error when user starts typing in a field
        if (fieldErrors[name as keyof typeof fieldErrors]) {
            setFieldErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        // Client-side validation
        let isValid = true;
        const newErrors = { username: '', password: '' };

        if (!formData.username.trim()) {
            newErrors.username = 'Please enter your username';
            toast.error('Please enter your username', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Please enter your password';
            toast.error('Please enter your password', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
            });
            isValid = false;
        }

        if (!isValid) {
            setFieldErrors(newErrors);
            return;
        }

        setLoading(true);

        loginApi(formData)
            .then((res: AxiosResponse) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('currentUser', JSON.stringify(res.data.userData));
                navigate('/home');
            })
            .catch((error: AxiosError) => {
                const message = (error.response?.data as string) ?? 'Invalid username or password';
                toast.error('Invalid username or password', {
                    position: "top-center",
                    autoClose: 3000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                });
                setFieldErrors({
                    username: 'Invalid credentials',
                    password: 'Invalid credentials'
                });
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                
                <div className="input-group">
                    <input
                        onChange={handleChange}
                        name='username'
                        value={formData.username}
                        placeholder="Username"
                        type="text"
                        className={fieldErrors.username ? 'error' : ''}
                    />
                    {fieldErrors.username && (
                        <span className="error-message">{fieldErrors.username}</span>
                    )}
                </div>
                
                <div className="input-group">
                    <input
                        onChange={handleChange}
                        name='password'
                        value={formData.password}
                        placeholder="Password"
                        type="password"
                        className={fieldErrors.password ? 'error' : ''}
                    />
                    {fieldErrors.password && (
                        <span className="error-message">{fieldErrors.password}</span>
                    )}
                </div>
                
                <button disabled={loading}>
                    {loading ? 'Logging in...' : 'Submit'}
                </button>
                
                <div className="signup-section">
                    <p className="signup-text">Don't have an account?</p>
                    <button 
                        type="button" 
                        className="register-btn"
                        onClick={() => navigate('/register')}
                    >
                        Register
                    </button>
                </div>
            </form>
        </div>
    );
}
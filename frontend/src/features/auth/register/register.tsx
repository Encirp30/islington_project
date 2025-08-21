import { useNavigate } from 'react-router-dom';
import { useState, type FormEvent, type ChangeEvent } from 'react';
import { registerApi } from "../../../shared/config/api";
import type { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";
import './register.css';

export default function Register() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({ 
        username: '', 
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const validateUsername = (username: string) => {
        const regex = /^[a-zA-Z0-9]{1,15}$/;
        if (!regex.test(username)) {
            return 'Username must be 1-15 alphanumeric characters';
        }
        return '';
    };

    const validateEmail = (email: string) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regex.test(email)) {
            return 'Please enter a valid email address';
        }
        return '';
    };

    const validatePassword = (password: string) => {
        if (password.length < 6) {
            return 'Password must be at least 6 characters';
        }
        return '';
    };

    const validateConfirmPassword = (confirmPassword: string, password: string) => {
        if (confirmPassword !== password) {
            return 'Passwords do not match';
        }
        return '';
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        
        // Clear error when user starts typing
        if (errors[name as keyof typeof errors]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        // Validate all fields
        const usernameError = validateUsername(formData.username);
        const emailError = validateEmail(formData.email);
        const passwordError = validatePassword(formData.password);
        const confirmPasswordError = validateConfirmPassword(formData.confirmPassword, formData.password);

        setErrors({
            username: usernameError,
            email: emailError,
            password: passwordError,
            confirmPassword: confirmPasswordError
        });

        // Check if any errors exist
        if (usernameError || emailError || passwordError || confirmPasswordError) {
            return;
        }

        setLoading(true);

        registerApi({
            username: formData.username,
            email: formData.email,
            password: formData.password
        })
            .then(() => {
                toast.success("Registration successful!");
                navigate('/login');
            })
            .catch((error: AxiosError) => {
                const message = (error.response?.data as string) ?? 'Registration failed';
                toast.error(message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="register-wrapper">
            <form onSubmit={handleSubmit} className="register-form">
                <h2>Create Account</h2>
                
                <div className="input-group">
                    <input
                        onChange={handleChange}
                        name='username'
                        value={formData.username}
                        placeholder="Username (1-10 alphanumeric chars)"
                        type="text"
                        className={errors.username ? 'error' : ''}
                        required
                    />
                    {errors.username && <span className="error-message">{errors.username}</span>}
                </div>
                
                <div className="input-group">
                    <input
                        onChange={handleChange}
                        name='email'
                        value={formData.email}
                        placeholder="Email"
                        type="email"
                        className={errors.email ? 'error' : ''}
                        required
                    />
                    {errors.email && <span className="error-message">{errors.email}</span>}
                </div>
                
                <div className="input-group">
                    <input
                        onChange={handleChange}
                        name='password'
                        value={formData.password}
                        placeholder="Password (min 6 characters)"
                        type="password"
                        className={errors.password ? 'error' : ''}
                        required
                    />
                    {errors.password && <span className="error-message">{errors.password}</span>}
                </div>
                
                <div className="input-group">
                    <input
                        onChange={handleChange}
                        name='confirmPassword'
                        value={formData.confirmPassword}
                        placeholder="Confirm Password"
                        type="password"
                        className={errors.confirmPassword ? 'error' : ''}
                        required
                    />
                    {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
                </div>
                
                <button disabled={loading}>
                    {loading ? 'Registering...' : 'Register'}
                </button>
                
                <div className="login-section">
                    <p className="login-text">Already have an account?</p>
                    <button 
                        type="button" 
                        className="login-btn"
                        onClick={() => navigate('/login')}
                    >
                        Login
                    </button>
                </div>
            </form>
        </div>
    );
}
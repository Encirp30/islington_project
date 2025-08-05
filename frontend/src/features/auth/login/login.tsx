import { useNavigate } from 'react-router-dom';
import './login.css';
import { useState, type FormEvent, type ChangeEvent } from 'react';
import { loginApi } from "../../../shared/config/api";
import type { AxiosError, AxiosResponse } from "axios";
import { toast } from "react-toastify";

export default function Login() {
    const navigate = useNavigate();

    

    const [formData, setFormData] = useState({ username: '', password: '' });
    const [loading, setLoading] = useState(false); // fixed typo: setloading → setLoading

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (loading) return;

        setLoading(true); // moved inside

        loginApi(formData)
            .then((res: AxiosResponse) => {
                localStorage.setItem('token', res.data.token);
                localStorage.setItem('currentUser', JSON.stringify(res.data.userData));
                navigate('/home'); // fixed: navigate instead of Navigate
            })
            .catch((error: AxiosError) => {
                const message = (error.response?.data as string) ?? 'Server Error';
                toast.error(message);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="login-wrapper">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Login</h2>
                <input
                    onChange={handleChange}
                    name='username'
                    value={formData.username}
                    placeholder="Username"
                    type="text"
                />
                <input
                    onChange={handleChange}
                    name='password'
                    value={formData.password}
                    placeholder="Password"
                    type="password"
                />
                <button disabled={loading}>
                    {loading ? 'Logging in...' : 'Submit'}
                </button>
            </form>
        </div>
    );
}

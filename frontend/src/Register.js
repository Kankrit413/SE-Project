import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // นำเข้า Link จาก react-router-dom

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/register', { username, password });
            if (response.status === 201) {
                alert('Registration successful');
                navigate('/login'); // นำผู้ใช้ไปยังหน้า Login หลังจากลงทะเบียนสำเร็จ
            }
        } catch (error) {
            alert('Error registering user');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            <form onSubmit={handleRegister}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Register</button>
            </form>
            {/* ลิงก์กลับไปยังหน้า Login */}
            <p><Link to="/login">Back to Login</Link></p> {/* ใช้ Link สำหรับการนำทาง */}
        </div>
    );
};

export default Register;

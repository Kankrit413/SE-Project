import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'; // นำเข้า Link จาก react-router-dom

const Login = () => {
    const [username, setUsername] = useState(''); // สถานะเก็บ username
    const [password, setPassword] = useState(''); // สถานะเก็บ password
    const navigate = useNavigate(); // ใช้สำหรับการนำทาง

    const handleLogin = async (e) => {
        e.preventDefault(); // ป้องกันการรีเฟรชหน้า
        try {
            // ตรวจสอบกรณีที่ username และ password เป็น admin โดยไม่ต้องเรียก API
            if (username === 'admin' && password === 'kmutt123') {
                localStorage.setItem('username', username);
                navigate('/admin'); // นำทางไปหน้า AddProduct.js
                return;
            }

            // ส่งคำขอไปยัง API สำหรับกรณีทั่วไป
            const response = await axios.post('http://localhost:5000/api/login', { username, password });
            if (response.status === 200) {
                // บันทึก username ลงใน LocalStorage
                localStorage.setItem('username', username);

                // นำทางไปยังหน้า Home สำหรับผู้ใช้ทั่วไป
                navigate('/Home');
            }
        } catch (error) {
            alert('Invalid username or password'); // ถ้าเข้าสู่ระบบไม่สำเร็จ แสดงข้อความเตือน
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={e => setUsername(e.target.value)} // เก็บค่า username
                    required
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)} // เก็บค่า password
                    required
                />
                <button type="submit">Login</button>
            </form>
            {/* ปุ่มหรือข้อความสำหรับการลงทะเบียน */}
            <p>Don't have an account? <Link to="/register">Register here</Link></p>
        </div>
    );
};

export default Login;

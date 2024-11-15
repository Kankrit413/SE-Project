import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // นำเข้า Link และ useNavigate สำหรับการนำทาง
import './Header.css';

const Header = ({ onSearch }) => {
    const [username, setUsername] = useState(null);
    const navigate = useNavigate(); // ใช้สำหรับนำทางในกรณีล็อกเอาท์
    const [searchTerm, setSearchTerm] = useState('');

    useEffect(() => {
        const loggedInUser = localStorage.getItem('username');
        if (loggedInUser) {
            setUsername(loggedInUser);
        }
    }, []);

    // ฟังก์ชันสำหรับการค้นหา
    const handleSearch = () => {
        onSearch(searchTerm); // ส่งคำค้นหาไปยัง Home.js เพื่อกรองสินค้า
    };

    // ฟังก์ชันสำหรับการล็อกเอาท์
    const handleLogout = () => {
        localStorage.removeItem('username');
        setUsername(null);
        navigate('/'); // หลังจากล็อกเอาท์ ให้นำผู้ใช้ไปที่หน้า Home
    };

    return (
        <header className="header-container">
            <div className="header-top">
                <div className="header-left">
                    <a href="/" className="logo">
                        <img src="/path-to-your-logo.png" alt="Logo" className="logo-image" />
                        <span>MyShop</span>
                    </a>
                </div>
                <div className="header-center">
                    <input 
                        type="text" 
                        placeholder="ค้นหาสินค้า หรือแบรนด์..." 
                        className="search-bar" 
                        value={searchTerm} 
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="search-button" onClick={handleSearch}>
                        ค้นหา  
                    </button>
                </div>
                <div className="header-right">
                    {username ? (
                        <>
                            <span className="header-link">Hello, {username}</span>
                            <button
                                className="header-link logout-button"
                                onClick={handleLogout}
                                style={{ backgroundColor: 'red', color: 'white' }} 
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="header-link">Login</Link>
                            <span> | </span>
                            <Link to="/register" className="header-link">Sign Up</Link>
                        </>
                    )}
                    <a href="/cart" className="cart-icon">
                        <i className="fa fa-shopping-cart"></i>
                    </a>
                </div>
            </div>
            
        </header>
    );
};

export default Header;

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้สำหรับการนำทาง
import axios from 'axios';
import './AdminPage.css';

const AdminPage = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [selectedProductId, setSelectedProductId] = useState(null);

    useEffect(() => {
        // ดึงข้อมูลสินค้าจาก API เพื่อแสดงในลิสต์
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleLogout = () => {
        // ล้างข้อมูลที่เกี่ยวข้อง เช่น Token หรือ Session
        localStorage.removeItem('authToken');
        navigate('/login'); // ไปที่หน้า Login
    };

    const handleUpdateProduct = () => {
        if (selectedProductId) {
            navigate(`/update-product/${selectedProductId}`); // ไปที่หน้า UpdateProduct โดยระบุ ID
        } else {
            alert('กรุณาเลือกสินค้าที่ต้องการแก้ไข');
        }
    };

    const handleDeleteProduct = () => {
        if (selectedProductId) {
            navigate(`/delete-product/${selectedProductId}`); // ไปที่หน้า DeleteProduct พร้อมส่ง ID ของสินค้า
        } else {
            alert('กรุณาเลือกสินค้าที่ต้องการลบ');
        }
    };    

    return (
        <div className="app-container">
            <h1>Admin Dashboard</h1>
            <div className="action-buttons">
                <button onClick={() => navigate('/add-product')}>Add New Product</button> {/* ปุ่มสำหรับไปหน้าเพิ่มสินค้า */}
                <div className="update-section">
                    <select
                        value={selectedProductId || ''}
                        onChange={(e) => setSelectedProductId(e.target.value)}
                    >
                        <option value="">Select a product to update</option>
                        {products.map((product) => (
                            <option key={product._id} value={product._id}>
                                {product.name}
                            </option>
                        ))}
                    </select>
                    <button onClick={handleUpdateProduct}>Update Product</button> {/* ปุ่มไปหน้า UpdateProduct */}
                </div>
                <button onClick={handleDeleteProduct}>Delete Product</button>
                <button onClick={handleLogout} className="logout-button">Logout</button> {/* ปุ่ม Logout */}
            </div>
        </div>
    );
};

export default AdminPage;

import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const DeleteProduct = () => {
    const { id } = useParams(); // ดึง id ของสินค้าจาก URL
    const navigate = useNavigate();

    useEffect(() => {
        const deleteProduct = async () => {
            try {
                const response = await axios.delete(`http://localhost:5000/api/products/${id}`);
                console.log(response.data.message);
                alert('ลบผลิตภัณฑ์สำเร็จ');
                navigate(-1); // ย้อนกลับไปหน้าก่อนหน้า
            } catch (error) {
                console.error('Error deleting product:', error);
                alert('เกิดข้อผิดพลาดในการลบผลิตภัณฑ์');
            }
        };

        // เรียกฟังก์ชันลบเมื่อคอมโพเนนต์นี้โหลด
        deleteProduct();
    }, [id, navigate]);

    return (
        <div>
            <p>กำลังลบผลิตภัณฑ์...</p>
        </div>
    );
};

export default DeleteProduct;

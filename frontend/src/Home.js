import React, { useState, useEffect } from 'react';
import Header from './Header';
import ProductList from './ProductList';
import './App.css';
import axios from 'axios';

const Home = () => {
    const [products, setProducts] = useState([]); // สินค้าที่จะแสดง
    const [initialProducts, setInitialProducts] = useState([]); // สินค้าทั้งหมด (เริ่มต้น)
    const [loading, setLoading] = useState(false); // สถานะโหลดข้อมูล

    useEffect(() => {
        fetchProducts("all"); // ดึงสินค้าทั้งหมดเมื่อโหลดหน้าแรก
    }, []);

    // ฟังก์ชันดึงสินค้าตามประเภท
    const fetchProducts = async (type) => {
        setLoading(true); // แสดงสถานะกำลังโหลด
        try {
            const url = type === "all"
                ? 'http://localhost:5000/api/products'
                : `http://localhost:5000/api/products/type/${type}`;

            const response = await axios.get(url);
            setProducts(response.data);
            if (type === "all") setInitialProducts(response.data); // บันทึกข้อมูลเริ่มต้น
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false); // ปิดสถานะโหลด
        }
    };

    // ฟังก์ชันค้นหาสินค้าตามชื่อหรือแบรนด์
    const handleSearchResults = async (searchTerm) => {
        if (searchTerm === '') {
            setProducts(initialProducts); // คืนค่าข้อมูลเริ่มต้นถ้าไม่มีคำค้นหา
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(`http://localhost:5000/api/products/search?query=${encodeURIComponent(searchTerm)}`);
            setProducts(response.data); // อัปเดตสินค้าตามคำค้นหา
        } catch (error) {
            console.error("Error searching products:", error);
            setProducts([]); // ถ้าไม่พบสินค้า ให้แสดงเป็นข้อมูลว่าง
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="app-container">
            <Header onSearch={handleSearchResults} />
            <div className="filter-buttons">
                <button onClick={() => fetchProducts("all")}>All</button>
                <button onClick={() => fetchProducts("sunscreen")}>Sunscreen</button>
                <button onClick={() => fetchProducts("cleanser")}>Cleanser</button>
                <button onClick={() => fetchProducts("moisturizer")}>Moisturizer</button>
            </div>
            {loading ? (
                <div className="loading">กำลังโหลดข้อมูล...</div>
            ) : (
                <ProductList products={products} />
            )}
        </div>
    );
};

export default Home;

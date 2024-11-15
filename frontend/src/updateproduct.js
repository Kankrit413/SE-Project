import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; // ใช้ useParams สำหรับดึง id จาก URL
import axios from 'axios';

const UpdateProduct = () => {
    const { id } = useParams(); // ดึง id ของสินค้าจาก URL
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");
    const [relatedProducts, setRelatedProducts] = useState("");
    const [image, setImage] = useState(null);
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");

    useEffect(() => {
        // โหลดข้อมูลสินค้าปัจจุบันเพื่อแสดงในฟอร์ม
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/products/${id}`);
                const product = response.data;
                setName(product.name || "");
                setIngredients(product.ingredients ? product.ingredients.join(',') : ""); // แปลง Array เป็น String สำหรับฟอร์ม
                setDescription(product.description || "");
                setRelatedProducts(product.relatedProducts ? product.relatedProducts.join(',') : ""); // แปลง Array เป็น String
                setType(product.type || "");
                setPrice(product.price || "");
                setBrand(product.brand || "");
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };

        fetchProduct();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        
        // เพิ่มเฉพาะข้อมูลที่มีการเปลี่ยนแปลง
        if (name !== "") formData.append("name", name); // อัปเดตเฉพาะชื่อถ้ามีการกรอกใหม่
        if (ingredients !== "") formData.append("ingredients", JSON.stringify(ingredients.split(',')));
        if (description !== "") formData.append("description", description);
        if (relatedProducts !== "") formData.append("relatedProducts", JSON.stringify(relatedProducts.split(',')));
        if (image) formData.append("image", image); // อัปเดตเฉพาะเมื่อผู้ใช้อัปโหลดใหม่
        if (type !== "") formData.append("type", type);
        if (price !== "") formData.append("price", price);
        if (brand !== "") formData.append("brand", brand);

        try {
            await axios.put(`http://localhost:5000/api/products/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Product updated successfully");
            navigate(-1); // ย้อนกลับไปหน้าก่อนหน้า
        } catch (error) {
            console.error("Error updating product:", error);
        }
    };

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button> {/* ปุ่ม Back */}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <label>
                    Ingredients (comma separated):
                    <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} />
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
                </label>
                <label>
                    Related Products (comma separated):
                    <input type="text" value={relatedProducts} onChange={(e) => setRelatedProducts(e.target.value)} />
                </label>
                <label>
                    Image:
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} />
                </label>
                <label>
                    Type:
                    <input type="text" value={type} onChange={(e) => setType(e.target.value)} />
                </label>
                <label>
                    Price:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
                </label>
                <label>
                    Brand:
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} />
                </label>
                <button type="submit">Update Product</button>
            </form>
        </div>
    );
};

export default UpdateProduct;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // ใช้สำหรับการนำทาง
import axios from 'axios';

const AddProduct = () => {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [description, setDescription] = useState("");
    const [relatedProducts, setRelatedProducts] = useState("");
    const [image, setImage] = useState(null);
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");

    const navigate = useNavigate(); // ใช้สำหรับการนำทาง

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("ingredients", JSON.stringify(ingredients.split(',')));
        formData.append("description", description);
        formData.append("relatedProducts", JSON.stringify(relatedProducts.split(',')));
        formData.append("image", image);
        formData.append("type", type);
        formData.append("price", price);
        formData.append("brand", brand);

        try {
            await axios.post("http://localhost:5000/api/add-product", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Product added successfully");
            navigate(-1); // ย้อนกลับไปหน้าก่อนหน้า
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div>
            <button onClick={() => navigate(-1)}>Back</button> {/* ปุ่ม Back */}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
                </label>
                <label>
                    Ingredients (comma separated):
                    <input type="text" value={ingredients} onChange={(e) => setIngredients(e.target.value)} required />
                </label>
                <label>
                    Description:
                    <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
                </label>
                <label>
                    Related Products (comma separated):
                    <input type="text" value={relatedProducts} onChange={(e) => setRelatedProducts(e.target.value)} />
                </label>
                <label>
                    Image:
                    <input type="file" onChange={(e) => setImage(e.target.files[0])} required />
                </label>
                <label>
                    Type:
                    <input type="text" value={type} onChange={(e) => setType(e.target.value)} required />
                </label>
                <label>
                    Price:
                    <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required />
                </label>
                <label>
                    Brand:
                    <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required />
                </label>
                <button type="submit">Add Product</button>
            </form>
        </div>
    );
};

export default AddProduct;

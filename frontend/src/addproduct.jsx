import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProductForm.css";

const AddProductForm = () => {
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        type: "",
        price: "",
        brand: "",
        image: null,
        startDate: "",
        endDate: "",
    });

    const [selectedPrice, setSelectedPrice] = useState(""); // สำหรับจัดการสถานะปุ่มราคา
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        setFormData({ ...formData, image: e.target.files[0] });
    };

    const handlePriceSelect = (priceType) => {
        setSelectedPrice((prev) => (prev === priceType ? "" : priceType));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });
        data.append("selectedPrice", selectedPrice); // Pass selected price
    
        try {
            await axios.post("http://localhost:5000/api/add-product", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Product added successfully");
    
            // Navigate to the payment page, passing the price as state
            navigate("/payment", { state: { price: selectedPrice === "weekly" ? 1000 : 3000 } });
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };
    
    

    return (
        <div className="add-product-form-container">
            <button className="close-btn" onClick={() => navigate(-1)}>&times;</button>
            <form onSubmit={handleSubmit} className="add-product-form">
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        placeholder="Product Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group">
                    <textarea
                        name="description"
                        placeholder="Product Details"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        className="textarea-field"
                    ></textarea>
                </div>

                <div className="form-row">
                    <input
                        type="date"
                        name="startDate"
                        placeholder="Start Date"
                        value={formData.startDate}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                    <input
                        type="date"
                        name="endDate"
                        placeholder="End Date"
                        value={formData.endDate}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>

                <div className="form-group file-upload">
                    <label htmlFor="file">
                        Upload a file <i className="fas fa-upload"></i>
                    </label>
                    <input
                        type="file"
                        id="file"
                        name="image"
                        onChange={handleFileChange}
                        required
                    />
                </div>

                <div className="form-row">
                    <button
                        type="button"
                        className={`price-btn ${selectedPrice === "weekly" ? "selected" : ""}`}
                        onClick={() => handlePriceSelect("weekly")}
                    >
                        ฿ 1,000 / week
                    </button>
                    <button
                        type="button"
                        className={`price-btn ${selectedPrice === "monthly" ? "selected" : ""}`}
                        onClick={() => handlePriceSelect("monthly")}
                    >
                        ฿ 3,000 / month
                    </button>
                </div>

                <button type="submit" className="submit-btn">
                    Continue
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;

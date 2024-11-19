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

    const [ingredients, setIngredients] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState("");
    const [relatedProducts, setRelatedProducts] = useState("");
    const [selectedPrice, setSelectedPrice] = useState("");
    const [error, setError] = useState(""); // For displaying errors
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file && !["image/jpeg", "image/png", "image/jpg"].includes(file.type)) {
            setError("Please upload a valid image file (jpg, jpeg, png).");
        } else {
            setError("");
            setFormData({ ...formData, image: file });
        }
    };

    const handlePriceSelect = (priceType) => {
        setSelectedPrice((prev) => (prev === priceType ? "" : priceType));
    };

    const handleAddIngredient = () => {
        if (currentIngredient.trim()) {
            if (ingredients.includes(currentIngredient.trim())) {
                setError("This ingredient is already added.");
            } else {
                setIngredients([...ingredients, currentIngredient.trim()]);
                setCurrentIngredient("");
                setError("");
            }
        }
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedPrice) {
            setError("Please select a price option.");
            return;
        }

        const data = new FormData();
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });
        data.append("ingredients", JSON.stringify(ingredients));
        data.append("relatedProducts", JSON.stringify(relatedProducts.split(",")));
        data.append("selectedPrice", selectedPrice);

        try {
            await axios.post("http://localhost:5000/api/add-product", data, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Product added successfully");

            navigate("/payment", { state: { price: selectedPrice === "weekly" ? 1000 : 3000 } });
        } catch (error) {
            setError("Error adding product. Please try again.");
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="add-product-form-container">
            <button className="close-btn" onClick={() => navigate(-1)}>&times;</button>
            <form onSubmit={handleSubmit} className="add-product-form">
                {error && <div className="error-message">{error}</div>}

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

                <div className="form-group">
                    <select
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                        required
                        className="select-field"
                    >
                        <option value="">
                            Select Type
                        </option>
                        <option value="sunscreen">Sunscreen</option>
                        <option value="cleanser">Cleanser</option>
                        <option value="moisturizer">Moisturizer</option>
                    </select>
                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={formData.brand}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                    <input
                        type="text"
                        name="price"
                        placeholder="Price (e.g., ฿100)"
                        value={formData.price}
                        onChange={handleChange}
                        required
                        className="input-field"
                    />
                </div>

                <div className="ingredients-field">
                    <input
                        type="text"
                        placeholder="Add an ingredient"
                        value={currentIngredient}
                        onChange={(e) => setCurrentIngredient(e.target.value)}
                        className="input-field"
                    />
                    <button type="button" onClick={handleAddIngredient} className="ingredients-btn">
                        Add Ingredient
                    </button>
                    <ul className="ingredient-list">
                        {ingredients.map((ingredient, index) => (
                            <li key={index} className="ingredient-item">
                                {ingredient}{" "}
                                <button
                                    type="button"
                                    onClick={() => handleRemoveIngredient(index)}
                                    className="remove-btn"
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="form-group">
                    <input
                        type="text"
                        placeholder="Related Products (comma separated)"
                        value={relatedProducts}
                        onChange={(e) => setRelatedProducts(e.target.value)}
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
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./AddProductForm.css";

const AddProductForm = () => {
    const [name, setName] = useState("");
    const [ingredients, setIngredients] = useState([]);
    const [currentIngredient, setCurrentIngredient] = useState("");
    const [description, setDescription] = useState("");
    const [relatedProducts, setRelatedProducts] = useState("");
    const [image, setImage] = useState(null);
    const [type, setType] = useState("");
    const [price, setPrice] = useState("");
    const [brand, setBrand] = useState("");

    const navigate = useNavigate();

    const handleAddIngredient = () => {
        if (currentIngredient.trim()) {
            setIngredients([...ingredients, currentIngredient.trim()]);
            setCurrentIngredient("");
        }
    };

    const handleRemoveIngredient = (index) => {
        const updatedIngredients = ingredients.filter((_, i) => i !== index);
        setIngredients(updatedIngredients);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", name);
        formData.append("ingredients", JSON.stringify(ingredients));
        formData.append("description", description);
        formData.append("relatedProducts", JSON.stringify(relatedProducts.split(",")));
        formData.append("image", image);
        formData.append("type", type);
        formData.append("price", price);
        formData.append("brand", brand);

        try {
            await axios.post("http://localhost:5000/api/add-product", formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });
            console.log("Product added successfully");
            navigate(-1);
        } catch (error) {
            console.error("Error adding product:", error);
        }
    };

    return (
        <div className="add-product-form-container">
            <button className="close-btn" onClick={() => navigate(-1)}>&times;</button>
            <form onSubmit={handleSubmit} className="add-product-form">
                <input
                    type="text"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="input-field"
                    required
                />
                <div className="ingredients-field">
                    <input
                        type="text"
                        placeholder="Add an ingredient"
                        value={currentIngredient}
                        onChange={(e) => setCurrentIngredient(e.target.value)}
                        className="input-field"
                    />
                    <button type="button" onClick={handleAddIngredient} className="add-btn">
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
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="textarea-field"
                    required
                ></textarea>
                <input
                    type="text"
                    placeholder="Related Products (comma separated)"
                    value={relatedProducts}
                    onChange={(e) => setRelatedProducts(e.target.value)}
                    className="input-field"
                />
                <div className="file-upload">
                    <label htmlFor="file">Upload Image</label>
                    <input
                        type="file"
                        id="file"
                        onChange={(e) => setImage(e.target.files[0])}
                        required
                    />
                </div>
                <input
                    type="text"
                    placeholder="Type"
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="input-field"
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="input-field"
                    required
                />
                <input
                    type="text"
                    placeholder="Brand"
                    value={brand}
                    onChange={(e) => setBrand(e.target.value)}
                    className="input-field"
                    required
                />
                <button type="submit" className="submit-btn">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProductForm;

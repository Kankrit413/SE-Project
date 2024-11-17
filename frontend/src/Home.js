import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Header from './Header';

const Home = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchProducts("all"); // Fetch all products on initial load
    }, []);

    const fetchProducts = async (type, searchQuery = "") => {
        setLoading(true);
        try {
            const url = type === "all"
                ? `http://localhost:5000/api/products?q=${searchQuery}`
                : `http://localhost:5000/api/products/type/${type}?q=${searchQuery}`;
            const response = await axios.get(url);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchTerm) => {
        fetchProducts("all", searchTerm); // Fetch all products matching the search term
    };

    return (
        <div className="app-container">
            {/* Include Header and pass handleSearch */}
            <Header onSearch={handleSearch} />
            
            {/* Filter Buttons */}
            <div className="filter-container">
                <button className="filter-button" onClick={() => fetchProducts("sunscreen")}>Sunscreen</button>
                <button className="filter-button" onClick={() => fetchProducts("cleanser")}>Cleanser</button>
                <button className="filter-button" onClick={() => fetchProducts("moisturizer")}>Moisturizer</button>
            </div>

            {/* Search and Dropdown Filters */}
            <div className="search-and-filters">
                <select className="filter-dropdown" onChange={(e) => fetchProducts(e.target.value)}>
                    <option value="all">Select Type</option>
                    <option value="sunscreen">Sunscreen</option>
                    <option value="cleanser">Cleanser</option>
                    <option value="moisturizer">Moisturizer</option>
                </select>
                <select className="filter-dropdown">
                    <option value="">Select Brand</option>
                    <option value="brand1">Brand 1</option>
                    <option value="brand2">Brand 2</option>
                    <option value="brand3">Brand 3</option>
                </select>
            </div>

            {/* Product Recommendation and List */}
            <div className="content-container">
                <div className="recommendation">
                    <h2>Product Recommend</h2>
                </div>
                <div className="product-slider">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        products.map(product => (
                            <div className="product-item" key={product.id}>
                                <img src={product.image} alt={product.name} />
                                <p>{product.name}</p>
                                <p>{product.price}</p>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Footer */}
            <footer className="footer">
                <Link to="/add-product" className="advertise-link">Contact to Advertise</Link>
            </footer>
        </div>
    );
};

export default Home;

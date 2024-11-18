import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css';
import axios from 'axios';
import Header from './Header';
import Recommended from './Recommended-Products/Recommended';
import { useNavigate } from "react-router-dom";


const Home = () => {
    const [products, setProducts] = useState([{
        id: 1,
        name: "Garnier Super UV Serum Sunscreen",
        price: 319 ,
        quantity: "30 g",
        image: "https://medias.watsons.co.th/publishing/WTCTH-255440-front-zoom.jpg",
    },]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    useEffect(() => {
        fetchProducts("all"); // Fetch all products on initial load
    }, []);

    const fetchProducts = async (type, searchQuery = "", page = 1) => {
        setLoading(true);
        try {
            const url = type === "all"
                ? `http://localhost:5000/api/products?q=${searchQuery}&page=${page}`
                : `http://localhost:5000/api/products/type/${type}?q=${searchQuery}&page=${page}`;
            const response = await axios.get(url);
            setProducts(response.data.products);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (searchTerm) => {
        fetchProducts("all", searchTerm); // Fetch all products matching the search term
        setCurrentPage(1); // Reset to page 1
    };

    const handleSort = (sortOption) => {
        const sortedProducts = [...products];
        if (sortOption === "price-asc") {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortOption === "price-desc") {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        setProducts(sortedProducts);
    };

    const handlePageChange = (direction) => {
        if (direction === "next" && currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
            fetchProducts("all", "", currentPage + 1);
        } else if (direction === "prev" && currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
            fetchProducts("all", "", currentPage - 1);
        }
    };

    // คลิกเพื่อไปที่หน้า /recommended
        const navigate = useNavigate();
        const goToRecommended = () => {
          // นำทางไปยังหน้า /recommended
          navigate("/recommended");
        };
    
    return (
        <div className="app-container">
            <div className="app-container">

            {/* Header */}
            <header className="header">
                <h1>HOME</h1>
            </header>

            {/* search */}
            <input
                    type="text"
                    className="search-input"
                    placeholder="Search for products..."
                    onKeyDown={(e) => e.key === "Enter" && handleSearch(e.target.value)}
                />

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
                            <div className="product-item" onClick={goToRecommended} key={product.id}>
                                <img src={product.image} alt={product.name} />
                                <p>{product.name} {product.quantity}</p>
                                <p>{product.price} THB </p>
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
        </div>
    );
};
export default Home;

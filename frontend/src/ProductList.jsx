import React from 'react';
import './ProductList.css';

const ProductList = ({ products }) => {
    return (
        <div className="product-list-container">
            <div className="product-grid">
                {products.length > 0 ? (
                    products.map(product => (
                        <div key={product._id} className="product-card">
                            <img src={product.imageUrl} alt={product.name} className="product-image" />
                            <div className="product-info">
                                <h2 className="product-name">{product.name}</h2>
                                <p className="product-description">{product.description}</p>
                                <div className="product-price">Price: {product.price} THB</div>
                                <button className="buy-now-button">Buy Now</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No products found</p> // แสดงข้อความเมื่อไม่พบสินค้า
                )}
            </div>
        </div>
    );
};

export default ProductList;

import Home from "../Home";
import React from "react";
import ProductSection from "./ProductSection";
import stylespage2 from "./stylespage2.css";
import buttonpage2 from "./buttonpage2.css";
import RecommendationSection from "./RecommendationSection";
import YouMightLike from "./YouMightLike";


function Recommended () {
    return (
        <div>
            <header className="header">
                <button className="back-button">&larr;
                </button>
                <h1>Products Recommendation</h1>
                <h1> </h1>
            </header>
            <main className="main-content">
                <div className="product-container">
                    <ProductSection/>
                    <RecommendationSection/>
                </div>
                    <YouMightLike/>
            </main>
        </div>
    );
}

export default Recommended;



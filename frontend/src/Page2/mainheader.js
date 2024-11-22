import Home from "../Home";
import React from "react";
import ProductSection from "./ProductSection";
import stylespage2 from "./stylespage2.css";
import buttonpage2 from "./buttonpage2.css";
import RecommendationSection from "./RecommendationSection";
import YouMightLike from "./YouMightLike";
import { useNavigate } from "react-router-dom";
import stylylesproduct from "./stylylesproduct.css";
import stylesyoumightlike from "./stylesyoumightlike.css";


function Recommended () {
    const navigate = useNavigate(); // ประกาศ useNavigate ที่นี่

    const handleBackButtonClick = () => {
        navigate("/"); // ใช้ navigate เพื่อย้อนกลับไปที่หน้า Home
    };
    return (
        <div>
            <header className="header-container">
                <button class="back-button" onclick="handleBackButtonClick()">
                    <img src="https://cdn.icon-icons.com/icons2/952/PNG/512/home-outlined-symbol_icon-icons.com_74198.png" alt="Home" />
                </button>
            
                <h1 className="header-top">Products Recommendation</h1>
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



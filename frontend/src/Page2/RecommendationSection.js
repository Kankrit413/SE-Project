import React, { useState } from "react";
import stylespage2 from "./stylespage2.css";
import buttonpage2 from "./buttonpage2.css";

const RecommendationSection = () => {
    const [category, setCategory] = useState(""); // ประเภทสินค้า
    const [currentIndex, setCurrentIndex] = useState(0); // สินค้าแนะนำที่แสดงอยู่

    // สินค้าแนะนำแบ่งตามประเภท
    const recommendations = {
        cleanser: [
        {
            id: 1,
            name: "Acne Care Solution Cleanser",
            price: "฿259 (150 ml)", 
            image: "https://clearnose.co.th/wp-content/uploads/2017/12/CNW_v1.png",
            ingredients: {
            "Salicylic Acid":
                "ช่วยทำความสะอาดรูขุมขน ลดการสะสมของสิ่งสกปรกที่ทำให้เกิดสิว ซึ่งช่วยให้ผิวดูใสและเตรียมพร้อมสำหรับการปกป้องด้วยกันแดด",
            "Green Tea Extract":
                "ช่วยลดการอักเสบและมีสารต้านอนุมูลอิสระ ทำให้ผิวแข็งแรง ลดความเสี่ยงต่อการระคายเคือง",
            },
            buyLink:
            "https://www.konvy.com/clear-nose/clear-nose-acne-care-solution-cleanser-150ml-82873.html?srsltid=AfmBOorwEG_Jod62mqaWYeEbhWehM1ysdpeQXU8xv0JCmwfikxUdAeVB",
            CombinedResults:
            "เมื่อใช้คู่กัน ช่วยให้ผิวแข็งแรง ปราศจากสิ่งอุดตัน ผิวมีความสดชื่นและลดความเสี่ยงต่อการระคายเคืองจากแสงแดดและสิ่งสกปรก",
        },

        { id: 2, name: "Cleanser B", price: "฿349", image: "cleanser-b.jpg" },
        ],

        sunscreen: [
        { id: 1, name: "Sunscreen A", price: "฿299", image: "sunscreen-a.jpg" },
        { id: 2, name: "Sunscreen B", price: "฿399", image: "sunscreen-b.jpg" },
        ],
    };

    // สินค้าปัจจุบันตามประเภทที่เลือก
    const currentRecommendations = recommendations[category] || [];

    // สำหรับเลื่อนสินค้า
    const handleNext = () => {
        if (currentIndex < currentRecommendations.length - 1) {
        setCurrentIndex(currentIndex + 1);
        }
    };

    const handleBack = () => {
        if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        }
    };

    return (
    <section className="recommendation-section">
        <h2>Recommended Products</h2>

        {/* ปุ่มเลือกประเภทสินค้า */}
        <div className="category-buttons">
            <button onClick={() => setCategory("cleanser")}>Cleanser</button>
            <button onClick={() => setCategory("sunscreen")}>Sunscreen</button>
        </div>

        {/* แสดงสินค้าแนะนำ */}
        {category ? ( currentRecommendations.length > 0 ? ( 
            <div className="recommendation-card">
                {/* รูปภาพ */}
                <img
                src={currentRecommendations[currentIndex].image}
                alt={currentRecommendations[currentIndex].name}
                />
                <h3>{currentRecommendations[currentIndex].name}</h3>
                
                {/* Price */}
                <div>
                    <p className="price">
                        Price :{" "}{currentRecommendations[currentIndex].price}
                    </p>
                </div>
                
                {/* Ingredients */}
                <div className="ingredients">
                    {currentRecommendations[currentIndex].ingredients && Object.entries(currentRecommendations[currentIndex].ingredients).map(([key, value], index) => (
                        <p key={index}>
                        <strong>{key}:</strong> {value}
                        </p>
                    ))}
                </div>

                {/* Combined Results */}
                {currentRecommendations[currentIndex].CombinedResults && (
                    <h3>
                        Combined Results:{" "}
                        {currentRecommendations[currentIndex].CombinedResults}
                    </h3>
                )}

                {/* ปุ่ม */}
                <div className="navigation-buttons">

                    {/* ปุ่ม back */}
                    <button onClick={handleBack} disabled={currentIndex === 0}>
                        Back
                    </button>

                    {/* ปุ่ม buy it now */}
                    <button onClick={() => window.location.href = currentRecommendations[currentIndex].buyLink}>
                        BUY IT NOW
                    </button>
                    
                    {/* ปุ่ม next */}
                    <button onClick={handleNext} disabled={currentIndex === currentRecommendations.length - 1}>
                        Next
                    </button>
                </div>
            </div>
        ) : (
            <p>No products available for this category.</p>
            )
        ) : (
            <p>Please select a category to view recommendations.</p>
        )}
    </section>
  );
};

export default RecommendationSection;

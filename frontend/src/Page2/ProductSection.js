import React from "react";
import stylespage2 from "./stylespage2.css";
import buttonpage2 from "./buttonpage2.css";
import stylylesproduct from "./stylylesproduct.css";
import stylesyoumightlike from "./stylesyoumightlike.css";

const ProductSection = () => {
    return (<div>
        <section className="product-section">
            <h2> Products </h2>

            {/* ประเภทของสินค้า */}
            <div className="product-type">
                Sunscreen
            </div>
            {/* ข้อมูลสินค้า */}
            <div className="product-card">
                {/* รูปสินค้า */}
                <img src=" https://medias.watsons.co.th/publishing/WTCTH-298224-swatch-zoom.jpg?version=1716887832" alt="Clear Nose UV Sun Serum"/>
                <div className="products-text-box">
                    {/* ชื่อสินค้า */}
                    <h1>Clear Nose UV Sun Serum</h1>
                    {/* ราคา */}
                    <div className="price"> Price: ฿589 (40 ml)</div> 
                    {/* ส่วนผสม */}
                    <div className="Ingredients"><strong> Key Ingredients: </strong>
                    <div>
                        Zinc Oxide, Titanium Dioxide : <br/>
                        ทำหน้าที่ปกป้องผิวจากรังสี UVA และ UVB โดยเฉพาะสำหรับผิวที่มีปัญหาสิว
                    </div>
                    </div>
                </div>
                <button className="buy-button" onClick={() => window.location.href = 'https://shorturl.asia/W6ynO'}>
                    BUY IT NOW
                </button>
            </div>
        </section>
    </div> 
    );
};

export default ProductSection;
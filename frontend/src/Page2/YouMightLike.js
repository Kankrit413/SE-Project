import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import "./stylespage2.css"; // สมมุติว่า stylespage2 คือไฟล์ CSS หลัก
import "./buttonpage2.css"; // สำหรับสไตล์ปุ่ม (ถ้ามี)
import stylylesproduct from "./stylylesproduct.css";
import stylesyoumightlike from "./stylesyoumightlike.css";

const YouMightLike = () => {
  const products = [
    {
      id: 1,
      band: "MizuMi",
      name: "Cica Soothing Moisture Gel",
      price: "฿399",
      image: "https://down-th.img.susercontent.com/file/th-11134207-7r98w-llpqt9tjeznr1d.webp",
      link: "https://shopee.co.th/..."
    },
    {
      id: 2,
      band: "Anessa",
      name: "Anessa Perfect UV Sunscreen Skincare Milk",
      price: "฿729",
      image: "https://medias.watsons.co.th/...",
      link: "https://www.watsons.co.th/..."
    },
    {
      id: 3,
      band: "HER HYNESS",
      name: "HER HYNESS Product",
      price: "฿750",
      image: "herhyness.jpg",
      link: ""
    },
    {
      id: 4,
      band: "Biore",
      name: "Biore UV",
      price: "฿357",
      image: "biore.jpg",
      link: ""
    },
    {
      id: 5,
      band: "CeraVe",
      name: "CeraVe Cleanser",
      price: "฿245",
      image: "cerave.jpg",
      link: ""
    },
    {
      id: 6,
      band: "La Roche-Posay",
      name: "La Roche-Posay",
      price: "฿496",
      image: "laroche.jpg",
      link: ""
    },
    {
      id: 7,
      band: "Cetaphil",
      name: "Cetaphil",
      price: "฿349",
      image: "cetaphil.jpg",
      link: ""
    }
  ];

  const handleClick = (link) => {
    if (link) {
      window.location.href = link;
    } else {
      alert("This product does not have a link.");
    }
  };


  return (
    <section className="you-might-like">
        <h2>You Might Like</h2>
            <div className="product-slider">
                {products.map((product) => (
      
                <div key={product.id} className="YouMightLike-card" onClick={() => handleClick(product.link)}>

                    <img src={product.image} alt={product.name} />

                        <div className="YouMightLike-detail-price">
                            <div className="YouMightLike-card-details">
                                {product.band}<br/> 
                                {product.name}
                            </div>
                            <div className="YouMightLike-price">
                                {product.price}
                            </div>
                        </div>
                </div>
                  ))}
              </div>
    </section>
  );
};




export default YouMightLike;

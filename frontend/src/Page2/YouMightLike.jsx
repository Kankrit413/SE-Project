import React from 'react';
import stylespage2 from "./stylespage2.css";
import buttonpage2 from "./buttonpage2.css";

const YouMightLike = () => {
  const products = [
    { id: 1, name: 'Mizumi Water', price: '฿399', image: 'mizumi.jpg' },
    { id: 2, name: 'Anessa Sunscreen', price: '฿711', image: 'anessa.jpg' },
    { id: 3, name: 'HER HYNESS', price: '฿750', image: 'herhyness.jpg' },
    { id: 4, name: 'Biore UV', price: '฿357', image: 'biore.jpg' },
    { id: 5, name: 'CeraVe Cleanser', price: '฿245', image: 'cerave.jpg' },
    { id: 6, name: 'La Roche-Posay', price: '฿496', image: 'laroche.jpg' },
  ];

    return (
        <section className="you-might-like">
            <h2>You Might Like</h2>
            <div className="product-slider">
                {products.map((product) => (
                <div key={product.id} className="">
                    <img src={product.image} alt={product.name} />
                    <h3>{product.name}</h3>
                    <p className="price">{product.price}</p>
                </div>
                ))}
            </div>
        </section>
    );
};

export default YouMightLike;

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import AddProduct from './addproduct';
import UpdateProduct from './updateproduct';
import Login from './Login';
import Register from './Register';
import AdminPage from './addminpage'; 
import DeleteProduct from './deleteproduct'; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} /> {/* เส้นทางสำหรับ UpdateProduct */}
        <Route path="/delete-product/:id" element={<DeleteProduct />} /> {/* เส้นทางสำหรับ DeleteProduct */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminPage />} /> {/* เส้นทางสำหรับ AdminPage */}
      </Routes>
    </Router>
  );
};

export default App;

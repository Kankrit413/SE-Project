import React, { useEffect, useState } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const ProfilePage = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: '',
    companyName: '',
    email: '',
    phoneNumber: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const loggedInUser = localStorage.getItem('username');
        if (!loggedInUser) {
          navigate('/login'); // นำไปที่หน้า login ถ้าไม่มีการล็อกอิน
        } else {
          // เรียก API เพื่อดึงข้อมูลผู้ใช้
          const response = await axios.get(`http://localhost:5000/api/users/${loggedInUser}`);
          setUserData(response.data);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); // เก็บไฟล์ที่ผู้ใช้เลือก
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert('กรุณาเลือกไฟล์ก่อนอัปโหลด');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const loggedInUser = localStorage.getItem('username');
      const response = await axios.post(
        `http://localhost:5000/api/users/${loggedInUser}/upload-image`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      alert('อัปโหลดรูปภาพสำเร็จ');
      setUserData((prevData) => ({
        ...prevData,
        imageUrl: response.data.imageUrl, // อัปเดต URL ของรูปภาพที่อัปโหลด
      }));
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ');
    }
  };

  return (
    <div className="profile-container bg-white p-8 rounded-lg shadow-md">
      <div className="flex flex-col items-center">
        <ArrowLeft
          className="text-pink-400 w-6 h-6 cursor-pointer hover:scale-110 transition-transform"
          onClick={() => navigate(-1)}
        />

        <div className="w-24 h-24 bg-pink-100 rounded-full flex items-center justify-center mb-4">
          {userData.imageUrl ? (
            <img
              src={userData.imageUrl}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <User className="text-pink-500 w-12 h-12" />
          )}
        </div>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="upload-file"
        />
        <label htmlFor="upload-file" className="text-pink-500 border border-pink-300 px-3 py-1 rounded-full mb-6 cursor-pointer">
          Select Image
        </label>
        <button
          className="text-white bg-blue-500 px-4 py-2 rounded-full"
          onClick={handleFileUpload}
        >
          Upload Image
        </button>
      </div>
      <div className="space-y-4">
        <div className="profile-field">
          <label>Username</label>
          <input
            type="text"
            value={userData.username}
            readOnly
            className="profile-input"
          />
        </div>
        <div className="profile-field">
          <label>Company Name</label>
          <input
            type="text"
            value={userData.company}
            readOnly
            className="profile-input"
          />
        </div>
        <div className="profile-field">
          <label>Email</label>
          <input
            type="email"
            value={userData.email}
            readOnly
            className="profile-input"
          />
        </div>
        <div className="profile-field">
          <label>Phone Number</label>
          <input
            type="text"
            value={userData.phoneNumber}
            readOnly
            className="profile-input"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;

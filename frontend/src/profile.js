import React, { useEffect, useState } from 'react';
import { ArrowLeft, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './styles.css';

const UserProfile = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const loggedInUser = localStorage.getItem('username');
    if (!loggedInUser) {
      navigate('/login');
    } else {
      axios
        .get(`/api/users/${loggedInUser}`)
        .then((response) => setUserData(response.data))
        .catch((error) => console.error('Error fetching user data:', error));
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 py-6">
      {/* Main Card */}
      <div className="relative bg-white shadow-lg p-8 w-full max-w-sm rounded-lg flex flex-col items-center space-y-6">
        
        {/* Back Arrow */}
        <ArrowLeft
          className="text-gray-400 w-6 h-6 cursor-pointer hover:scale-110 transition-transform absolute left-4 top-4"
          onClick={() => navigate(-1)} // Go back to the previous page
        />

        {/* Profile Image */}
        <div className="circle-container mt-6 mb-4">
          {userData?.profileImage ? (
            <img src={userData.profileImage} alt="Profile" className="profile-image rounded-full w-24 h-24" />
          ) : (
            <User className="default-icon text-gray-400 w-24 h-24" />
          )}
        </div>

        {/* Username */}
        <h2 className="text-lg font-medium text-gray-700 mb-6">{userData?.username || 'User'}</h2> {/* เพิ่มระยะห่างตรงนี้ */}

        {/* User Details */}
        <div className="space-y-6 w-full"> {/* เพิ่มระยะห่างระหว่างฟอร์มให้พอดี */}
          {[{ label: 'Username', value: userData?.username },
            { label: 'Company Name', value: userData?.company },
            { label: 'Email', value: userData?.email },
            { label: 'Phone Number', value: userData?.phoneNumber },
          ].map((field, index) => (
            <div key={index} className="flex flex-col space-y-2"> {/* เพิ่ม space-y-2 สำหรับระยะห่างระหว่าง label และ input */}
              <label className="text-sm text-gray-600">{field.label}</label>
              <input
                type="text"
                value={field.value || 'N/A'}
                readOnly
                className="bg-gray-100 px-4 py-2 rounded-lg text-gray-800"
              />
            </div>
          ))}
        </div>
          
        {/* Back Button */}
        <div className="flex flex-col items-center mt-6 space-y-4 w-full"> {/* เพิ่มระยะห่างจากส่วนด้านบน */}
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded-lg w-full hover:bg-gray-600 transition"
            onClick={() => navigate(-1)} // Go back to the previous page
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
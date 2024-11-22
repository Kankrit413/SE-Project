import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        email: '',
        phoneNumber: '',
        company: ''
    });
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [id]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            // Create preview URL
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleRegister = async (e) => {
    e.preventDefault();
    
    try {
        // Create FormData object to send multipart/form-data
        const submitFormData = new FormData();
        
        // Append all form fields
        Object.keys(formData).forEach(key => {
            submitFormData.append(key, formData[key]);
        });
        
        // Append profile image if selected
        if (profileImage) {
            submitFormData.append('profileImage', profileImage);
        }

        const response = await axios.post('http://localhost:5000/api/register', submitFormData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });

        if (response.status === 201) {
            alert('Registration successful. You may now log in.');
            navigate('/Home');  // Redirect to home after successful registration
        }
    } catch (error) {
        alert(error.response?.data?.message || 'An error occurred during registration. Please try again.');
    }
};

    return (
        <div style={{ margin: '2rem', textAlign: 'center' }}>
            <h2>Create a New Account</h2>
            <form onSubmit={handleRegister} style={{ display: 'inline-block', textAlign: 'left', minWidth: '300px' }}>
                {/* Profile Image Upload Section */}
                <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
                    <div style={{ 
                        width: '150px', 
                        height: '150px', 
                        margin: '0 auto', 
                        border: '2px dashed #ccc',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        position: 'relative',
                        backgroundColor: '#f8f9fa'
                    }}>
                        {imagePreview ? (
                            <img 
                                src={imagePreview} 
                                alt="Profile preview" 
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    objectFit: 'cover'
                                }}
                            />
                        ) : (
                            <div style={{ textAlign: 'center', color: '#666' }}>
                                <div>Click to upload</div>
                                <div>profile picture</div>
                            </div>
                        )}
                        <input
                            type="file"
                            id="profileImage"
                            accept="image/*"
                            onChange={handleImageChange}
                            style={{
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                width: '100%',
                                height: '100%',
                                opacity: 0,
                                cursor: 'pointer'
                            }}
                        />
                    </div>
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="username" style={{ display: 'block', marginBottom: '0.5rem' }}>Username</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Enter your desired username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        style={{ padding: '0.5rem', width: '100%', boxSizing: 'border-box' }}
                    />
                </div>
                
                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        style={{ padding: '0.5rem', width: '100%', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="phoneNumber" style={{ display: 'block', marginBottom: '0.5rem' }}>Phone Number</label>
                    <input
                        type="tel"
                        id="phoneNumber"
                        placeholder="Enter your phone number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        style={{ padding: '0.5rem', width: '100%', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="company" style={{ display: 'block', marginBottom: '0.5rem' }}>Company</label>
                    <input
                        type="text"
                        id="company"
                        placeholder="Enter your company name"
                        value={formData.company}
                        onChange={handleChange}
                        required
                        style={{ padding: '0.5rem', width: '100%', boxSizing: 'border-box' }}
                    />
                </div>

                <div style={{ marginBottom: '1rem' }}>
                    <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem' }}>Password</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Create a secure password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                        style={{ padding: '0.5rem', width: '100%', boxSizing: 'border-box' }}
                    />
                </div>

                <button
                    type="submit"
                    style={{
                        padding: '0.5rem 1rem',
                        backgroundColor: '#007BFF',
                        color: '#FFF',
                        border: 'none',
                        borderRadius: '0.25rem',
                        cursor: 'pointer',
                        width: '100%'
                    }}
                >
                    Register
                </button>
            </form>
            <p style={{ marginTop: '1rem' }}>
                Already have an account? <Link to="/login" style={{ color: '#007BFF' }}>Log in here</Link>.
            </p>
        </div>
    );
};

export default Register;
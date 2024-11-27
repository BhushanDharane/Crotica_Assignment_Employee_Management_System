// client/src/components/Profile.js

import React, { useState, useEffect } from 'react';
import { getStudentProfile, updateProfile } from '../services/userService';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [updatedProfile, setUpdatedProfile] = useState({});

  useEffect(() => {
    getStudentProfile().then(data => setProfile(data));
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedProfile(prevState => ({ ...prevState, [name]: value }));
  };

  const handleProfileUpdate = async () => {
    try {
      await updateProfile(updatedProfile);
      alert('Profile updated successfully');
    } catch (error) {
      alert('Failed to update profile');
    }
  };

  return (
    <div>
      <h2>Student Profile</h2>
      {profile ? (
        <div>
          <p>Name: <input type="text" name="name" value={updatedProfile.name || profile.name} onChange={handleInputChange} /></p>
          <p>Email: <input type="text" name="email" value={updatedProfile.email || profile.email} onChange={handleInputChange} /></p>
          <p>Contact Info: <input type="text" name="contactInfo" value={updatedProfile.contactInfo || profile.contactInfo} onChange={handleInputChange} /></p>
          <button onClick={handleProfileUpdate}>Update Profile</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;

"use client";
import React, { useState } from 'react';
import UpdateProfileModal from './UpdateProfileModal';

const UserProfile = ({ user }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-xl font-bold mb-4">User Profile</h2>
      <div className="mb-2">
        <p className="font-semibold">First Name:</p>
        <p>{user.firstName}</p>
      </div>
      <div className="mb-2">
        <p className="font-semibold">Last Name:</p>
        <p>{user.lastName}</p>
      </div>
      <div className="mb-2">
        <p className="font-semibold">Email:</p>
        <p>{user.email}</p>
      </div>
      <button
        className="mt-4 bg-blue-500 text-white py-2 px-4 rounded"
        onClick={handleOpenModal}
      >
        Update Profile
      </button>

      {isModalOpen && (
        <UpdateProfileModal user={user} onClose={handleCloseModal} />
      )}
    </div>
  );
};

export default UserProfile;

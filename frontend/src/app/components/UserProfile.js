// Import React
import React from 'react';

// Define UserProfile component
const UserProfile = ({ user }) => {
    console.log(user);
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
    </div>
  );
};

export default UserProfile;

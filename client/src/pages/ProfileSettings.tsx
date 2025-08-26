import React from 'react';

const ProfileSettings: React.FC = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-blue-50">
      <div className="bg-white shadow-xl rounded-xl px-10 py-8 w-full max-w-3xl">
        <h1 className="text-2xl font-bold mb-4 text-blue-700">Profile Settings</h1>
        <p className="text-gray-600">Update your profile details, change password, and upload profile picture here.</p>
        {/* TODO: Add profile update form, password change, profile picture upload */}
      </div>
    </div>
  );
};

export default ProfileSettings;

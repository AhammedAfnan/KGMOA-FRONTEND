import { useState } from "react";

export default function Profile() {
    const [isModalOpen,setIsModalOpen] = useState(false)

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  const handleSubmit = (e) => {
    e.preventDefault()
    handleCloseModal();
  }

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
          {/* Profile Card */}
            <h1 className="text-2xl font-bold text-center mb-4">Profile</h1>
          <div className="bg-white shadow-lg rounded-lg p-12 w-96">
    
            {/* User Information */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-3">
                <span className="text-gray-700 font-bold">Username:</span>
                <span className="text-gray-900">Admin</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-bold">Password:</span>
                <span className="text-gray-900">********</span>
              </div>
            </div>
    
            {/* Change Password Button */}
            <button
              onClick={handleOpenModal}
              className="w-full bg-gray-600 text-white py-2 mt-2 rounded-lg hover:bg-gray-700 transition duration-200"
            >
              Change Password
            </button>
          </div>
          {isModalOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
          <h2 className="text-xl font-bold mb-4 text-center">Change Password</h2>
          <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  placeholder="Enter current password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  placeholder="Enter new password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <div className="mb-4">
                <label className="block text-gray-700 font-medium mb-1">
                  Confirm New Password
                </label>
                <input
                  type="password"
                  placeholder="Confirm new password"
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-200"
              >
                Submit
              </button>
              <button
                onClick={handleCloseModal}
                type="button"
                className="w-full bg-gray-300 text-gray-700 py-2 rounded-lg mt-2 hover:bg-gray-400 transition duration-200"
              >
                Cancel
              </button>
            </form>
          </div>
          </div>
          )}
        </div>
      );
}

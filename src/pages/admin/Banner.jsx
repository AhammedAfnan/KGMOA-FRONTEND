import React, { useState } from "react";

export default function Banner() {
  const [banners, setBanners] = useState([]);

  const handleAdd = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Temporary preview URL
      setBanners([...banners, imageUrl]);
    }
  };

  const handleEdit = (index) => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = (event) => {
      const file = event.target.files[0];
      if (file) {
        const updatedImageUrl = URL.createObjectURL(file);
        const updatedBanners = [...banners];
        updatedBanners[index] = updatedImageUrl;
        setBanners(updatedBanners);
      }
    };

    fileInput.click();
  };

  const handleDelete = (index) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this banner?"
    );
    if (confirmDelete) {
      setBanners(banners.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="w-full max-w-4xl text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">Banner List</h1>

        {/* Banner List */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          {banners.length === 0 ? (
            <p className="text-gray-500">No banners added yet.</p>
          ) : (
            banners.map((banner, index) => (
              <div
                key={index}
                className="flex justify-between items-center border-b last:border-b-0 py-3"
              >
                {/* Banner Preview */}
                <img
                  src={banner}
                  alt={`Banner ${index + 1}`}
                  className="w-40 h-20 object-cover rounded-lg"
                />

                {/* Actions */}
                <div className="flex gap-4">
                  {/* Edit Button */}
                  <button
                    onClick={() => handleEdit(index)}
                    className="px-4 py-1 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
                  >
                    Edit
                  </button>

                  {/* Delete Button */}
                  <button
                    onClick={() => handleDelete(index)}
                    className="px-4 py-1 bg-red-600 text-white rounded-lg hover:bg-red-700"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
        {/* Add Banner */}
        <div className="my-6">
          <label className="cursor-pointer px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-800">
            Add Banner
            <input
              type="file"
              accept="image/*"
              onChange={handleAdd}
              className="hidden"
            />
          </label>
        </div>
      </div>
    </div>
  );
}

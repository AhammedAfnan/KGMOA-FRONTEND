import React, { useState, useEffect } from "react";
import { API_BASE_URL } from "../../services/config";
import { useNavigate } from "react-router-dom";

const AddNewsPage = () => {
  const navigate = useNavigate();

  // State for managing news data and modal visibility
  const [newsList, setNewsList] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newsData, setNewsData] = useState({
    title: "",
    description: "",
  });

  // Fetch all news when the page loads
  useEffect(() => {
    fetchNews();
  }, []);

  // Fetch news from the backend
  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/news`);
      const data = await response.json();
      if (response.ok) {
        setNewsList(data); // Assuming `data` is an array of news
      }
    } catch (error) {
      console.error("Error fetching news:", error);
    }
  };

  // Handle input changes for the modal
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle modal form submission for adding news
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = newsData._id
        ? `${API_BASE_URL}/news/${newsData._id}` // Update existing news
        : `${API_BASE_URL}/add-news`; // Add new news
      const method = newsData._id ? "PUT" : "POST";

      const response = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: newsData.title,
          description: newsData.description,
        }),
      });

      if (response.ok) {
        setNewsData({ title: "", description: "" });
        setIsModalOpen(false);
        fetchNews(); // Refresh the list
      }
    } catch (error) {
      console.error("Error adding/updating news:", error);
    }
  };

  // Handle delete action
  const handleDelete = async (id) => {
    try {
      
      const response = await fetch(`${API_BASE_URL}/news/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchNews(); // Refresh news list
      }
    } catch (error) {
      console.error("Error deleting news:", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
        <h1 className="text-2xl sm:text-4xl font-bold text-gray-700">
          News Management
        </h1>
        <button
          onClick={() => {
            setNewsData({ title: "", description: "" });
            setIsModalOpen(true);
          }}
          className="bg-blue-500 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
        >
          Add News
        </button>
      </div>
  
      {/* News List */}
      <div className="grid gap-6">
        {newsList.map((news) => (
          <div
            key={news._id}
            className="bg-white p-4 sm:p-6 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-stretch sm:items-center"
          >
            <div className="mb-4 sm:mb-0">
              <h2 className="text-lg sm:text-2xl font-bold text-gray-700">
                {news.title}
              </h2>
              <p className="text-sm sm:text-base text-gray-600">
                {news.description}
              </p>
            </div>
            <div className="flex gap-4">
              <button
                onClick={() => {
                  setNewsData(news);
                  setIsModalOpen(true);
                }}
                className="bg-yellow-500 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg hover:bg-yellow-600"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(news._id)}
                className="bg-red-500 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
  
      {/* Modal for Adding/Editing News */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center p-4">
          <div className="bg-white p-4 sm:p-6 rounded-lg shadow-lg w-full max-w-md sm:max-w-lg">
            <h2 className="text-lg sm:text-2xl font-bold text-gray-700 mb-4">
              {newsData._id ? "Edit News" : "Add News"}
            </h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="title"
                  className="block text-sm sm:text-base text-gray-700 font-semibold mb-2"
                >
                  News Title
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={newsData.title}
                  onChange={handleInputChange}
                  placeholder="Enter news title"
                  className="w-full border rounded-lg p-2 sm:p-3 focus:ring focus:ring-blue-200"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-sm sm:text-base text-gray-700 font-semibold mb-2"
                >
                  News Description
                </label>
                <textarea
                  id="description"
                  name="description"
                  value={newsData.description}
                  onChange={handleInputChange}
                  placeholder="Enter news description"
                  className="w-full border rounded-lg p-2 sm:p-3 focus:ring focus:ring-blue-200"
                  rows="4"
                  required
                ></textarea>
              </div>
              <div className="flex flex-col sm:flex-row justify-end gap-4">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="bg-gray-400 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-500"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-blue-600"
                >
                  {newsData._id ? "Update" : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );  
};

export default AddNewsPage;

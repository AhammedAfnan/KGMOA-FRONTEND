import React, { useState } from "react";
import { API_BASE_URL } from "../../services/config";

const AddNewsPage = () => {
  const [newsData, setNewsData] = useState({
    title: "",
    description: "",
  });

//   const [successMessage, setSuccessMessage] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewsData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // setSuccessMessage("");
    // setErrorMessage("");

    try {
      const response = await fetch(`${API_BASE_URL}/add-news`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newsData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccessMessage("News added successfully!");
        setNewsData({ title: "", description: "" });
      } else {
        setErrorMessage(data.message || "Failed to add news.");
      }
    } catch (error) {
      console.error("Error adding news:", error);
      setErrorMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <h1 className="text-4xl font-bold text-center text-gray-700 mb-8">Add News</h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md"
      >
        {/* Title Input */}
        <div className="mb-6">
          <label
            htmlFor="title"
            className="block text-gray-700 font-semibold mb-2"
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
            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
            required
          />
        </div>

        {/* Description Input */}
        <div className="mb-6">
          <label
            htmlFor="description"
            className="block text-gray-700 font-semibold mb-2"
          >
            News Description
          </label>
          <textarea
            id="description"
            name="description"
            value={newsData.description}
            onChange={handleInputChange}
            placeholder="Enter news description"
            className="w-full border rounded-lg p-3 focus:ring focus:ring-blue-200"
            rows="5"
            required
          ></textarea>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-blue-600 transition-all"
          >
            Submit
          </button>
        </div>

        {/* Success Message */}
        {/* {successMessage && (
          <p className="text-green-600 font-medium mt-4 text-center">
            {successMessage}
          </p>
        )} */}

        {/* Error Message */}
        {/* {errorMessage && (
          <p className="text-red-600 font-medium mt-4 text-center">
            {errorMessage}
          </p>
        )} */}
      </form>
    </div>
  );
};

export default AddNewsPage;

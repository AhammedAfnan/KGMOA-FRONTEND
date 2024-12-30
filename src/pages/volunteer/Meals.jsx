import React, { useState, useEffect } from "react";
import MealCard from "../../components/volunteer/MealCard";
import { API_BASE_URL } from "../../services/config";
import { useParams, useNavigate } from "react-router-dom";

const MealsPage = () => {
  const { userId } = useParams();
  const navigate = useNavigate();
  const [dates, setDates] = useState({ day1: "", day2: "" });
  const initialState = {
    breakfastDay1: false,
    lunchDay1: false,
    dinnerDay1: false,
    breakfastDay2: false,
    lunchDay2: false,
    dinnerDay2: false,
    kitReceived: false,
    checkIn: false,
  };
  const [formState, setFormState] = useState(initialState);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${API_BASE_URL}/get-meal-plan?userId=${userId}`
        );
        const data = await response.json();

        if (data.success) {
          setFormState(data.formState);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [userId]);

  const handleSetDate = () => {
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const formatDate = (date) => date.toISOString().split("T")[0]; // Format as yyyy-mm-dd

    setDates({
      day1: formatDate(today),
      day2: formatDate(tomorrow),
    });
  };

  const handleDateChange = (day, value) => {
    setDates({ ...dates, [day]: value });
  };

  const handleCheckboxChange = (field) => {
    if (formState[field]) return; // Prevent toggling if already true
  
    const updatedState = { ...formState, [field]: true };
    setFormState(updatedState);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const response = await fetch(`${API_BASE_URL}/save-meal-plan`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId,
          formState, // Includes checkIn field and other state
        }),
      });
  
      if (response.ok) {
        alert("Form Submitted and Saved!");
        navigate("/volunteer/scan");
      } else {
        alert("Failed to save form.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred.");
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-300 p-8">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-center text-gray-600 mb-10">
        Meals Planner
      </h1>

      {/* Set Date Button */}
      <div className="flex justify-center mb-10">
        <button
          className="bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg shadow-lg hover:bg-yellow-600 transition-all"
          onClick={handleSetDate}
        >
          Set Date
        </button>
      </div>

      {/* Content Section */}
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <MealCard
          day="Day 1"
          date={dates.day1}
          onDateChange={(value) => handleDateChange("day1", value)}
          formState={formState}
          onCheckboxChange={handleCheckboxChange}
          color="purple"
        />
        <MealCard
          day="Day 2"
          date={dates.day2}
          onDateChange={(value) => handleDateChange("day2", value)}
          formState={formState}
          onCheckboxChange={handleCheckboxChange}
          color="blue"
        />
      </div>

      {/* Additional Options Card */}
      <div className="col-span-1 md:col-span-2 bg-white rounded-lg shadow-lg p-6 mt-6">
        <h2 className="text-2xl font-semibold text-pink-700 mb-4">
          Additional Options
        </h2>
        <div className="space-y-3">
          {["kitReceived", "checkIn"].map((key) => (
            <label key={key} className="flex items-center">
              <input
                type="checkbox"
                checked={formState[key]}
                disabled={formState[key]} // Disable if already clicked
                onChange={() => handleCheckboxChange(key)}
                className="mr-2 focus:ring focus:ring-pink-300 accent-blue-500"
              />
              {key === "kitReceived" ? "Kit Received" : "Check In"}{" "}
              {/* Human-readable labels */}
            </label>
          ))}
        </div>
      </div>

      {/* Submit Button */}
      <div className="text-center mt-10">
        <button
          type="button"
          onClick={handleSubmit}
          className="bg-green-500 text-white font-semibold px-8 py-3 rounded-lg shadow-lg hover:bg-green-600 transition-all"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default MealsPage;

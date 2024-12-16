import React, { useState } from "react";

export default function MealCard({ day, date, onDateChange, formState, onCheckboxChange, color }) {
    return (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className={`text-2xl font-semibold mb-4 text-center text-${color}-700`}>{day}</h2>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => onDateChange(e.target.value)}
              className="border rounded-md px-4 py-2 w-full focus:ring focus:ring-purple-300"
            />
          </div>
          <div className="space-y-3">
            {["Breakfast", "Lunch", "Dinner"].map((meal) => (
              <label className="flex items-center" key={meal}>
                <input
                  type="checkbox"
                  checked={formState[meal.toLowerCase() + day.replace(" ", "")]}
                  onChange={() => onCheckboxChange(meal.toLowerCase() + day.replace(" ", ""))}
                  className="mr-2 focus:ring focus:ring-purple-300"
                />
                {meal}
              </label>
            ))}
          </div>
        </div>
      );
}

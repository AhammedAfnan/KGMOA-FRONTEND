  import { useState } from "react";
import { registerUser } from "../services/api";

  export default function Register() {
    const fields = ["name", "place", "kmc", "mobile", "fee"];
    const [formData, setFormData] = useState(
      fields.reduce((acc,field)=>{
        acc[field] = ""
        return acc;
      },{})
    );

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await registerUser(formData);
        alert('Data saved successfully!');
        setFormData(
          fields.reduce((acc, field) => {
            acc[field] = "";
            return acc;
          }, {})
        );
      } catch (err) {
        console.error(err);
        alert(`Error: ${err.message}`);
      }
    };

    return (
      <div className="flex h-screen justify-center items-center bg-gray-100">
        <div className="w-2/5 flex flex-col items-center justify-center px-10">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-black">
            Register
          </h2>
          <div className="w-full max-w-2xl bg-white p-8 rounded-lg shadow-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              {fields.map((field) => (
                <div key={field}>
                  <label className="block text-sm font-medium text-gray-700 px-2">
                    {field.charAt(0).toUpperCase() + field.slice(1)}:
                  </label>
                  <input
                    type={field === "fee" ? "number" : "text"}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full mt-3 p-2 px-4 border rounded-lg focus:ring focus:ring-black focus:outline-none"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 mt-3 px-4 bg-black text-white font-bold rounded-lg hover:bg-gray-500 focus:outline-none focus:ring focus:ring-black"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

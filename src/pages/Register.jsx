import { useState } from "react";
import { registerUser } from "../services/api";
import { initiatePayment } from "../services/razorpay";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

  export default function Register() {
    const fields = ["name", "place", "kmc", "mobile", "fee"];
    const navigate = useNavigate();
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
        toast.success("Registration successful!");
        setFormData(
          fields.reduce((acc, field) => {
            acc[field] = "";
            return acc;
          }, {})
        );
        initiatePayment(formData, navigate)
      } catch (err) {
        console.error(err);
        toast.error(`${err.message}`);
      }
    };

    return (
      <div className="flex h-screen justify-center items-center bg-gray-100">
        <div className="w-2/5 flex flex-col items-center justify-center px-10">
          <h2 className="text-3xl font-extrabold text-center mb-6 text-black">
            Doctor's Registration
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
                    className="w-full mt-3 p-2 px-4 border rounded-lg focus:ring focus:ring-gray-100 focus:outline-none"
                    placeholder={`Enter ${field}`}
                  />
                </div>
              ))}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-2 mt-3 px-4 bg-black text-white font-bold rounded-lg focus:outline-none focus:ring focus:ring-gray-100"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }

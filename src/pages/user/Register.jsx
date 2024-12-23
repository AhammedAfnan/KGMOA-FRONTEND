import { useState } from "react";
import { registerUser } from "../../services/api";
import { initiatePayment } from "../../services/razorpay";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const fields = ["name", "place", "kmc", "mobile", "regTarrif", "coDel"];
  const fieldDetails = {
    name: { type: "text", placeholder: "Enter your name" },
    place: { type: "text", placeholder: "Enter your place" },
    kmc : { type: "number", placeholder: "Enter KMC number" },
    mobile: { type: "tel", placeholder: "Enter your mobile number" },
    regTarrif: {
      type: "select",
      options: [
        { value: "RC Single", label: "RC Members (Single) - 10,000" },
        { value: "RC Couple", label: "RC Members (Couple) - 20,000" },
        { value: "Delegate Single", label: "Delegate (Single) - 5,000" },
        { value: "Delegate Couple", label: "Delegates (Couple) - 10,000" },
      ],
    },
    coDel: { type: "checkbox", label: "Co Del" },
  };
  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field] = field === "coDel" ? false : ""; // Set coDel to false by default
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => {
      const updatedData = {
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      };
      return updatedData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {      
      
      const responseData = await registerUser(formData)
      
      const userId = responseData.userId;      
      toast.success("Registration successful!");
      setFormData(
        fields.reduce((acc, field) => {
          acc[field] = "";
          return acc;
        }, {})
      );
      initiatePayment({...formData,userId},navigate)
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex min-h-screen justify-center items-center bg-gray-100 px-4">
      <div className="w-full sm:w-3/4 md:w-2/3 lg:w-2/5 flex flex-col items-center justify-center px-4 sm:px-8">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 text-black">
          Doctor's Registration
        </h2>
        <div className="w-full bg-white p-6 sm:p-8 rounded-lg shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-4">
            {fields.map((field) => (
              <div key={field}>
                {fieldDetails[field].type === "checkbox" ? (
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      name={field}
                      checked={formData[field]}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    <label className="text-sm font-medium text-gray-700">
                      {fieldDetails[field].label}
                    </label>
                  </div>
                ) : fieldDetails[field].type === "select" ? (
                  <>
                    <label className="block text-sm font-medium text-gray-700 px-2">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <select
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full mt-3 p-2 px-4 border rounded-lg focus:ring focus:ring-gray-100 focus:outline-none"
                      required
                    >
                      <option value="" disabled>
                        Select an option
                      </option>
                      {fieldDetails[field].options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </>
                ) : (
                  <>
                    <label className="block text-sm font-medium text-gray-700 px-2">
                      {field.charAt(0).toUpperCase() + field.slice(1)}:
                    </label>
                    <input
                      type={fieldDetails[field].type}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      className="w-full mt-3 p-2 px-4 border rounded-lg focus:ring focus:ring-gray-100 focus:outline-none"
                      placeholder={fieldDetails[field].placeholder}
                      required
                    />
                  </>
                )}
              </div>
            ))}
            <div className="mt-6">
              <button
                type="submit"
                className="w-full py-2 px-4 bg-black text-white font-bold rounded-lg focus:outline-none focus:ring focus:ring-gray-100 hover:bg-gray-800"
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

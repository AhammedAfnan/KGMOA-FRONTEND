import { useState } from "react";
import { registerUser } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Register() {
  const fields = [
    "name",
    "place",
    "kmc",
    "mobile",
    "regTarrif",
    "coDel",
    "paymentMode",
    "paymentDate",
    "utrNumberOrCashReceipt",
  ];

  const fieldDetails = {
    name: { type: "text", placeholder: "Enter your name", label: "Name" },
    place: { type: "text", placeholder: "Enter your place", label: "Place" },
    kmc: { type: "String", placeholder: "Enter KMC number", label: "KMC" },
    mobile: {
      type: "tel",
      placeholder: "Enter your mobile number",
      label: "Mobile",
    },
    regTarrif: {
      type: "select",
      label: "Reg Tarrif",
      options: [
        {
          value: "RC Single",
          label: "RC Members (Single) - 10,000",
          amount: 10000,
        },
        {
          value: "RC Couple",
          label: "RC Members (Couple) - 20,000",
          amount: 20000,
        },
        {
          value: "Delegate Single",
          label: "Delegate (Single) - 5,000",
          amount: 5000,
        },
        {
          value: "Delegate Couple",
          label: "Delegates (Couple) - 10,000",
          amount: 10000,
        },
      ],
    },
    coDel: { type: "checkbox", label: "Co Del" },
    paymentMode: {
      type: "radio",
      label: "Payment Mode",
      options: [
        { value: "online", label: "Online" },
        { value: "cash", label: "Cash" },
      ],
    },
    paymentDate: {
      type: "date",
      placeholder: "Select a payment date",
      label: "Payment Date",
    },
    utrNumberOrCashReceipt: {
      type: "text",
      label: "UTR /Cash Receipt Number",
      placeholder: "Enter UTR Number / Cash Receipt Number",
    },
  };

  const navigate = useNavigate();
  const [formData, setFormData] = useState(
    fields.reduce((acc, field) => {
      acc[field] = field === "coDel" ? false : "";
      return acc;
    }, {})
  );

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedOption = fieldDetails.regTarrif.options.find(
      (option) => option.value === formData.regTarrif
    );

    try {
      const responseData = await registerUser({
        ...formData,
        regTarrif: {
          type: formData.regTarrif,
          amount: selectedOption?.amount || 0,
        },
      });
      const userId = responseData.userId;
      toast.success("Registration successful!");
      setFormData(fields.reduce((acc, field) => ({ ...acc, [field]: "" }), {}));
      navigate("/qr-code", { state: { ...formData, userId } });
    } catch (err) {
      console.error(err);
      toast.error(err.message);
    }
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 min-h-screen px-6 py-10 overflow-hidden">
      {/* Responsive Image */}
      <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-8">
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-6">
          Doctor's Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          {fields.map((field) => (
            <div key={field}>
              {fieldDetails[field].type === "checkbox" ? (
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name={field}
                    checked={formData[field]}
                    onChange={handleChange}
                    className="w-5 h-5 text-blue-500 border-gray-300 rounded focus:ring-blue-400"
                  />
                  <label className="ml-3 text-gray-700">
                    {fieldDetails[field].label}
                  </label>
                </div>
              ) : fieldDetails[field].type === "select" ? (
                <div>
                  <label className="block text-gray-700">
                    {fieldDetails[field].label}
                  </label>
                  <select
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    className="w-full mt-2 p-2 border rounded-md focus:ring-blue-400 focus:outline-none"
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
                </div>
              ) : fieldDetails[field].type === "radio" ? (
                <div>
                  <label className="block text-gray-700">
                    {fieldDetails[field].label}
                  </label>
                  <div className="flex space-x-4 mt-2">
                    {fieldDetails[field].options.map((option) => (
                      <label key={option.value} className="flex items-center">
                        <input
                          type="radio"
                          name={field}
                          value={option.value}
                          checked={formData[field] === option.value}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-500 focus:ring-blue-400"
                        />
                        <span className="ml-2">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ) : (
                <div>
                  <label className="block text-gray-700">
                    {fieldDetails[field].label}
                  </label>
                  <input
                    type={fieldDetails[field].type}
                    name={field}
                    value={formData[field]}
                    onChange={handleChange}
                    placeholder={fieldDetails[field].placeholder}
                    className="w-full mt-2 p-2 border rounded-md focus:ring-blue-400 focus:outline-none"
                  />
                </div>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full py-2 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:ring-2 focus:ring-blue-400"
          >
            Register
          </button>
        </form>
      </div>
      <img
        src="/images/reg.jpg"
        alt="Registration Details"
        className="mt-6 w-full max-w-full sm:max-w-sm md:max-w-md lg:max-w-lg rounded-md shadow-md"
      />
    </div>
  );
  
}

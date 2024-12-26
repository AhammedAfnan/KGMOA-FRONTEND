import { useState } from "react";
import { API_BASE_URL } from '../../services/config'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";


export default function AdminLogin() {
  const navigate = useNavigate()

  const [ formData, setFormData ] = useState({
    username:"",
    password:"",
  })

  const handleChange = (e) => {
    const { name , value } = e.target;
    setFormData((prev)=>({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    try {
      const response = await fetch(`${API_BASE_URL}/adminLogin`,{
        method:"POST",
        headers: {
          "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if(response.ok){
        toast.success("Login Successfull");
        localStorage.setItem("isAdminLoggedIn","true")
        navigate('/admin')
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error)
    }
    
  }

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      {/* Image Section */}
      <div className="w-full md:w-1/2">
        <img
          src="/images/Login Page.jpeg"
          className="w-full h-full object-cover"
          alt="Login Page"
        />
      </div>
  
      {/* Form Section */}
      <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-6">
        <div className="w-full max-w-sm">
          <h2 className="text-2xl font-bold text-center mb-6">Admin Login</h2>
          <form
            className="bg-white p-6 rounded-lg w-full"
            method="POST"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"
              required
            />
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full mb-4 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-100"
              required
            />
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-lg transition duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );  
}

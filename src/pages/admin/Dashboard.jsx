import AdminNavbar from "./AdminNavbar";
import AdminTable from "./AdminTable";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {toast} from 'react-toastify'
import {API_BASE_URL} from '../../services/config'

export default function Dashboard() {
  const navigate = useNavigate();
  const [stats, setStats ] = useState([
    { title: "Users Registered", count: 0 },
    { title: "Users Checked In", count: 10 },
    { title: "Users Recieved Kit", count: 4 },
    { title: "Users Attended function", count: 8 },
  ])

  useEffect(()=>{
    const fetchUsersRegistered = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/userCount`)
        const data = await response.json()

        setStats((prev)=>
          prev.map((stat)=>
            stat.title === 'Users Registered'
            ? {...stat, count:data.count}
            : stat
          )
        )
      } catch (error) {
        toast.error(error)
      }
    }
    fetchUsersRegistered()
  },[])
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminNavbar />
      <div className="flex justify-center space-x-6 mb-16 mt-12">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg p-6 w-64 h-40 flex flex-col items-center justify-center"
          >
            <h2 className="text-lg font-semibold text-gray-700 pb-3">
              {stat.title}
            </h2>
            <p className="text-4xl font-bold text-gray-900">{stat.count}</p>
          </div>
        ))}
      </div>
      <div className="w-full flex justify-center">
        <AdminTable />
      </div>
    </div>
  );
}

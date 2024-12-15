import { useNavigate } from "react-router-dom"

export default function AdminNavbar() {
    const navigate = useNavigate()
  return (
    <nav className="flex justify-between items-center px-6 py-4 bg-gray-400 text-white">
        <h1 className="text-4xl font-bold">Admin Dashboard</h1>
        <div className="flex-grow flex justify-center">
          <a href="/admin/banner" className="text-xl">
            Banner
          </a>
        </div>
        <button
          onClick={() => navigate("/admin/profile")}
          className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center text-white text-lg hover:bg-gray-800"
        >
          P
        </button>
      </nav>
  )
}

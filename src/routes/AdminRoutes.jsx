import { Routes, Route } from 'react-router-dom'
import AdminLogin from '.././pages/admin/AdminLogin'
import Dashboard from '../pages/admin/Dashboard'
import Profile from '../pages/admin/Profile'
import Banner from '../pages/admin/Banner'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path='/' element={ <Dashboard /> } />
      <Route path='/login' element={ <AdminLogin />} />
      <Route path='/profile' element={ <Profile />} />
      <Route path='/banner' element={ <Banner />} />
    </Routes>
  )
}

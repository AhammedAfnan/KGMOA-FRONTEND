import { Routes, Route } from 'react-router-dom'
import AdminLogin from '.././pages/admin/AdminLogin'
import Dashboard from '../pages/admin/Dashboard'
import Password from '../pages/admin/Password'
import Banner from '../pages/admin/Banner'

export default function AdminRoutes() {
  return (
    <Routes>
      <Route path='/' element={ <Dashboard /> } />
      <Route path='/login' element={ <AdminLogin />} />
      <Route path='/password' element={ <Password />} />
      <Route path='/banner' element={ <Banner />} />
    </Routes>
  )
}

import { Routes, Route } from 'react-router-dom'
import Register from '../pages/user/Register'
import QRCode from '../pages/user/QRCode'
import Home from '../pages/user/Home'
import Conference from '../pages/user/Conference'
import NewsDetails from "../pages/user/newsDetails";


export default function UserRoutes() {
  return (
    <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Home />} />
        <Route path='/qr-code' element={ <QRCode /> } />
        <Route path='/conference' element={ <Conference /> } />
        <Route path="/news/:id" element={<NewsDetails />} />
    </Routes>
  )
}

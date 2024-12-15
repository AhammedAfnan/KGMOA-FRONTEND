import { Routes, Route } from 'react-router-dom'
import Register from '../pages/user/Register'
import QRCode from '../pages/user/QRCode'


export default function UserRoutes() {
  return (
    <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/qr-code' element={ <QRCode /> } />
    </Routes>
  )
}

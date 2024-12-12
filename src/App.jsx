import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Register from "./pages/Register"
import QRCode from './pages/QRCode';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/register' element={<Register />}/>
        <Route path='/qr-code' element={<QRCode />} />
      </Routes>
    </Router>
  )
}

export default App

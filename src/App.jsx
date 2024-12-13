import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import Register from "./pages/Register";
import QRCode from './pages/QRCode';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/register' element={<Register />} />
          <Route path='/qr-code' element={<QRCode />} />
        </Routes>
      </Router>
      {/* Include ToastContainer at the root level */}
      <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}

export default App;

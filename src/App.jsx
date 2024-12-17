import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer
import 'react-toastify/dist/ReactToastify.css'; // Import Toastify CSS
import UserRoutes from './routes/UserRoutes';
import AdminRoutes from './routes/AdminRoutes';
import VolunteerRoutes from './routes/VolunteerRoutes';


function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/*' element={ <UserRoutes />} />
          <Route path='/admin/*' element={ <AdminRoutes /> } />
          <Route path='/volunteer/*' element={ <VolunteerRoutes />} />
        </Routes>
      </Router>
      {/* Include ToastContainer at the root level */}
      <ToastContainer position="top-right" autoClose={2000} hideProgressBar={false} newestOnTop={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
    </>
  );
}

export default App;

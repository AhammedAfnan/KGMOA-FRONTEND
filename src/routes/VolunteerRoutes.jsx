import { Route, Routes } from "react-router-dom";
import PrivateRoute from "../components/PrivateRoute";
import VolunteerLogin from "../pages/volunteer/VolunteerLogin";
import QRCodeScanPage from "../pages/volunteer/Scan";
import MealsPage from "../pages/volunteer/Meals";

export default function VolunteerRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<VolunteerLogin />} />
      <Route
        path="/scan"
        element={
          <PrivateRoute role="volunteer">
            <QRCodeScanPage />
          </PrivateRoute>
        }
      />
      <Route
        path="/meals/:userId"
        element={
          <PrivateRoute role="volunteer">
            <MealsPage />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

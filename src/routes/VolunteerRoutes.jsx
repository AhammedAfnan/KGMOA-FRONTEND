import { Route, Routes } from "react-router-dom";
import VolunteerLogin from "../pages/volunteer/VolunteerLogin";
import QRCodeScanPage from "../pages/volunteer/Scan";

export default function VolunteerRoutes() {
  return (
    <Routes>
        <Route path="/login" element={<VolunteerLogin />} />
        <Route path="/scan" element={<QRCodeScanPage />} />
    </Routes>
  )
}

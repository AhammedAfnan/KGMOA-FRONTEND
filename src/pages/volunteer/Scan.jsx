// import { useState, useEffect } from "react";
// import QrScanner from "react-qr-scanner";
// import { useNavigate, useLocation } from "react-router-dom";

// const QRCodeScanPage = () => {
//   const [scannedData, setScannedData] = useState(null);
//   const [userId, setUserId] = useState(null);  // To store the userId passed from the previous page
//   const navigate = useNavigate();
//   const location = useLocation(); // To access state from the previous page

//   // Extract userId from location state when the component mounts
//   useEffect(() => {
//     if (location.state && location.state.userId) {
//       setUserId(location.state.userId); // Store the userId in state
//     }
//   }, [location.state]); // Only run when location.state changes

//   const handleScan = (data) => {
//     if (data) {
//       try {
//         // Decode the scanned QR code data
//         const qrData = JSON.parse(data);

//         // Extract userId and other data from the QR code
//         const { userId: qrUserId, userName, timestamp } = qrData;

//         setScannedData(qrData);

//         // Check if the scanned QR code userId matches the passed userId
//         if (qrUserId === userId) {
//           // Navigate to the user's meal page (or any relevant page)
//           navigate(`/meals/${qrUserId}`);
//         } else {
//           console.error("Scanned QR code does not match the expected userId");
//         }
//       } catch (error) {
//         console.error("Error decoding QR code:", error);
//       }
//     }
//   };

//   const handleError = (err) => {
//     console.error(err);
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
//       <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
//         <h1 className="text-2xl font-bold text-purple-700 mb-4">Scan QR Code</h1>
//         <p className="text-gray-600 mb-6">
//           Place the QR code in the center of the frame to scan it.
//         </p>
//         <QrScanner
//           delay={300}
//           onError={handleError}
//           onScan={handleScan}
//           style={{ width: "100%" }}
//           constraints={{
//             video: { facingMode: "environment" }, // Use the rear camera
//           }}
//         />
//       </div>
//     </div>
//   );
// };

// export default QRCodeScanPage;




import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QRCodeScanner() {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const scanner = new Html5QrcodeScanner("reader", {
      qrbox: { width: 250, height: 250 },
      fps: 5,
    });

    scanner.render(
      (result) => {
        // Success callback
        try {
          scanner.clear(); // Stop the scanner
          const parsedResult = JSON.parse(result); // Parse the scanned data
          if (parsedResult?.userId) {
            setScanResult(parsedResult.userId);
            navigate(`/volunteer/meals/${parsedResult.userId}`);
          } else {
            console.error("Invalid QR code: No userId found");
          }
        } catch (err) {
          console.error("Error parsing QR code:", err);
        }
      },
      (error) => {
        // Error callback
        console.warn("QR Code scanning error:", error);
      }
    );

    return () => {
      scanner.clear(); // Clean up the scanner when the component unmounts
    };
  }, [navigate]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-black mb-4">Scan QR Code</h1>
      <div id="reader" className="bg-white p-4 rounded shadow"></div>
      {scanResult && (
        <div className="text-green-500 mt-4">Scanned User ID: {scanResult}</div>
      )}
    </div>
  );
}

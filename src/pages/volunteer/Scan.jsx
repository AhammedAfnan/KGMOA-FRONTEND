import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function QRCodeScanner() {
  const [scanResult, setScanResult] = useState(null);
  const navigate = useNavigate();
  const scannerRef = useRef(null); // Use a ref for scanner instance

  useEffect(() => {
    const initializeScanner = () => {
      if (!scannerRef.current) { // Ensure only one instance is created
        scannerRef.current = new Html5QrcodeScanner(
          "reader",
          {
            qrbox: { width: 250, height: 250 },
            fps: 5,
          },
          false // Disable additional configuration for simplicity.
        );

        scannerRef.current.render(
          (result) => {
            // Success callback
            try {
              scannerRef.current.clear(); // Stop the scanner
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
      }
    };

    initializeScanner();

    // Cleanup function
    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear();
        scannerRef.current = null; // Ensure the instance is reset
      }
    };
  }, [navigate]);

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Back button */}
      <button
        onClick={() => navigate('/volunteer/login')}
        className="absolute top-4 right-4 md:top-6 md:right-6 bg-red-500 text-white px-3 py-1 md:px-4 md:py-2 rounded"
      >
        Back
      </button>

      {/* Title */}
      <h1 className="text-xl md:text-2xl font-bold text-black mb-4 text-center">
        Scan QR Code
      </h1>

      {/* QR Code Scanner */}
      <div
        id="reader"
        className="bg-white p-3 md:p-4 rounded shadow w-full max-w-xs md:max-w-md"
      ></div>

      {/* Scanned Result */}
      {scanResult && (
        <div className="text-green-500 mt-4 text-center">
          Scanned User ID: {scanResult}
        </div>
      )}
    </div>
  );
}

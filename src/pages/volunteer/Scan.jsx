import React from "react";
import QrScanner from "react-qr-scanner";

const QRCodeScanPage = () => {
  const handleScan = (data) => {
    if (data) {
      alert(`QR Code Data: ${data}`);
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-purple-700 mb-4">Scan QR Code</h1>
        <p className="text-gray-600 mb-6">
          Place the QR code in the center of the frame to scan it.
        </p>
        <QrScanner
          delay={300}
          onError={handleError}
          onScan={handleScan}
          style={{ width: "100%" }}
          constraints={{
            video: { facingMode: "environment" }, // Use the rear camera
          }}
        />
      </div>
    </div>
  );
};

export default QRCodeScanPage;

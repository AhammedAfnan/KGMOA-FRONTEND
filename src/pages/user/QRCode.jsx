import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QrCode from "react-qr-code";
import axios from "axios";
import { API_BASE_URL } from "../../services/config";

export default function QRCode() {
  const location = useLocation();
  const navigate = useNavigate();

  const [hasSavedQR, setHasSavedQR] = useState(false); // Track if QR code has been saved
  const [isSaving, setIsSaving] = useState(false); // Track saving state
  const [errorMessage, setErrorMessage] = useState(""); // Track errors

  const formData = location.state || {};
  const { userId, name: userName } = formData;

  const qrValue = JSON.stringify({
    userId: userId || "defaultUserId",
    userName: userName || "defaultUser",
    timestamp: new Date().toISOString(),
  });

  const containerRef = useRef(null);

  // Save the QR code to the database
  const saveQRCodeToDatabase = async (qrImage) => {
    try {
      setIsSaving(true);
      const response = await axios.post(`${API_BASE_URL}/save-qr`, {
        userId,
        userName,
        qrCodeImage: qrImage,
      });
      setHasSavedQR(true); // Mark as saved
    } catch (error) {
      setErrorMessage("Failed to save QR Code. Please try again.");
      console.error("Error saving QR Code:", error);
    } finally {
      setIsSaving(false);
    }
  };

  // Generate and save QR code
  const generateAndSaveQRCode = () => {
    if (hasSavedQR) return; // Skip if already saved

    const svg = containerRef.current.querySelector("svg");
    if (!svg) {
      console.error("Error: QR Code SVG not found!");
      setErrorMessage("Error generating QR Code. Please refresh the page.");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      saveQRCodeToDatabase(pngFile); // Save QR code
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  useEffect(() => {
    generateAndSaveQRCode();
  }, []);

  // Download QR Code as a PNG file
  const downloadQRCode = () => {
    const svg = containerRef.current.querySelector("svg");
    if (!svg) {
      console.error("Error: QR Code SVG not found!");
      setErrorMessage("Error generating QR Code for download.");
      return;
    }

    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = pngFile;
      link.download = `${userName || "defaultUser"}_qr-code.png`;
      link.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-black mb-4">Registration Successful</h1>

      {errorMessage && (
        <div className="text-red-500 mb-4">{errorMessage}</div>
      )}

      {isSaving ? (
        <div className="text-gray-600 mb-4">Saving QR Code...</div>
      ) : (
        <div ref={containerRef} className="bg-white p-4 rounded shadow">
          <QrCode value={qrValue} size={200} />
        </div>
      )}

      <div className="mt-6 flex space-x-4">
        <button
          onClick={downloadQRCode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Download
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
        >
          Home
        </button>
      </div>
    </div>
  );
}

import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import QrCode from "react-qr-code";
import axios from "axios";
import { API_BASE_URL } from "../../services/config";

export default function QRCode() {
  const location = useLocation();
  const navigate = useNavigate();

  const [hasSavedQR, setHasSavedQR] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const formData = location.state || {};
  const { userId, name: userName } = formData;

  if (!userId || !userName) {
    return null; // Early exit if user data is invalid
  }

  const qrValue = JSON.stringify({
    userId: userId,
    userName: userName,
    timestamp: new Date().toISOString(),
  });

  const containerRef = useRef(null);
  const hasGeneratedRef = useRef(false);  // Ref to track if QR code has been generated

  const dataURLtoFile = (dataUrl, filename) => {
    const arr = dataUrl.split(",");
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };

  const saveQRCodeToDatabase = async (file) => {
    try {
      setIsSaving(true);

      // Create FormData and append the file
      const uploadData = new FormData();
      uploadData.append("userId", userId);
      uploadData.append("userName", userName);
      uploadData.append("file", file);

      // Upload the QR code image to Cloudinary
      const uploadResponse = await axios.post(
        `${API_BASE_URL}/upload-cloudinary`,
        uploadData,
        { headers: { "Content-Type": "multipart/form-data" } }
      );

      if (uploadResponse.data && uploadResponse.data.qrCodeUrl) {
        setHasSavedQR(true);
        setErrorMessage(""); // Clear errors on success
      } else {
        throw new Error("Invalid response from the server");
      }
    } catch (error) {
      setErrorMessage("Failed to save QR Code. Please try again.");
      console.error("Error saving QR Code:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const generateAndSaveQRCode = () => {
    if (hasSavedQR || hasGeneratedRef.current) return;  // Avoid generating and saving again

    const svg = containerRef.current?.querySelector("svg");
    if (!svg) {
      setErrorMessage("Error generating QR Code. Please refresh the page.");
      console.error("Error: QR Code SVG not found!");
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
      const file = dataURLtoFile(pngFile, `${userName}_qr-code.png`);
      saveQRCodeToDatabase(file);
      hasGeneratedRef.current = true;  // Mark as generated
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  useEffect(() => {
    // Only trigger QR code generation if necessary and no previous error
    if (!hasSavedQR && !hasGeneratedRef.current) {
      try {
        generateAndSaveQRCode();
      } catch (error) {
        setErrorMessage("An error occurred while generating the QR Code.");
        console.error(error);
      }
    }
  }, [userId, userName, hasSavedQR]);  // Only depend on userId, userName, and hasSavedQR

  const downloadQRCode = () => {
    const svg = containerRef.current?.querySelector("svg");
    if (!svg) {
      setErrorMessage("Error generating QR Code for download.");
      console.error("Error: QR Code SVG not found!");
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
      link.download = `${userName}_qr-code.png`;
      link.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
      <h1 className="text-2xl font-bold text-black mb-4">
        Registration Successful
      </h1>

      {/* {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>} */}

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

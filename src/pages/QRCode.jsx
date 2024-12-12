import { useRef } from "react";
import QrCode from "react-qr-code";
import { useNavigate } from "react-router-dom";

export default function QRCode() {
  const navigate = useNavigate();
  const qrValue = JSON.stringify({
    // id: uuidv4(),
    // timestamp: new Date().toISOString(),
  });

  const containerRef = useRef(null);

  const downloadQRCode = () => {
    const svg = containerRef.current.querySelector("svg"); // Locate the SVG inside the wrapper div
    if (!svg) {
      console.error("SVG not found!");
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
      link.download = "qr-code.png";
      link.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-black mb-6">
        You have Registered Successfully
      </h1>
      <QrCode value={qrValue} />
      <div className="mt-6 flex space-x-4">
        <button
          onClick={downloadQRCode}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Download
        </button>
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Home
        </button>
      </div>
    </div>
  );
}

export default function QRCode() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Extract formData from location.state and include userId
  const formData = location.state?.formData || {};
  const userName = formData?.name || "defaultUser"; // Fallback to 'defaultUser'
  const userId = formData?.userId || "defaultUserId"; // Fallback to 'defaultUserId'

  // Include userId and timestamp in the QR code value
  const qrValue = JSON.stringify({ userId, userName, timestamp: new Date().toISOString() });
  
  const containerRef = useRef(null);

  // Save the QR code to the database
  useEffect(() => {
    const saveQRCodeToDatabase = async (qrImage) => {
      try {
        const response = await axios.post(`${API_BASE_URL}/save-qr`, { 
          userId, 
          userName,
          qrCodeImage: qrImage // Send the base64 image to the backend
        });
        console.log("QR Code saved successfully!", response.data);
      } catch (error) {
        console.error("Error saving QR Code:", error);
      }
    };

    // Generate the QR code image and save it to the database
    const generateAndSaveQRCode = () => {
      const svg = containerRef.current.querySelector("svg");
      if (!svg) {
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
        const pngFile = canvas.toDataURL("image/png"); // Base64 image string

        // Save the QR code to the backend
        saveQRCodeToDatabase(pngFile);
      };

      img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
    };

    generateAndSaveQRCode();
  }, [userId, userName]); // Trigger effect when userId or userName changes

  // Function to download the QR code
  const downloadQRCode = () => {
    const svg = containerRef.current.querySelector("svg");
    if (!svg) {
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
      link.download = `${userName}_qr-code.png`; // Use dynamic username
      link.click();
    };

    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold text-black mb-6">
        Registration Successful
      </h1>
      <div ref={containerRef}>
        <QrCode value={qrValue} />
      </div>
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

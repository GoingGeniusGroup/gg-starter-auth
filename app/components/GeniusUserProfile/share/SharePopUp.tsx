import { useState, useEffect } from "react";
import QRCode from "qrcode";
import Image from "next/image";

const SharePopup = ({ url, onClose }: { url: string; onClose: () => void }) => {
  const [qrCodeData, setQrCodeData] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    QRCode.toDataURL(url, { width: 150, margin: 1 })
      .then((dataUrl) => setQrCodeData(dataUrl))
      .catch((error) => console.error("QR Code generation failed", error));
  }, [url]);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadQRCode = () => {
    if (qrCodeData) {
      const link = document.createElement("a");
      link.href = qrCodeData;
      link.download = "qr-code.png";
      link.click();
    }
  };

  const handleOutsideClick = (
    e: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-black/60 z-50 backdrop-blur-md"
      onClick={handleOutsideClick}
    >
      <div className="bg-white/10 backdrop-blur-xl p-6 rounded-3xl shadow-xl w-96 relative border border-white/20">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold text-white">Share Profile</h2>
        </div>
        <div className="flex flex-col items-center gap-6">
          {qrCodeData ? (
            <Image
              src={qrCodeData}
              alt="QR Code"
              height={150}
              width={150}
              className="rounded-lg border-2 border-gray-500"
              unoptimized
            />
          ) : (
            <p className="text-gray-300">Generating QR Code...</p>
          )}
          <button
            onClick={downloadQRCode}
            className="px-4 py-2 text-white bg-blue-500 rounded-full hover:bg-blue-600 shadow-md"
          >
            Download QR Code
          </button>
          <div className="w-full flex gap-2 items-center">
            <input
              type="text"
              value={url}
              readOnly
              className="flex-1 px-3 py-2 text-gray-300 bg-white/20 backdrop-blur-md rounded-lg border border-white/30 focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleCopyToClipboard}
              className={`px-4 py-2 rounded-full text-white ${
                copied
                  ? "bg-green-500 hover:bg-green-600"
                  : "bg-blue-500 hover:bg-blue-600"
              } shadow-md`}
            >
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-300 hover:text-white"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default SharePopup;

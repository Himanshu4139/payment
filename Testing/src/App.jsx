import React, { useEffect, useState } from "react";
import QrScanner from "qr-scanner";

const PaytmQRPaymentFromImage = () => {
  const [qrData, setQrData] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const paymentAmount = 1; // Example: Rs. 50
  const qrImage = "/img.jpeg"; // Replace with the actual path to your QR code image

  useEffect(() => {
    const imgElement = document.getElementById("qr-image");
    if (imgElement) {
      QrScanner.scanImage(qrImage)
        .then((result) => {
          setQrData(result);
          console.log("Scanned QR Code Data:", result);
        })
        .catch((error) => {
          console.error("Error scanning QR code:", error);
        });
    }
  }, [qrImage]);

  // Function to open the payment gateway selection dialog
  const openPaymentDialog = () => {
    if (!qrData) {
      alert("QR code data not found. Please try again.");
      return;
    }
    setIsDialogOpen(true);
  };

  // Function to handle payment gateway selection
  const handlePaymentGateway = () => {
    const orderId = `ORDER${Math.floor(Math.random() * 1000000)}`; // Generate a unique order ID
    const callbackUrl = "https://payment-ten-blush.vercel.app/"; // Replace with your callback URL
    let paymentURL = `${qrData}`;


  

    // Redirect to the selected payment gateway
    window.location.href = paymentURL;
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Pay with UPI</h1>
      <div>
        <img
          id="qr-image"
          src={qrImage}
          alt="QR Code"
          style={{ width: "300px", height: "300px" }}
        />
      </div>

      {qrData && (
        <div>
          <h3>Payment Amount: Rs. {paymentAmount}</h3>
          <button
          onClick={()=>{
            handlePaymentGateway();
          }}>
            Pay Rs. {paymentAmount}
          </button>
        </div>
      )}
    </div>
  );
};

export default PaytmQRPaymentFromImage;

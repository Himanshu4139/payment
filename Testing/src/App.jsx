import React, { useEffect, useState } from "react";
import QrScanner from "qr-scanner";

const PaytmQRPaymentFromImage = () => {
  const [qrData, setQrData] = useState(null); // Scanned QR data
  const paymentAmount = 1; // Payment amount in INR
  const qrImage = "/img.jpeg"; // Path to the QR code image

  // UseEffect to scan the QR code image and extract data
  useEffect(() => {
    const scanQRCode = async () => {
      try {
        const result = await QrScanner.scanImage(qrImage);
        setQrData(result);
        console.log("Scanned QR Code Data:", result);
      } catch (error) {
        console.error("Error scanning QR code:", error);
      }
    };

    scanQRCode();
  }, [qrImage]);

  // Function to handle payment gateway redirection
  const handlePaymentGateway = () => {
    if (!qrData) {
      alert("QR code data not found. Please try again.");
      return;
    }

    // Construct the UPI payment URL
    const paymentURL = `upi://pay?pa=7061506967@ptsbi&pn=Himanshu%20%20Kumar&mc=0000&mode=01&purpose=00&orgid=159761&cust=1503870329
&am=${paymentAmount}&cu=INR`;

    // Log the payment URL for debugging
    console.log("Constructed Payment URL:", paymentURL);

    // Use an anchor tag to handle UPI redirection
    const anchor = document.createElement("a");
    anchor.href = paymentURL;
    anchor.click();
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Pay with UPI</h1>

      {/* Display QR code image */}
      <div>
        <img
          id="qr-image"
          src={qrImage}
          alt="QR Code"
          style={{ width: "300px", height: "300px" }}
        />
      </div>

      {/* Display payment button only if QR data is available */}
      {qrData && (
        <div>
          <h3>Payment Amount: Rs. {paymentAmount}</h3>
          <button onClick={handlePaymentGateway}>Pay Rs. {paymentAmount}</button>
        </div>
      )}
    </div>
  );
};

export default PaytmQRPaymentFromImage;

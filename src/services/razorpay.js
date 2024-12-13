import axios from "axios";
import { API_BASE_URL } from "./config";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const initiatePayment = async (formData, navigate) => {
  try {
    // Call backend to create Razorpay order
    const paymentResponse = await axios.post(`${API_BASE_URL}/create-order`, {
      amount: formData.fee * 100,
    });

    if (paymentResponse.data.success) {
      const { order } = paymentResponse.data;

      const options = {
        key: "rzp_test_0z2P7RCTRhYYJo", // Replace with your Razorpay Key ID
        amount: order.amount,
        currency: order.currency,
        name: "KGMOA",
        description: "Registration Fee",
        order_id: order.id,
        handler: async (response) => {
          try {
            const saveResponse = await axios.post(
              `${API_BASE_URL}/verify-payment`,
              {
                kmc: formData.kmc, // Unique identifier to find the record
                paymentId: response.razorpay_payment_id, // Extract payment ID
                razorpay_order_id: response.razorpay_order_id, // Order ID
                razorpay_signature: response.razorpay_signature, // Signature
              }
            );
            if (saveResponse.data.success) {
              toast.success("Payment Successful!");
              navigate("/qr-code"); // Navigate after saving payment info
            } else {
              toast.error(
                "Failed to save payment information. Please contact support."
              );
            }
          } catch (error) {
            console.error("Error saving payment info:", error);
            toast.error("An error occurred while saving payment information.");
          }
        },
        prefill: {
          name: formData.name,
          email: "test@example.com", // Replace with user's email if available
          contact: formData.mobile,
        },
        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    }
  } catch (error) {
    console.error(error);
    alert("Failed to initiate payment");
  }
};

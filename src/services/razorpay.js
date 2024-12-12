import axios from "axios";
import {API_BASE_URL} from './config'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const initiatePayment = async (formData, navigate) => {
  try {
    // Call backend to create Razorpay order
    const paymentResponse = await axios.post(`${API_BASE_URL}/create-order`, {
      amount: formData.fee * 100, // Convert amount to paise
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
        handler: (response) => {
          console.log(response);
          toast.success("Payment Successful!");
          navigate('/qr-code')
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

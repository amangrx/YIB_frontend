import { useState } from "react";
import axios from "axios";
import { useAuth } from "../Context/AuthContext";
import { toast } from "react-toastify";

const useKhalti = ({ onSuccess, onError }) => {
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuth();

  const initiatePayment = async (paymentData) => {
    setIsLoading(true);
    setError(null);

    try {
      console.log("Initiating payment with data:", paymentData);

      // First call your backend to initiate payment - using camelCase property names
      const response = await axios.post(
        `http://localhost:8081/api/yib/payments/khalti/initiate/${paymentData.resourceId}`,
        {
          amount: paymentData.amount,
          purchaseOrderId: paymentData.purchaseOrderId,
          purchaseOrderName: paymentData.purchaseOrderName,
          customerInfo: paymentData.customerInfo,
          returnUrl: paymentData.returnUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Payment response:", response.data);

      const paymentUrl = response.data.paymentUrl;

      // Redirect to Khalti payment page
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        console.error("No payment URL received in response");
        throw new Error("Invalid payment response");
      }

      if (onSuccess) onSuccess(response.data);
      return response.data;
    } catch (err) {
      console.error("Payment initiation failed:", err);

      // Log detailed error info
      if (err.response) {
        console.error("Error response data:", err.response.data);
        console.error("Error status:", err.response.status);
      }

      setError(err.response?.data || { message: "Payment failed" });
      toast.error(err.response?.data?.message || "Payment initiation failed");
      if (onError) onError(err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const verifyPayment = async (pidx) => {

    try {
      console.log(pidx);
      const response = await axios.get(
        `http://localhost:8081/api/yib/payments/khalti/verify`,
        {
          params:{pidx},
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("paxi", response);
      return response.data;
    } catch (error) {
      console.error("Payment verification failed:", error);
      throw error;
    }
  };

  return { initiatePayment, verifyPayment, error, isLoading };
};

export default useKhalti;

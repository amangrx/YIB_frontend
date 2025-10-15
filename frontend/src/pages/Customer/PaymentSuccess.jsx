import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CheckCircle } from "@mui/icons-material";
import { Box, Typography, Button, CircularProgress } from "@mui/material";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../../Context/AuthContext";

const PaymentSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [paymentStatus, setPaymentStatus] = useState("verifying");
  const [paymentDetails, setPaymentDetails] = useState(null);
  const { token } = useAuth();

  // Try localStorage first, then sessionStorage
  const resourceId =
    localStorage.getItem("lastPaymentResourceId") ||
    sessionStorage.getItem("lastPaymentResourceId");

  // Debug: Log all stored values
  useEffect(() => {
    console.log(
      "LocalStorage resourceId:",
      localStorage.getItem("lastPaymentResourceId")
    );
    console.log(
      "SessionStorage resourceId:",
      sessionStorage.getItem("lastPaymentResourceId")
    );
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      localStorage.removeItem("lastPaymentResourceId");
      sessionStorage.removeItem("lastPaymentResourceId");
    };
  }, []);

  useEffect(() => {
    const verifyPayment = async () => {
      const queryParams = new URLSearchParams(location.search);
      const pidx = queryParams.get("pidx");
      console.log(queryParams, pidx);

      if (!pidx) {
        setPaymentStatus("error");
        return;
      }

      try {
        const response = await axios.get(
          `http://localhost:8081/api/yib/payments/khalti/verify?pidx=${pidx}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Payment verification response:", response.data);
        setPaymentDetails(response.data);
        setPaymentStatus("success");
      } catch (error) {
        console.error("Payment verification failed:", error);
        setPaymentStatus("error");
        toast.error("Payment verification failed");
      }
    };

    verifyPayment();
  }, [location.search, token]);

  if (paymentStatus === "verifying") {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        textAlign="center"
        p={3}
      >
        <CircularProgress size={60} />
        <Typography variant="h6" mt={3}>
          Verifying your payment...
        </Typography>
      </Box>
    );
  }

  if (paymentStatus === "error") {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        minHeight="60vh"
        textAlign="center"
        p={3}
      >
        <Typography color="error" variant="h4" gutterBottom>
          Payment Verification Failed
        </Typography>
        <Typography variant="body1" mb={3}>
          We couldn't verify your payment. Please check your email or contact
          support.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={() => navigate("/library")}
        >
          Back to Resources
        </Button>
      </Box>
    );
  }

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minHeight="60vh"
      textAlign="center"
      p={3}
    >
      <CheckCircle sx={{ fontSize: 80, color: "green", mb: 2 }} />
      <Typography variant="h4" gutterBottom>
        Payment Successful!
      </Typography>
      <Typography variant="body1" mb={2}>
        Thank you for your purchase of {paymentDetails?.purchase_order_name}.
      </Typography>
      <Typography variant="body1" mb={3}>
        Transaction ID: {paymentDetails?.transaction_id}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        onClick={() => navigate("/library")}
      >
        Back to Resource
      </Button>
    </Box>
  );
};

export default PaymentSuccess;

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Typography,
  Box,
  TextField,
  CircularProgress,
} from "@mui/material";
import CreditCardIcon from "@mui/icons-material/CreditCard";
import useKhalti from "../hooks/useKhalti";
import { toast } from "react-toastify";

const PaymentDialog = ({ open, onClose, resource }) => {
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const { initiatePayment, error, isLoading } = useKhalti({
    onSuccess: (response) => {
      console.log("Payment initiated successfully:", response);
    },
    onError: (error) => {
      console.error("Payment failed:", error);
      toast.error(error.message || "Payment initiation failed");
    },
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handlePayment = async (e) => {
    e.preventDefault();

    if (
      !resource ||
      !customerInfo.name ||
      !customerInfo.email ||
      !customerInfo.phone
    ) {
      toast.error("Please fill all customer information");
      return;
    }

    if (!/^[9][6-8]\d{8}$/.test(customerInfo.phone)) {
      toast.error("Please enter a valid Nepali phone number (98XXXXXXXX)");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerInfo.email)) {
      toast.error("Please enter a valid email address");
      return;
    }

    localStorage.setItem("lastPaymentResourceId", resource.resourceId);
    sessionStorage.setItem("lastPaymentResourceId", resource.resourceId);
    console.log("Stored resourceId:", resource.resourceId);

    // Create payment data with camelCase property names to match Java backend
    const paymentData = {
      resourceId: resource.resourceId,
      amount: resource.price * 100, // Convert to paisa
      purchaseOrderId: `order_${Date.now()}`, // Changed from purchase_order_id to purchaseOrderId
      purchaseOrderName: resource.title, // Changed from purchase_order_name to purchaseOrderName
      customerInfo: customerInfo, // Changed from customer_info to customerInfo
      returnUrl: "http://localhost:5173/payment/success", // Added required returnUrl field
    };

    console.log("Sending payment data:", paymentData);

    try {
      await initiatePayment(paymentData);
    } catch (err) {
      console.error("Payment initiation failed:", err);
    }
  };

  // Theme colors
  const theme = {
    primary: "#6a0dad",
    secondary: "#f5f5f5",
    text: "#333333",
    lightText: "#666666",
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ p: 3, textAlign: "center" }}>
        <DialogTitle
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            color: theme.primary,
          }}
        >
          <CreditCardIcon sx={{ fontSize: 40, mr: 2 }} />
          <Box component="span" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            Complete Your Payment
          </Box>
        </DialogTitle>

        <DialogContent
          sx={{
            backgroundColor: theme.secondary,
            borderRadius: "4px",
            p: 3,
            mt: 2,
          }}
        >
          <Box component="form" onSubmit={handlePayment} sx={{ mt: 2 }}>
            <TextField
              fullWidth
              label="Full Name"
              name="name"
              value={customerInfo.name}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={customerInfo.email}
              onChange={handleChange}
              margin="normal"
              required
            />

            <TextField
              fullWidth
              label="Phone Number"
              name="phone"
              type="tel"
              value={customerInfo.phone}
              onChange={handleChange}
              margin="normal"
              required
              inputProps={{ pattern: "[9][6-8][0-9]{8}" }}
              helperText="Format: 98XXXXXXXX"
            />

            <Typography variant="h6" sx={{ mt: 3, color: theme.text }}>
              Pay NPR {resource?.price?.toFixed(2) || "0.00"} for:{" "}
              {resource?.title}
            </Typography>

            <Typography variant="body2" sx={{ color: theme.lightText, mb: 3 }}>
              You'll be redirected to Khalti's secure payment page.
            </Typography>

            {error && (
              <Typography color="error" sx={{ mb: 2 }}>
                Error: {error.message}
              </Typography>
            )}

            <Button
              type="submit"
              variant="contained"
              fullWidth
              size="large"
              disabled={isLoading}
              sx={{
                py: 2,
                mt: 2,
                backgroundColor: theme.primary,
                "&:hover": { backgroundColor: "#5a0b9d" },
                fontSize: "1.1rem",
              }}
              startIcon={
                isLoading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  <CreditCardIcon />
                )
              }
            >
              {isLoading ? "Processing..." : "Pay with Khalti"}
            </Button>
          </Box>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default PaymentDialog;

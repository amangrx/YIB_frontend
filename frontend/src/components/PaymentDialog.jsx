import { Dialog, DialogTitle, DialogContent, Button, Typography, Box } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import { khalti } from '../utils/UseImages';

const PaymentDialog = ({ open, onClose, resource }) => {
  const handlePaymentRedirect = () => {
    // Replace with your actual payment gateway URL
    window.open('https://payment-gateway.example.com/checkout', '_blank');
    onClose();
  };

  // White theme colors with accent colors
  const whiteTheme = {
    primary: '#ffffff',       // White
    secondary: '#f5f5f5',     // Light gray
    accent: '#6a0dad',        // Purple accent color
    text: '#333333',          // Dark text
    lightText: '#666666'       // Light text
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <Box sx={{ 
        p: 3, 
        textAlign: 'center',
        backgroundColor: whiteTheme.primary,
        color: whiteTheme.text
      }}>
        <DialogTitle sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          color: whiteTheme.accent  // Using accent color for the title
        }}>
          <CreditCardIcon sx={{ 
            fontSize: 40, 
            mr: 2,
            color: 'inherit'
          }} />
          <Typography variant="h4" component="div" sx={{ color: 'inherit' }}>
            Payment Gateway
          </Typography>
        </DialogTitle>

        <DialogContent sx={{ 
          backgroundColor: whiteTheme.secondary,
          borderRadius: '4px',
          padding: '20px',
          marginTop: '16px'
        }}>
          <Box sx={{ my: 3 }}>
            <img 
              src={khalti} 
              alt="Payment Gateway Logo" 
            />
          </Box>

          <Typography variant="h6" sx={{ color: whiteTheme.text, mb: 2 }}>
            Pay NPR {resource?.price || '0.00'} to access: {resource?.title}
          </Typography>

          <Typography variant="body2" sx={{ color: whiteTheme.lightText, mb: 3 }}>
            You'll be redirected to a secure payment page to complete your transaction.
          </Typography>

          <Button
            variant="contained"
            sx={{ 
              mt: 2, 
              py: 2, 
              fontSize: '1.1rem',
              backgroundColor: whiteTheme.accent,  // Using accent color for the button
              color: 'white',
              '&:hover': {
                backgroundColor: '#5a0b9d',  // Darker shade of accent
                transform: 'translateY(-2px)',
                boxShadow: '0 4px 8px rgba(0,0,0,0.2)'
              },
              transition: 'all 0.3s ease'
            }}
            size="large"
            fullWidth
            onClick={handlePaymentRedirect}
            startIcon={<CreditCardIcon sx={{ color: 'white' }} />}
          >
            Proceed to Payment
          </Button>
        </DialogContent>
      </Box>
    </Dialog>
  );
};

export default PaymentDialog;
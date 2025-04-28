import React, { useState } from 'react';
import { Button } from '@mui/material';
import PaymentDialog from './PaymentDialog';

const PaymentButton = ({ resource }) => {
  const [openDialog, setOpenDialog] = useState(false);

  return (
    <>
      <Button
        variant="contained"
        color="primary"
        size="large"
        onClick={() => setOpenDialog(true)}
        sx={{
          py: 1.5,
          px: 4,
          fontSize: '1rem',
          fontWeight: 'bold',
          borderRadius: 2
        }}
      >
        Buy Now (NPR {resource.price?.toFixed(2)})
      </Button>
      
      <PaymentDialog 
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        resource={resource}
      />
    </>
  );
};

export default PaymentButton;
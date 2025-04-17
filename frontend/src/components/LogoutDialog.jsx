import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import LogoutIcon from "@mui/icons-material/Logout";

const LogoutDialog = ({ open, onClose, onConfirm }) => {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="logout-dialog-title"
      aria-describedby="logout-dialog-description"
    >
      <DialogTitle id="logout-dialog-title">Confirm Logout.</DialogTitle>
      <DialogContent>
        <DialogContentText id="logout-dialog-description">
          Any unsaved changes will be lost.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={onConfirm}
          color="error"
          startIcon={<LogoutIcon />}
          autoFocus
        >
          Logout
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default LogoutDialog;

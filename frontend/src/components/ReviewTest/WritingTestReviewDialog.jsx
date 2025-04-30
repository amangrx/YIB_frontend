import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Grid,
  Box,
  Typography,
  Chip,
  Paper,
  Button,
  Alert,
  CircularProgress,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import {
  CheckCircleOutline,
  PendingActions,
  RateReview,
  AccessTime,
  Person,
  Description,
} from "@mui/icons-material";

const WritingTestReviewDialog = ({
  open,
  onClose,
  test,
  testAnswer,
  answerLoading,
  reviewData,
  onInputChange,
  onSubmit,
  isSubmitting,
  submitError,
  successMessage,
}) => {
  const getStatusChip = (status) => {
    let color;
    let icon;
    switch (status) {
      case "PENDING":
        color = "warning";
        icon = <PendingActions fontSize="small" />;
        break;
      case "IN_REVIEW":
        color = "info";
        icon = <RateReview fontSize="small" />;
        break;
      case "COMPLETED":
        color = "success";
        icon = <CheckCircleOutline fontSize="small" />;
        break;
      default:
        color = "default";
    }
    return (
      <Chip
        label={status}
        color={color}
        size="small"
        icon={icon}
        sx={{ textTransform: "capitalize" }}
      />
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: "12px",
          overflow: "hidden",
        },
      }}
    >
      <DialogTitle
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: 2,
          px: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box>
          <Typography variant="h6">Writing Test Review</Typography>
          <Typography variant="subtitle2" sx={{ opacity: 0.8 }}>
            ID: {test?.testId}
          </Typography>
        </Box>
        {test && getStatusChip(test.status)}
      </DialogTitle>

      <DialogContent dividers sx={{ p: 0 }}>
        <Box sx={{ p: 3 }}>
          {/* Test Meta Section */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              mb: 3,
              p: 2,
              bgcolor: "grey.50",
              borderRadius: 1,
              flexWrap: "wrap",
              gap: 2,
            }}
          >
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                <Person
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Customer
              </Typography>
              <Typography variant="body1" fontWeight="medium">
                {test?.customerName}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                <AccessTime
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Submitted
              </Typography>
              <Typography variant="body1">
                {test && new Date(test.submittedAt).toLocaleString()}
              </Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                <Description
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Question
              </Typography>
              <Typography variant="body1">{test?.questionCategory}</Typography>
            </Box>
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                <AccessTime
                  fontSize="small"
                  sx={{ verticalAlign: "middle", mr: 1 }}
                />
                Duration
              </Typography>
              <Typography variant="body1">{test?.duration} minutes</Typography>
            </Box>
          </Box>

          {/* User's Answer Section */}
          <Box sx={{ mb: 4 }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 1,
                gap: 1,
              }}
            >
              <Typography variant="h6">User's Answer</Typography>
              <Chip
                label={`${
                  testAnswer?.answer?.length || test?.answer?.length || 0
                } characters`}
                size="small"
                color="info"
              />
            </Box>
            <Paper
              variant="outlined"
              sx={{
                p: 2,
                minHeight: "200px",
                maxHeight: "300px",
                bgcolor: "grey.50",
                borderRadius: 1,
                overflow: "auto",
              }}
            >
              {answerLoading ? (
                <Box
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  height="100%"
                >
                  <CircularProgress size={24} />
                </Box>
              ) : (
                <Typography variant="body1" whiteSpace="pre-wrap">
                  {testAnswer?.answer || test?.answer || "No answer provided"}
                </Typography>
              )}
            </Paper>
          </Box>

          {/* Evaluation Section */}
          <Box>
            <Typography variant="h6" sx={{ mb: 2 }}>
              Evaluation
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <TextField
                  fullWidth
                  label="Score (0-9)"
                  name="score"
                  type="number"
                  value={reviewData.score}
                  onChange={(e) => {
                    const value = parseFloat(e.target.value);
                    if (isNaN(value) || value < 0 || value > 9) return;
                    onInputChange(e);
                  }}
                  inputProps={{
                    min: 0,
                    max: 9,
                    step: 0.5,
                  }}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <Tooltip title="Score (0-9)">
                          <span>Score</span>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  error={
                    reviewData.score &&
                    (reviewData.score < 0 || reviewData.score > 9)
                  }
                  helperText={
                    reviewData.score &&
                    (reviewData.score < 0 || reviewData.score > 9)
                      ? "Must be between 0 and 9"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Detailed Feedback"
                  name="feedback"
                  value={reviewData.feedback}
                  onChange={onInputChange}
                  multiline
                  rows={5}
                  variant="outlined"
                  placeholder="Provide constructive feedback..."
                  error={
                    reviewData.feedback &&
                    reviewData.feedback.trim().length < 20
                  }
                  helperText={
                    reviewData.feedback &&
                    reviewData.feedback.trim().length < 20
                      ? "Feedback should be at least 20 characters"
                      : ""
                  }
                />
              </Grid>
            </Grid>
          </Box>
        </Box>
      </DialogContent>

      <DialogActions
        sx={{
          p: 2,
          borderTop: 1,
          borderColor: "divider",
          justifyContent: "space-between",
        }}
      >
        <Box>
          {submitError && (
            <Alert severity="error" sx={{ mb: 1 }}>
              {submitError}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" sx={{ mb: 1 }}>
              {successMessage}
            </Alert>
          )}
        </Box>
        <Box>
          <Button
            onClick={onClose}
            color="inherit"
            sx={{ mr: 1 }}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={onSubmit}
            color="primary"
            variant="contained"
            disabled={isSubmitting}
            startIcon={
              isSubmitting ? (
                <CircularProgress size={20} color="inherit" />
              ) : null
            }
          >
            {isSubmitting ? "Submitting..." : "Submit Evaluation"}
          </Button>
        </Box>
      </DialogActions>
    </Dialog>
  );
};

export default WritingTestReviewDialog;
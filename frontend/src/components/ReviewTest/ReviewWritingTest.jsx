import React, { useEffect, useState } from "react";
import {
  CircularProgress,
  Typography,
  Chip,
  Button,
  Box,
  Alert,
  Container,
  Paper,
  createTheme,
  Tooltip,
  ThemeProvider,
} from "@mui/material";
import { Grading, CheckCircleOutline } from "@mui/icons-material";
import expertService from "../../service/writingTestService";
import { useAuth } from "../../Context/AuthContext";
import Table from "../Table";
import WritingTestReviewDialog from "./WritingTestReviewDialog";

const theme = createTheme({
  palette: {
    primary: { main: "#2E8B57", light: "#3CB371", dark: "#228B22", contrastText: "#FFFFFF" },
    secondary: { main: "#20B2AA", light: "#66CDAA", dark: "#008B8B", contrastText: "#FFFFFF" },
    success: { main: "#2E8B57", contrastText: "#FFFFFF" },
    info: { main: "#4682B4", contrastText: "#FFFFFF" },
    warning: { main: "#FFA500", contrastText: "#FFFFFF" },
    error: { main: "#DC143C", contrastText: "#FFFFFF" },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          borderRadius: "8px",
          textTransform: "none",
          fontWeight: "bold",
          boxShadow: "none",
          "&:hover": { boxShadow: "none" },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { borderRadius: "12px" },
      },
    },
  },
});

const ReviewWritingTest = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const [selectedTest, setSelectedTest] = useState(null);
  const [testAnswer, setTestAnswer] = useState(null);
  const [answerLoading, setAnswerLoading] = useState(false);
  const [reviewData, setReviewData] = useState({ score: "", feedback: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  useEffect(() => {
    const fetchTests = async () => {
      try {
        if (!token) throw new Error("No authentication token found");
        const response = await expertService.getAllTestsByExpert(token);
        setTests(response);
        setLoading(false);
      } catch (err) {
        setError(err.message || "Failed to get tests for expert review");
        setLoading(false);
        console.error("Error fetching tests:", err);
      }
    };
    fetchTests();
  }, [token]);

  const handleReviewClick = async (test) => {
    setSelectedTest(test);
    setReviewData({ score: "", feedback: "" });
    setSubmitError(null);
    setAnswerLoading(true);

    try {
      const answer = await expertService.getWritingTestAnswer(test.testId, token);
      setTestAnswer(answer);
    } catch (err) {
      console.error("Error fetching test answer:", err);
      setSubmitError("Failed to load test answer details");
    } finally {
      setAnswerLoading(false);
    }
  };

  const handleClose = () => {
    setSelectedTest(null);
    setTestAnswer(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setReviewData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmitReview = async () => {
    if (!reviewData.score || reviewData.score < 0 || reviewData.score > 9) {
      setSubmitError("Please provide a valid score between 0 and 9");
      return;
    }

    if (!reviewData.feedback || reviewData.feedback.trim().length < 20) {
      setSubmitError("Please provide detailed feedback (at least 20 characters)");
      return;
    }

    setIsSubmitting(true);
    try {
      await expertService.submitReview(
        selectedTest.testId,
        { score: Number(reviewData.score), feedback: reviewData.feedback },
        token
      );

      setTests(tests.map(test => 
        test.testId === selectedTest.testId 
          ? { ...test, status: "COMPLETED" } 
          : test
      ));

      setSuccessMessage("Review submitted successfully!");
      setTimeout(() => {
        handleClose();
        setSuccessMessage(null);
      }, 1500);
    } catch (err) {
      console.error("Review submission error:", err);
      setSubmitError(err.response?.data?.message || err.message || "Failed to submit review");
    } finally {
      setIsSubmitting(false);
    }
  };

  const columns = [
    {
      key: "testId",
      label: "Test ID",
      render: (value) => <span>{value}</span>,
    },
    {
      key: "customerName",
      label: "Customer",
      render: (value) => <Typography variant="body1" fontWeight="medium">{value}</Typography>,
    },
    {
      key: "submittedAt",
      label: "Submitted",
      render: (value) => new Date(value).toLocaleDateString(),
    },
    {
      key: "status",
      label: "Status",
      render: (value) => (
        <Chip
          label={value}
          color={
            value === "PENDING" ? "warning" :
            value === "IN_REVIEW" ? "info" :
            value === "COMPLETED" ? "success" : "default"
          }
          size="small"
          icon={
            value === "PENDING" ? <PendingActions fontSize="small" /> :
            value === "IN_REVIEW" ? <RateReview fontSize="small" /> :
            value === "COMPLETED" ? <CheckCircleOutline fontSize="small" /> : null
          }
          sx={{ textTransform: "capitalize" }}
        />
      ),
    },
    {
      key: "questionCategory",
      label: "Question",
      render: (value, row) => (
        <Tooltip title={`Question ID: ${row.questionId}`}>
          <Typography variant="body1">{value}</Typography>
        </Tooltip>
      ),
    },
    {
      key: "duration",
      label: "Duration",
      render: (value) => `${value} mins`,
    },
    {
      key: "actions",
      label: "Actions",
      render: (_, row) => (
        <Button
          variant="contained"
          size="small"
          onClick={() => handleReviewClick(row)}
          sx={{ textTransform: "none" }}
          disabled={row.status === "COMPLETED"}
          color={row.status === "COMPLETED" ? "success" : "primary"}
          startIcon={row.status === "COMPLETED" ? <CheckCircleOutline /> : <Grading />}
        >
          {row.status === "COMPLETED" ? "Reviewed" : "Review"}
        </Button>
      ),
    },
  ];

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>
      </Container>
    );
  }

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="xl" sx={{ py: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}>
          Writing Tests for Review
        </Typography>

        {tests.length > 0 ? (
          <Paper elevation={3} sx={{ width: "100%", overflow: "hidden" }}>
            <Table columns={columns} data={tests} loading={loading} error={error} />
          </Paper>
        ) : (
          <Alert severity="info" sx={{ width: "100%" }}>
            No tests available for review at this time.
          </Alert>
        )}

        <WritingTestReviewDialog
          open={!!selectedTest}
          onClose={handleClose}
          test={selectedTest}
          testAnswer={testAnswer}
          answerLoading={answerLoading}
          reviewData={reviewData}
          onInputChange={handleInputChange}
          onSubmit={handleSubmitReview}
          isSubmitting={isSubmitting}
          submitError={submitError}
          successMessage={successMessage}
        />
      </Container>
    </ThemeProvider>
  );
};

export default ReviewWritingTest;
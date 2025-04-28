import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Chip,
  Button,
  Box,
  Alert,
  Container
} from '@mui/material';
import expertService from '../../service/writingTestService';
import { useAuth } from '../../Context/AuthContext';

const ReviewWritingTest = () => {
  const [tests, setTests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchTests = async () => {
      try {
        if (!token) {
          throw new Error('No authentication token found');
        }

        const response = await expertService.getAllTestsByExpert(token);
        setTests(response);
        setLoading(false);
      } catch (err) {
        setError(err.message || 'Failed to get tests for expert review');
        setLoading(false);
        console.error('Error fetching tests:', err);
      }
    };

    fetchTests();
  }, [token]);

  const handleReview = (testId) => {
    console.log(`Review test with ID: ${testId}`);
    // history.push(`/review/${testId}`);
  };

  const getStatusChip = (status) => {
    let color;
    switch (status) {
      case 'PENDING':
        color = 'warning';
        break;
      case 'IN_REVIEW':
        color = 'info';
        break;
      case 'COMPLETED':
        color = 'success';
        break;
      default:
        color = 'default';
    }
    return <Chip label={status} color={color} size="small" />;
  };

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
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
        Tests Available for Review
      </Typography>

      {tests.length > 0 ? (
        <TableContainer component={Paper} elevation={3} sx={{ width: '100%' }}>
          <Table sx={{ minWidth: 900 }} aria-label="tests table"> {/* Increased minWidth */}
            <TableHead sx={{ backgroundColor: 'grey.100' }}>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Test ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Customer</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Submitted</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '20%' }}>Question</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '10%' }}>Duration</TableCell>
                <TableCell sx={{ fontWeight: 'bold', width: '15%' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tests.map((test) => (
                <TableRow
                  key={test.testId}
                  hover
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell sx={{ width: '15%' }}>{test.testId}</TableCell>
                  <TableCell sx={{ width: '20%' }}>
                    <Typography variant="body1" fontWeight="medium">
                      {test.customerName}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: '15%' }}>
                    {new Date(test.submittedAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell sx={{ width: '15%' }}>
                    {getStatusChip(test.status)}
                  </TableCell>
                  <TableCell sx={{ width: '20%' }}>
                    <Typography variant="body1">{test.questionCategory}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      ID: {test.questionId}
                    </Typography>
                  </TableCell>
                  <TableCell sx={{ width: '10%' }}>
                    {test.duration} mins
                  </TableCell>
                  <TableCell sx={{ width: '15%' }}>
                    <Button
                      variant="contained"
                      size="small"
                      onClick={() => handleReview(test.testId)}
                      sx={{ textTransform: 'none' }}
                    >
                      Review
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="info" sx={{ width: '100%' }}>
          No tests available for review at this time.
        </Alert>
      )}
    </Container>
  );
};

export default ReviewWritingTest;
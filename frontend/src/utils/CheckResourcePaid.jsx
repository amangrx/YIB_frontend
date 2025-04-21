const CheckResourcePaid = async (resourceId, token) => {
    if (!resourceId) {
      return {
        hasPaid: false,
        loading: false,
        error: "Missing resource ID",
      };
    }
  
    if (!token) {
      return {
        hasPaid: false,
        loading: false,
        error: "Authentication required",
      };
    }
  
    try {
      const response = await fetch(
        `http://localhost:8081/api/yib/auth/check/pay/${resourceId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      if (response.status === 401) {
        return {
          hasPaid: false,
          loading: false,
          error: "Unauthorized - Please login again",
        };
      }
  
      if (!response.ok) {
        throw new Error(`Payment check failed with status: ${response.status}`);
      }
  
      const data = await response.json();
      return {
        hasPaid: data.hasPaid || false,
        loading: false,
        error: null,
      };
    } catch (error) {
      return {
        hasPaid: false,
        loading: false,
        error: error.message || "Failed to check payment status",
      };
    }
  };
  
  export default CheckResourcePaid;
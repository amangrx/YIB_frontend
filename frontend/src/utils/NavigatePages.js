import { useNavigate } from "react-router-dom";

const NavigatePages = () => {
  const navigate = useNavigate();
  return {
    // Public pages
    goToHome: () => {
      navigate("/");
    },
    goToLogin: () => {
      navigate("/login");
    },
    goToSignUp: () => {
      navigate("/register");
    },
    goToTakeTest: () =>{
      navigate("/take_test");
    },
    goToLibrary: () =>{
      navigate("/library")
    },
    goToPractice: () =>{
      navigate("/practice")
    },

    // Admin pages
    goToAdminHome: () => {
      navigate("/admin/dashboard");
    }, 
    goToApproveRequests: () => {
      navigate("/admin/request");
    },

    // Expert pages
    goToExpertDashboard: () => {
      navigate("/expert/dashboard");
    },

    // Customer pages
    goToCustomerDashboard: () => {
      navigate("/customer/dashboard");
    }, 
    goToAddResource: () => {
      navigate("/expert/resource");
    },
    goToResourceDetails: (resourceId) => {
      navigate(`/library/${resourceId}`);
    },
  };
};

export default NavigatePages;

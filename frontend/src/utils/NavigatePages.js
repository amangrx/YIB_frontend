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
    goToUserTest: (questionId) =>{
      navigate(`/test/${questionId}`);
    },
    goToTestAnswer: (questionId) =>{
      navigate(`/answers/${questionId}`);
    },
    goToReadingAndListeningAns:(questionId) =>{
      navigate(`/reading_listening_ans/${questionId}`)
    },
    goToReadingAndListeningTest:(questionId) =>{
      navigate(`/test/reading-listening/${questionId}`)
    }
  };
};

export default NavigatePages;

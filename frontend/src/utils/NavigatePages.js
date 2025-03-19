import { useNavigate } from "react-router-dom";

const NavigatePages = () => {
  const navigate = useNavigate();
  return {
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
    }
  };
};

export default NavigatePages;

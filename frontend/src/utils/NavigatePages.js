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
  };
};

export default NavigatePages;

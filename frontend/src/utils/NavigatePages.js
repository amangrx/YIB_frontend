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
  };
};

export default NavigatePages;

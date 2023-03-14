import React from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../layout/Loader";

const ProtectedRoute = ({ children, isAdmin }) => {
  const {
    isAuthenticated = false,
    loading = true,
    user,
  } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  if (loading) return <Loader />;

  if (!loading && isAuthenticated) {
    if (isAdmin === true && user.role !== "admin") {
      return navigate("/");
    }
    return children;
  } else {
    return navigate("/login");
  }
};

export default ProtectedRoute;

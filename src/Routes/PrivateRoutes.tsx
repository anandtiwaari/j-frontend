import React, { useEffect } from "react";
import { Navigate } from "react-router-dom";
import NavigationBar from "../Components/NavigationBar";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const PrivateRoutes = ({ children }: { children: React.ReactNode }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const decoded = jwtDecode(token);
    localStorage.setItem("user_details", JSON.stringify(decoded));
    console.log(
      decoded,
      "show the decoded data here now and check that one here ............."
    );
  }, []);

  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("token")}`;
  return (
    <>
      <NavigationBar />
      {children}
    </>
  );
};

export default PrivateRoutes;

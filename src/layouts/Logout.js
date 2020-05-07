import React from "react";

const Logout = () => {
  localStorage.clear("token");
  window.location.replace("/login");
};

export default Logout;

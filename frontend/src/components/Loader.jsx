import React from "react";
import { FaSpinner } from "react-icons/fa";


const Loader = () => {
  return (
    <div className="loader-container">
      <FaSpinner className="spinner-icon" />
    </div>
  );
};

export default Loader;

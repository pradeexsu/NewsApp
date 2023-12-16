import React from "react";
import Loader from "./Loader.gif";

const Spinner = () => {
  return (
    <div className="text-center">
      <img className="my-3" src={Loader} alt="Loader" />
    </div>
  );
};

export default Spinner;

// import React, { Component } from "react";
import React from "react";
import Loader from "./Loader.gif";

// export default class Spinner extends Component {

const Spinner = () => {
  // render() {
    return (
      <div className="text-center">
        <img className="my-3" src={Loader} alt="Loader" />
      </div>
    );
  // }
}

export default Spinner;
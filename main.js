// 1. Import React Object model
import React from "react";
// 2. Import ReactDOM for rendering React Component in DOM
import ReactDom from "react-dom";
// 3. Import bootstrap
import "!style-loader!css-loader!bootstrap/dist/css/bootstrap.min.css";
import MainComponent from "./reduxapp/maincomponent";

 
ReactDom.render( <MainComponent/> , document.getElementById("app"));
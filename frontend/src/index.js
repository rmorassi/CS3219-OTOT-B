import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ApiInteraction from "./ApiInteraction";

var destination = document.querySelector("#container")

ReactDOM.render(
    <div>
        <ApiInteraction />
    </div>,
    destination
);
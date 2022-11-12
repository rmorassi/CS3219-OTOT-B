import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import ApiInteraction from "./ApiInteraction";
import ServerlessInteraction from "./ServerlessInteraction";

var destination = document.querySelector("#container")

ReactDOM.render(
    <div>
        <ApiInteraction />
        <hr/>
        <ServerlessInteraction />
    </div>,
    destination
);
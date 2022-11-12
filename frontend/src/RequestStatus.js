import React, { Component } from "react";

class RequestStatus extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var {status, message, data} = this.props.response;

        status = (status) ? status : "No status yet";
        message = (message) ? message : "No message yet.";
        data = (data) ? data : "No data present.";

        return (
            <ul class="list-group">
                <li class="list-group-item">Status: {status}</li>
                <li class="list-group-item">Message: {message}</li>
                <li class="list-group-item">Data: {data}</li>
            </ul>
        );
    }
};

export default RequestStatus;
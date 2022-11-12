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
            <pre>
                <div class="container text-left">
                    <p>Status: {status}</p>
                    <p>Message: {message}</p>
                    <p>Data: {data}</p>
                </div>
            </pre>
        );
    }
};

export default RequestStatus;
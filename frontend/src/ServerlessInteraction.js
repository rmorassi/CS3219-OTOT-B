import React, { Component } from "react";

var link = "https://otottaskb-367404.as.r.appspot.com";
var apiLink = "/api/tempAvg";

class ServerlessInteraction extends Component {
    constructor(props) {
        super(props);

        this.state = {dataPoints: null, avg: null};

        this.processRequest = this.processRequest.bind(this);
    }

    processRequest(e) {
        var date = this._date.value + ":00"

        console.log(date);

        fetch(link + apiLink + "?date_time=" + date, {
            method: "GET"
        })
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            this.setState({dataPoints: JSON.stringify(data.dataPoints), avg: data.avg.toFixed(2)});
        })
        .catch((err) => {
            console.log(err);
        });

        e.preventDefault(); // Prevent page reload
    }

    render() {
        var {dataPoints, avg} = this.state;

        dataPoints = (dataPoints) ? dataPoints : "";
        avg = (avg) ? avg + "°C": "";

        return (
            <div className="serverlessInteractionMain">
                <div className="header">
                    <form onSubmit={this.processRequest}>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Input date and time</span>
                            {/* <input class="form-control" ref={(a) => this._gender = a} placeholder="Male"></input> */}
                            <input type="datetime-local" ref={(a) => this._date = a} ></input>
                        </div>
                        <button class="btn btn-primary" type="submit">Get average temperature</button>
                        <br></br>
                        <br></br>
                    </form>
                </div>
                <ul class="list-group">
                    <li class="list-group-item">Average temperature recorded: {avg}</li>
                    <li class="list-group-item">Number of weather stations recorded at that time: {dataPoints}</li>
                </ul>
            </div>
        );
    }
}

export default ServerlessInteraction;
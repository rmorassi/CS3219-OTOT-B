import React, { Component } from "react";
import RequestStatus from "./RequestStatus";

var link = "https://otottaskb-367404.as.r.appspot.com";
var apiLink = "/api/studentRooster";

class ApiInteraction extends Component {
    constructor(props) {
        super(props);

        this.state = {status: null, message: null, data: null};

        this.processRequest = this.processRequest.bind(this);
    }
    processRequest(e) {
        var res;

        // See all students
        if (this._requestType.value == "a") {
            fetch(link + apiLink, {
                method: "GET"
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({status: JSON.stringify(data.status), message: JSON.stringify(data.message), data: JSON.stringify(data.data)});
            })
            .catch((err) => {
                console.log(err);
            });
        }
        // Add a student
        else if (this._requestType.value == "b") {
            let body = {
                name: this._name.value,
                house: this._house.value, 
                roomNumber: parseInt(this._roomNumber.value),
                gender: this._gender.value
            }
            console.log(body)
            fetch(link + apiLink, {
                method: "POST",
                body: JSON.stringify(body)
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({status: JSON.stringify(data.status), message: JSON.stringify(data.message), data: JSON.stringify(data.data)});
            })
            .catch((err) => {
                console.log(err);
            });
        }
        // See specific student
        else if (this._requestType.value == "c") {
            fetch(link + apiLink + "/" + this._id.value, {
                method: "GET"
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({status: JSON.stringify(data.status), message: JSON.stringify(data.message), data: JSON.stringify(data.data)});
            })
            .catch((err) => {
                console.log(err);
            });
        }
        // Edit student
        else if (this._requestType.value == "d") {
            let body = {
                name: this._name.value,
                house: this._house.value, 
                roomNumber: parseInt(this._roomNumber.value),
                gender: this._gender.value
            }
            console.log(body)
            fetch(link + apiLink + "/" + this._id.value, {
                method: "PUT",
                body: { name: this._name.value, house: this._house.value, roomNumber: this._roomNumber.value, gender: this._gender.value }
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({status: JSON.stringify(data.status), message: JSON.stringify(data.message), data: JSON.stringify(data.data)});
            })
            .catch((err) => {
                console.log(err);
            });
        }
        // Delete student
        else if (this._requestType.value == "e") {
            fetch(link + apiLink + "/" + this._id.value, {
                method: "DELETE"
            })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                this.setState({status: JSON.stringify(data.status), message: JSON.stringify(data.message), data: JSON.stringify(data.data)});
            })
            .catch((err) => {
                console.log(err);
            });
        }

        e.preventDefault(); // Prevent page reload
    }

    render() {
        return (
            <div className="apiInteractionMain">
                <div className="header">
                    <form onSubmit={this.processRequest}>
                        <div>
                            <select class="form-select" ref={(a) => this._requestType = a}>
                                <option selected value="a">See all students</option>
                                <option value="b">Add student</option>
                                <option value="c">See specific student</option>
                                <option value="d">Edit student</option>
                                <option value="e">Delete student</option>
                            </select>
                            <br></br>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Student identification number</span>
                            <input class="form-control" ref={(a) => this._id = a} placeholder="000000000000000000000000"></input>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Full name</span>
                            <input class="form-control" ref={(a) => this._name = a} placeholder="Charlie"></input>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">House</span>
                            <input class="form-control" ref={(a) => this._house = a} placeholder="Ponya"></input>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Room number</span>
                            <input class="form-control" ref={(a) => this._roomNumber = a} placeholder="34"></input>
                        </div>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Gender</span>
                            <input class="form-control" ref={(a) => this._gender = a} placeholder="Male"></input>
                        </div>
                        <button class="btn btn-primary" type="submit">Process Request</button>
                        <br></br>
                    </form>
                </div>
                <div>
                    <RequestStatus response={this.state} />
                </div>
            </div>
        );
    }
}

export default ApiInteraction;
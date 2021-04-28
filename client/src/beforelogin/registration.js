import axios from "../axios";
import { Component } from "react";
import { Link } from "react-router-dom";

export default class Registration extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };

        // this.handleChange = this.handleChange.bind(this);
    }

    //What we need to do:
    //1. render 4 input fields+button
    // 2. capture the user input and store it somewhere
    // 3. when user submits. send the data to the server
    // if something goes wrong, condiditionally render an error message
    // if everything goes to perfection, redirect the user '/'

    handleChange(e) {
        // console.log("handleChange is running for every inputfield");
        // console.log("handleChange e.target.value", e.target.value);
        this.setState(
            {
                [e.target.name]: e.target.value,
            },
            () => console.log("this.state: ", this.state)
        );
    }

    handleClick() {
        console.log("clicked the button");
        axios
            .post("/register", this.state)
            .then(({ data }) => {
                console.log("data handleClick", data);
                //TO DO:
                //if everything went well, redirect the user to "/"
                //if something went wrong, conditionally render an error message
                console.log("data", data);
                if (data.success) {
                    console.log("success");
                    location.replace("/");
                } else {
                    this.setState({
                        error: true,
                    });
                    console.log("wow");
                }
            })
            .catch((err) => console.log("error", err));
    }

    render() {
        return (
            <div>
                <div className="logRegButt">
                    <div className="backButtonDiv">
                        <Link to="/login" style={{ textDecoration: "none" }}>
                            <p className="backButton">Login!</p>
                        </Link>
                    </div>
                </div>
                <div className="bodyBox">
                    <div className="regLogBox">
                        <div className="mainHeaderDiv">
                            {" "}
                            <h1 className="mainHeader">Kanjimemory</h1>
                        </div>

                        <h1 className="logHeader2">
                            Stay connected with all your friends across hell
                        </h1>

                        {this.state.error && (
                            <p className="error">
                                oops!!! something went wrong!!
                            </p>
                        )}
                        <div className="regInputFields">
                            <div className="input">
                                <input
                                    type="text"
                                    name="first"
                                    placeholder="first"
                                    onChange={(e) => this.handleChange(e)}
                                ></input>
                            </div>
                            <div className="input">
                                {" "}
                                <input
                                    type="text"
                                    name="last"
                                    placeholder="last"
                                    onChange={(e) => this.handleChange(e)}
                                ></input>
                            </div>
                            <div className="input">
                                {" "}
                                <input
                                    type="text"
                                    name="email"
                                    placeholder="email"
                                    onChange={(e) => this.handleChange(e)}
                                ></input>
                            </div>
                            <div className="input">
                                {" "}
                                <input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    onChange={(e) => this.handleChange(e)}
                                ></input>
                            </div>
                            <div className="button">
                                {" "}
                                <button
                                    onClick={() => this.handleClick()}
                                    className="buttonPushable3"
                                >
                                    <span className="buttonFront3">
                                        Register
                                    </span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

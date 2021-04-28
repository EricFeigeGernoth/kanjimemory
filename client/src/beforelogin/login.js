import { Component } from "react";
import axios from "../axios";
import { Link } from "react-router-dom";

export default class Login extends Component {
    constructor() {
        super();
        this.state = {
            error: false,
        };

        // this.handleChange = this.handleChange.bind(this);
    }

    handleChange(e) {
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
            .post("/login", this.state)
            .then(({ data }) => {
                console.log("data handleClick", data);

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
                        <Link to="/" style={{ textDecoration: "none" }}>
                            <p className="backButton">
                                Click to go to Registration
                            </p>
                        </Link>
                    </div>
                </div>
                <div className="bodyBox">
                    <div className="regLogBox">
                        <div className="mainHeaderDiv">
                            {" "}
                            <h1 className="mainHeader">Login</h1>
                        </div>

                        {this.state.error && (
                            <p className="error">
                                oops!!! something went wrong!!
                            </p>
                        )}
                        <div className="regInputFields">
                            <div className="input">
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
                            {/* <div className="button">
                                {" "}
                                <button onClick={() => this.handleClick()}>
                                    login
                                </button>
                            </div> */}
                            <div className="button">
                                {" "}
                                <button
                                    onClick={() => this.handleClick()}
                                    className="buttonPushable3"
                                >
                                    <span className="buttonFront3">Log In</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

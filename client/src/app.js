import { Component } from "react";
// Use the CSURF axios instance ;)
import axios from "./axios";

import { BrowserRouter, Link, Route } from "react-router-dom";

import Logo from "./components/logo";
import Landing from "./components/landing";
import DeckCreator from "./components/deckcreator";
import addCards from "./components/addcards";
import Memory from "./components/memory";

export class App extends Component {
    constructor(props) {
        super(props);

        // Initialize the state
        this.state = {
            user: {},
        };
    }

    // componentDidMount() {
    //     // 1. Fetch the user data when our App component mounts
    //     console.log("I am in componentDidMount");
    //     axios.get("/user").then((res) => {
    //         console.log("res in mount", res);
    //         this.setState({ user: res.data });
    //         // 2. Update the state when you get the the user's data
    //         // ...
    //     });
    // }
    logOut() {
        console.log("this function");
        axios.get("logout").then(() => {
            console.log("I am in logOut");
            // location.replace("/");
        });
    }
    // Method to update the profilePic state after upload. To be passed down to <Uploader />

    render() {
        return (
            <section>
                {" "}
                <BrowserRouter>
                    <div className="navBar">
                        <div className="navLogo">
                            <Logo />
                        </div>
                        <div className="navRow">
                            <Link to="/" style={{ textDecoration: "none" }}>
                                {" "}
                                <div className="navBarComponent">
                                    <p className="navBarTitles">Start</p>
                                    <img
                                        src="start-line.png"
                                        className="icon"
                                    ></img>
                                </div>
                            </Link>
                            <Link
                                to="/deckcreator"
                                style={{ textDecoration: "none" }}
                            >
                                <div className="navBarComponent">
                                    <p className="navBarTitles">Create Deck</p>
                                    <img src="book.png" className="icon"></img>
                                </div>
                            </Link>
                            <Link
                                to="/addcarts"
                                style={{ textDecoration: "none" }}
                            >
                                <div className="navBarComponent">
                                    <p className="navBarTitles">Add Cards</p>
                                    <img
                                        src="contract.png"
                                        className="icon"
                                    ></img>
                                </div>
                            </Link>
                            <Link
                                to="/memory"
                                style={{ textDecoration: "none" }}
                            >
                                <div className="navBarComponent">
                                    <p className="navBarTitles">Memory</p>
                                    <img
                                        src="memory.png"
                                        className="icon"
                                    ></img>
                                </div>
                            </Link>
                            <a
                                href="/welcome"
                                onClick={this.logOut}
                                className="navBarLogOut"
                            >
                                <div className="navBarComponent">
                                    <p className="navBarTitles">Log Out</p>
                                    <img src="exit.png" className="icon"></img>
                                </div>
                            </a>
                        </div>
                    </div>
                    <div></div>

                    <div>
                        <Route exact path="/" render={() => <Landing />} />
                        <Route
                            exact
                            path="/deckcreator"
                            component={DeckCreator}
                        />
                        <Route exact path="/addcarts" component={addCards} />
                        <Route exact path="/memory" component={Memory} />

                        {/* <Route path="/findusers" component={FindPeople} />
                        <Route path="/friends" component={Friends} />
                        <Route path="/chat" component={Chat} /> */}
                    </div>
                </BrowserRouter>
            </section>
        );
    }
}

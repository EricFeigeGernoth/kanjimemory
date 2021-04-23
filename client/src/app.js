import { Component } from "react";
// Use the CSURF axios instance ;)
import axios from "./axios";

import { BrowserRouter, Link, Route } from "react-router-dom";

// Those are from named exports, it will look differently if you have default exports ;)
// import Logo from "./components/logo";
// import ProfilePic from "./components/profile-pic.js";
// import { Uploader } from "./components/uploader.js";
// import Profile from "./components/profile.js";
// import OtherProfile from "./components/otherprofile";
// import FindPeople from "./components/findpeople";
// import Friends from "./components/friends";
// import Chat from "./components/chat";
import Landing from "./components/landing";
import DeckCreator from "./components/deckcreator";
import addCards from "./components/addcards";

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

    // Method to update the profilePic state after upload. To be passed down to <Uploader />

    render() {
        return (
            <section>
                {" "}
                <BrowserRouter>
                    <div className="navBar">
                        <Link to="/">
                            {" "}
                            <p>Landing</p>
                        </Link>
                        <Link to="/deckcreator">
                            {" "}
                            <p>Create Deck</p>
                        </Link>
                        <Link to="/addcarts">
                            {" "}
                            <p>Add Cards to your deck</p>
                        </Link>
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
                        {/* <Route path="/findusers" component={FindPeople} />
                        <Route path="/friends" component={Friends} />
                        <Route path="/chat" component={Chat} /> */}
                    </div>
                </BrowserRouter>
            </section>
        );
    }
}

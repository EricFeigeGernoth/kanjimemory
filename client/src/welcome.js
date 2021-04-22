import { HashRouter, Route } from "react-router-dom";
import Registration from "./beforelogin/registration";
import Login from "./beforelogin/login";
// import ResetPassword from "./resetpassword";
export default function Welcome() {
    return (
        <div id="welcome">
            <HashRouter>
                <div>
                    <Route exact path="/" component={Registration} />
                    <Route path="/login" component={Login} />
                    {/* <Route path="/resetpassword" component={ResetPassword} /> */}
                </div>
            </HashRouter>
        </div>
    );
}

// import ReactDOM from "react-dom";

import ReactDOM from "react-dom";

// import Registration from "./registration";
import Welcome from "./welcome";
import { App } from "./app";
import { init } from "./socket";
//Redux
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import { composeWithDevTools } from "redux-devtools-extension";

import reducer from "./reducer";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);
//Redux
let elem;
if (location.pathname === "/welcome") {
    elem = <Welcome />;
} else {
    elem = (
        // store={store}
        <Provider store={store}>
            <App />
        </Provider>
    );
}

// if (location.pathname === "/welcome") {
//     elem = <Welcome />;
// } else {
//     // init(store);
//     elem = (
//         // store={store}
//         <Provider>
//             <App />
//         </Provider>
//     );
// }

ReactDOM.render(elem, document.querySelector("main"));

// ReactDOM.render(<HelloWorld />, document.querySelector("main"));

// function HelloWorld() {
//     return <div>Hello, World!</div>;
// }

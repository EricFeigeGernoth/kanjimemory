import axios from "./axios";

export function profile() {
    console.log("I am sane");
    return axios
        .get("landingprofile")
        .then((result) => {
            console.log("result in Profile", result.data[0]);
            return {
                type: "LANDING_PROFILE",
                profile: result.data[0],
                // array we got back from the server
            };
        })
        .catch((err) => {
            console.log("data in Profile: ", err);
        });
}

export function getAllDecks() {
    console.log("I am sane");
    return axios
        .get("getDecks")
        .then((result) => {
            console.log("result in postNewDeck", result.data);
            return {
                type: "ALL_DECKS",
                decks: result.data,
                // array we got back from the server
            };
        })
        .catch((err) => {
            console.log("data in getAllDecks: ", err);
        });
}

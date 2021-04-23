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
        .get("getdecks")
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

export function getAllCards(deckid) {
    console.log("I am sane and getting Cards");
    console.log("deckid getAllcards", deckid);
    return axios
        .get(`getcards/${deckid}`)
        .then((result) => {
            console.log("result in getallcards", result.data);
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

export default function (state = {}, action) {
    if (action.type == "LANDING_PROFILE") {
        console.log("in reducer");
        state = {
            ...state,
            landingProfile: action.profile,
        };
    }
    if (action.type == "ALL_DECKS") {
        console.log("in reducer ALL DECKS");
        state = {
            ...state,
            allDecks: action.decks,
        };
    }
    if (action.type == "NEW_DECK") {
        console.log("in reducer NEW DECK");
        state = {
            ...state,
            allDecks: [...state.allDecks, action.newDeck],
        };
    }
    if (action.type == "ALL_CARDS") {
        console.log("in reducer ALL CARDS");
        state = {
            ...state,
            allCards: action.cards,
        };
    }
    return state;
}

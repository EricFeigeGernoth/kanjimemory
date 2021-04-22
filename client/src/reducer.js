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
    return state;
}

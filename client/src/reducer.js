export default function (state = {}, action) {
    if (action.type == "LANDING_PROFILE") {
        console.log("in reducer");
        state = {
            ...state,
            landingProfile: action.profile,
        };
    }
    return state;
}

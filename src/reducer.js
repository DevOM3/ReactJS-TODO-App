export const initialState = {
    user: null,
    mode: "dark",
}

const reducer = (state, action) => {
    switch (action.type) {
        case "SET_USER":
            return {
                ...state,
                user: action.user
            };
        case "SET_MODE":
            return {
                ...state,
                mode: action.mode
            };
        default:
            return state;
    }
}

export default reducer;

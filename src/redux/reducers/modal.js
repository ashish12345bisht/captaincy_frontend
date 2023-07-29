import { CHANGE_MODAL_STATE} from "../../constants/constants";

const initialState = {
    open: false
}

export default (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_MODAL_STATE:
            return { ...state, open: action.payload };
        default:
            return state;
    }
}
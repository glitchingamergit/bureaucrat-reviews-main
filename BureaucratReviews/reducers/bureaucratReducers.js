import { BUREAUCRAT_LIST_REQUEST, BUREAUCRAT_LIST_SUCCESS, BUREAUCRAT_LIST_FAIL, BUREAUCRAT_DETAILS_REQUEST, BUREAUCRAT_DETAILS_SUCCESS, BUREAUCRAT_DETAILS_FAIL } from '../constants/bureaucratConstants';

export const bureaucratListReducer = (state = { bureaucrats: [] }, action) => {
    switch (action.type) {
        case BUREAUCRAT_LIST_REQUEST:
            return { loading: true, bureaucrats: [] };
        case BUREAUCRAT_LIST_SUCCESS:
            return { loading: false, bureaucrats: action.payload };
        case BUREAUCRAT_LIST_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

export const bureaucratDetailsReducer = (state = { bureaucrat: {} }, action) => {
    switch (action.type) {
        case BUREAUCRAT_DETAILS_REQUEST:
            return { loading: true, ...state };
        case BUREAUCRAT_DETAILS_SUCCESS:
            return { loading: false, bureaucrat: action.payload };
        case BUREAUCRAT_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

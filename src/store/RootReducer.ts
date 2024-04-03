import { combineReducers } from 'redux';

const initialState = {
    email: '',
    password: '',
    language: 'com'
};

const reducer = (state = initialState, action: { payload: any, type: string }) => {
    switch (action.type) {
        case 'SET_EMAIL_PASSWORD':
            return { ...state, email: action.payload.email, password: action.payload.password };
        case 'SET_LANGUAGE':
            return { ...state, language: action.payload };
        case 'LOG_OUT':
            return { ...state, email: '', password: '' };
        default:
            return state;
    }
};

const RootReducer = combineReducers({
    loginDetails: reducer,
});

export default RootReducer;
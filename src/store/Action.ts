import { EmailPasswordActionPayload } from "../type/Movies.type";

export const storeEmailPassword = (payload: EmailPasswordActionPayload) => ({
    type: 'SET_EMAIL_PASSWORD',
    payload,
});


export const changeLanguage = (selectedLanguage: string) => ({
    type: 'SET_LANGUAGE',
    payload: selectedLanguage,
});

export const logOut = () => ({
    type: 'LOG_OUT',
});
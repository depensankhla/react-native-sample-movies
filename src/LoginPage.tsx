import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import translate from 'translate-google-api';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import { changeLanguage, storeEmailPassword } from './store/Action'
import { State } from './type/Movies.type';


export async function translateText(text: string) {
    try {
        const result = await translate(text, {
            tld: "com",
            to: "ar",
        });
        return result;
    } catch (error) {
        console.error('Error translating text:', error);
        return null;
    }
}

const labels = {
    email: 'Email',
    password: 'Password',
    login: "Login"
}

const LoginPage = () => {
    const selectedLanguage = useSelector((state: State) => state?.loginDetails?.language);

    const [loginLabels, setLoginLabels] = useState(labels);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    useEffect(() => {
        const translateLabels = async () => {
            try {
                const translatedEmail = translateText(labels.email);
                const translatedPassword = translateText(labels.password);
                const translatedLogin = translateText(labels.login);
                const translatedValues = await Promise.all([translatedEmail, translatedPassword, translatedLogin]);
                setLoginLabels({
                    email: translatedValues[0][0],
                    password: translatedValues[1][0],
                    login: translatedValues[2][0]
                });
            } catch (error) {
                console.error('Error translating labels:', error);
            }
        };
        if (selectedLanguage === 'com') {
            setLoginLabels(labels)
        } else {
            translateLabels();
        }
    }, [selectedLanguage])


    const dispatch = useDispatch();

    const validateEmail = (email: string) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password: string) => {
        const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z\d])(?=.*[@#$%^&+=])[A-Za-z\d@#$%^&+=]{8,15}$/;
        return passwordRegex.test(password);
    };


    const handleLogin = () => {
        if (validateEmail(email) && validatePassword(password)) {
            dispatch(storeEmailPassword({ email, password }));
        }
    };

    const changeLang = (lang: string) => {
        dispatch(changeLanguage(lang))
    }

    const isEnglishSelected = selectedLanguage === 'com';

    return (
        <View style={styles.container}>
            <View style={styles.loginContainer}>
                <TextInput
                    style={styles.input}
                    placeholder={loginLabels.email}
                    keyboardType="email-address"
                    autoCapitalize="none"
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    style={styles.input}
                    placeholder={loginLabels.password}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                <Button title={loginLabels.login} disabled={!validateEmail(email) || !validatePassword(password)} onPress={handleLogin} />
            </View>
            <View style={styles.langContainer}>
                <Button title="English" color={isEnglishSelected ? '#333' : '#ccc'} onPress={() => {
                    changeLang('com')
                }} />
                <View style={styles.languageArabic}>
                    <Button title="Arabic" color={!isEnglishSelected ? '#333' : '#ccc'} onPress={() => {
                        changeLang('ar')
                    }} />
                </View>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20,
    },
    loginContainer: {
        flex: 9,
        justifyContent: 'center',
        alignItems: 'center',
    },
    langContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },
    input: {
        width: 250,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 10,
        paddingHorizontal: 10,
    },
    languageArabic: {
        marginLeft: 10
    }
});

export default LoginPage;

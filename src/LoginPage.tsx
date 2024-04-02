import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { View, TextInput, Button, StyleSheet, Pressable, Text } from 'react-native';
import { changeLanguage, storeEmailPassword } from './store/Action'
import { useSelector } from 'react-redux';
import translate from 'translate-google-api';


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
    const [loginLabels, setLoginLabels] = useState(labels);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const selectedLanguage = useSelector(state => state?.loginDetails?.language);
    
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
        const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*()-_+=])(?=.*[0-9a-zA-Z]).{8,15}$/;
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
                <View style={{ marginLeft: 10 }}>
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
    loginButton: {
        backgroundColor: '#8903',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        elevation: 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonPressed: {
        backgroundColor: '#2980b9',
    },
    text: {
        color: 'white',
        fontSize: 16,
    },
});

export default LoginPage;

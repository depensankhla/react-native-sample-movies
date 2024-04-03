import React from 'react';
import { TouchableOpacity, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useSelector, useDispatch } from 'react-redux';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import { logOut } from './store/Action';
import { State } from './type/Movies.type';

const Stack = createNativeStackNavigator();
function Navigation() {
    const dispatch = useDispatch();
    const isSignedIn = useSelector((state: State) => state?.loginDetails?.email);
    return (
        <NavigationContainer>
            <Stack.Navigator>
                {isSignedIn ? (
                    <>
                        <Stack.Screen name="HomePage" component={HomePage}
                            options={{
                                title: 'Home',
                                headerTitleAlign: 'center',
                                headerRight: () => (
                                    <TouchableOpacity onPress={() => {
                                        dispatch(logOut());
                                    }}><Text style={{ marginRight: 10 }}>Log out</Text></TouchableOpacity>
                                ),
                            }}
                        />
                    </>
                ) : (
                    <>
                        <Stack.Screen name="LoginPage" component={LoginPage} options={{
                            headerShown: false,
                        }} />
                    </>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    );
}


export default Navigation
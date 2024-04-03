import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RootReducer from './RootReducer';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['loginDetails'],
};

const persistedReducer = persistReducer(persistConfig, RootReducer);

const store = configureStore({
    reducer: persistedReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: { ignoredActions: ["persist/PERSIST"] }, }),
});

const persistor = persistStore(store);

export { store, persistor };


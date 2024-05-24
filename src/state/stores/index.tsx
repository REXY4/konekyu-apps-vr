
'use client';
import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { thunk } from 'redux-thunk';
import reducers from '../reducers';
import AsyncStorage from '@react-native-async-storage/async-storage';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    // blacklist: ['setting'],
    whitelist: [
        'auth', 'locationMember'
    ],
};

const persistedReducer = persistReducer(persistConfig, reducers);
export let store = createStore(persistedReducer, applyMiddleware(thunk));
export type AppRootState = ReturnType<typeof store.getState>;
export let persistore = persistStore(store);

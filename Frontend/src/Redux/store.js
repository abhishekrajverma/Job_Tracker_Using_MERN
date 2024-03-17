import { configureStore, combineReducers } from "@reduxjs/toolkit";
import useReducer from "./user/userSlice.js";
import { persistReducer, persistStore } from "redux-persist"; // persistReducer is used to persist the redux store in the browser's local storage 
import storage from "redux-persist/lib/storage"; // storage is used to store the redux store in the browser's local storage 

const rootReducer = combineReducers({ user: useReducer });

const persistConfig = {
  key: "root",
  storage,
  version: 1,
};
const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store); // persistor is used to persist the redux store in the browser's local storage

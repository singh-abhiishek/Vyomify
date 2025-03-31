import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";
import authSlice from "./slice/authSlice.js"

const authPersistConfig = { key: "auth", storage };

const store =configureStore({
    reducer: {
        auth:  persistReducer(authPersistConfig, authSlice)
    },
    devTools: process.env.NODE_ENV !== "production"
})

export const persistor = persistStore(store);
export default store;
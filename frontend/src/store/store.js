import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"
import { persistReducer, persistStore } from "redux-persist";
import { apiSlice } from "./slices/apiSlice.js";
import authSlice from "./slices/authSlice.js"
import subscriptionSlice from "./slices/subscriptionSlice.js"

const authPersistConfig = { key: "auth", storage };
const subscriptionPersistConfig = { key: "subscription", storage };

const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth:  persistReducer(authPersistConfig, authSlice),
        subscription: persistReducer(subscriptionPersistConfig, subscriptionSlice),
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: getDefaultMiddleware => 
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
            },
        }).concat(apiSlice.middleware),
});

export const persistor = persistStore(store);
export default store;














// import { configureStore } from "@reduxjs/toolkit";
// import storage from "redux-persist/lib/storage"
// import { persistReducer, persistStore } from "redux-persist";
// import authSlice from "./slices/authSlice.js"

// const authPersistConfig = { key: "auth", storage };

// const store = configureStore({
//     reducer: {
//         auth:  persistReducer(authPersistConfig, authSlice),
//     },
//     devTools: process.env.NODE_ENV !== "production"
// })

// export const persistor = persistStore(store);
// export default store;
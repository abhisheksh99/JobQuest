import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Defaults to localStorage for web
import authReducer from "./slices/authSlice";
import jobReducer from "./slices/jobSlice";

// Configure Redux Persist
const persistConfig = {
  key: "root", // Key for localStorage,
  version:1,
  storage, // Storage method (localStorage)
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authReducer,
  job: jobReducer,
});

// Wrap reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Ignore non-serializable data for redux-persist
    }),
});

// Create persistor
export const persistor = persistStore(store);

export default store;

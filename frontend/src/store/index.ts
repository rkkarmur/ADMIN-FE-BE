import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { REDUCER_KEYS } from "@config/appConstants";
import { type TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

import { authReducer } from "./reducers/authReducer";
import { loadingReducer } from "./reducers/loaderReducer";
const rootReducer = combineReducers({
	[REDUCER_KEYS.AUTH]: authReducer,
	[REDUCER_KEYS.LOADER]: loadingReducer,
});

export const store = configureStore({
	reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

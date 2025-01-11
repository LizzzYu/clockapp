import { combineReducers, configureStore } from '@reduxjs/toolkit'
import appReducer from './appReducer'
import timezoneReducer from './timezoneSlice';
import authReducer from './authSlice';


// // https://redux.js.org/usage/usage-with-typescript#type-checking-middleware
export const rootReducer = combineReducers({
	app: appReducer,
	timezones: timezoneReducer,
	auth: authReducer
})

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefault) => getDefault().concat(
		// custom middleware goes here
	),
})

export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;

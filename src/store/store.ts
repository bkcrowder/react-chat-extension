import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { FLUSH, PAUSE, PERSIST, REGISTER, REHYDRATE, PURGE, persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'
import tipSlice from '../components/features/tips/tip.slice';
import goalSlice from '../components/features/goals/goals.slice';

const persistConfig = {
    key: 'root',
    storage
}

// Singular combine for now in order to still segment any additional slice storage we might want later
const combined = combineReducers({
    tip: tipSlice.reducer,
    goal: goalSlice.reducer
})

// Ignore serialization checks for redux-persist actions
const store = configureStore({
    reducer: persistReducer(persistConfig, combined),
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
        }
    })
})

export const persistor = persistStore(store)

// Typescript workaround for permitting state references and dispatch actions for the store
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export default store
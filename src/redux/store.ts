import { configureStore, ThunkAction, Action, getDefaultMiddleware } from '@reduxjs/toolkit'
import { combineReducers } from "redux"
import { persistReducer, persistStore } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import profileReducer from '../features/profile/ProfileSlice'
import transactionReducer from '../features/transaction/TransactionSlice'
import reportsReducer from '../features/reports/ReportsSlice'
import categoryReducer from '../features/category/CategorySlice'

const persistConfig = {
  key: 'root',
  storage,
}

export const rootReducer = combineReducers({
  profile: profileReducer,
  transaction: transactionReducer,
  reports: reportsReducer,
  category: categoryReducer
})

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: getDefaultMiddleware({
    serializableCheck: false,
    immutableCheck: false,
  })
})

export const persistor = persistStore(store)

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>

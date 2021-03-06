import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import moment from 'moment';

export const TransactionSlice = createSlice({
  name: 'transaction',
  initialState: {
    date: moment().startOf('month').toDate(),
    list: [],
  },
  reducers: {
    setCurrentDate: (state, action: PayloadAction<Date>) => {
      state.date = action.payload
    },
    setTransactionList: (state, action: PayloadAction<any>) => {
      state.list = action.payload
    },
    clearTransactionList: (state) => {
      state.list = []
    }
  }
})

// actions
export const { setCurrentDate, setTransactionList, clearTransactionList } = TransactionSlice.actions

// selectors
export const getCurrentDate = state => state.transaction.date
export const getTransactionList = state => state.transaction.list

// reducers
export default TransactionSlice.reducer
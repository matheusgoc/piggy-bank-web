import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ReportModel } from '../../models/ReportModel'

export const ReportsSlice = createSlice({
  name: 'report',
  initialState: {
    general: new ReportModel(),
    monthly: new ReportModel(),
  },
  reducers: {
    setGeneralReport: (state, action: PayloadAction<ReportModel>) => {
      state.general = action.payload
    },
    setMonthlyReport: (state, action: PayloadAction<ReportModel>) => {
      state.monthly = action.payload
    },
    clearReports: (state) => {
      state.general = new ReportModel()
      state.monthly = new ReportModel()
    }
  },
})

//actions
export const { setGeneralReport, setMonthlyReport, clearReports } = ReportsSlice.actions

//selectors
export const getGeneralReport = state => state.reports.general
export const getMonthlyReport = state => state.reports.monthly

//reducers
export default ReportsSlice.reducer

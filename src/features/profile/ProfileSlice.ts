import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileModel } from '../../models/ProfileModel'

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    data:  new ProfileModel(),
    logged: false,
  },
  reducers: {
    setLogged: (state, action:PayloadAction<boolean>) => {
      state.logged = action.payload
    },
    setProfile: (state, action) => {
      state.data = action.payload
    },
    clearProfile: (state) => {
      state.logged = false
      state.data = new ProfileModel()
    }
  },
})

// actions
export const { setProfile, setLogged, clearProfile } = ProfileSlice.actions

// selectors
export const getProfile = state => state.profile.data
export const isLogged = state => state.profile.logged

// reducers
export default ProfileSlice.reducer

import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ProfileModel } from '../../models/ProfileModel'

export const ProfileSlice = createSlice({
  name: 'profile',
  initialState: {
    data:  new ProfileModel(),
    token: '',
  },
  reducers: {
    setToken: (state, action:PayloadAction<string>) => {
      state.token = action.payload
    },
    setProfile: (state, action) => {
      state.data = action.payload
    },
    clearProfile: (state) => {
      state.token = ''
      state.data = new ProfileModel()
    }
  },
})

// actions
export const { setProfile, setToken, clearProfile } = ProfileSlice.actions

// selectors
export const getProfile = state => state.profile.data
export const getToken = state => state.profile.token

// reducers
export default ProfileSlice.reducer

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  RegisterData: {},
  UserData: {},
  authLoading: true,
  isOpen: false,
  isData: null,
  isLoader: false,
  logOutModal: false
};

const reducerSlicer = createSlice({
  name: 'reducerSlicer',
  initialState,
  reducers: {
    setRegisterData: (state, action) => {
      state.RegisterData = action?.payload
    },
    setAuthLoader: (state, action) => {
      state.authLoading = action?.payload
    },
    setIsModal: (state, action) => {
      state.isOpen = action?.payload?.isOpen
      state.isData = action?.payload?.data
    },
    setIsLoader: (state, action) => {
      state.isLoader = action?.payload
    },
    setLogOutModal: (state, action) => {
      state.logOutModal = action?.payload
    },
    setUserData: (state, action) => {
      state.UserData = action?.payload
    },
    setResetAllSates: (state, action) => {
      state.RegisterData = {}
      state.authLoading = true
      state.isOpen = false
      state.isData = null
      state.isLoader = false
      state.logOutModal = false
    },

  },

});

export const { setRegisterData, setAuthLoader, setUserData, setIsModal, setIsLoader, setLogOutModal, setResetAllSates } = reducerSlicer.actions;
export default reducerSlicer.reducer;

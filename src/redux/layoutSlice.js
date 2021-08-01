import {
  createSlice,
} from "@reduxjs/toolkit";
import {
  STATUS_INFO
} from '../constants/layout';


const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    isToasterShow: false,
    toasterMessage: null,
    toasterStatus: STATUS_INFO,
    isLoading: false,
    loadingMessage: null,
    alertContinue: false,
    alertData: null,
    isAlertOpen: false,
    alertMessage: null,
    alertTitle: null,
  },

  reducers: {
    cancelAlert: (state) => {
      state.alertData = null;
      state.alertMessage = null;
      state.alertTitle = null;
      state.alertContinue = false;
      state.isAlertOpen = false;
  },
    continueAlert: (state) => {
      state.alertContinue = true;
      state.isAlertOpen = false;
    },
    showAlert: (state, action) => {
      state.alertData = action.payload?.alertData;
      state.alertMessage = action.payload?.message;
      state.alertTitle = action.payload?.title;
      state.isAlertOpen = true;
  },
    hideLoader: (state) => {
      state.isLoading = false;
      state.loadingMessage = null;
  },
    showLoader: (state, action) => {
      state.isLoading = true;
      state.loadingMessage = action.payload?.message;
  },
    hideToaster: (state) => {
      state.isToasterShow = false;
  },
    showToaster: (state, action) => {
      state.isToasterShow = true;
      state.toasterMessage = action.payload?.message;
      state.toasterStatus = action.payload?.status;
  },

  },
})


export const {
  cancelAlert,
  continueAlert,
  showAlert,
  hideLoader,
  showLoader,
  hideToaster,
  showToaster,
} = layoutSlice.actions

export const layoutState = (state) => state.layout;

export default layoutSlice.reducer;
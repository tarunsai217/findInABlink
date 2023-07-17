import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  googleResponse: null,
  profileData: null,
};

const userSlice = createSlice({
  name: "counter",
  initialState,
  reducers: {
    setGoogleResponse: (state, action) => {
      state.googleResponse = action.payload;
    },
    setProfileData: (state, action) => {
      state.profileData = action.payload;
    },
  },
});

export const { setGoogleResponse, setProfileData } = userSlice.actions;
export default userSlice.reducer;

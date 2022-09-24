import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authAPI from "./authAPI";

const { registerUser, loginUser, logoutUser } = authAPI;

const initialState = {
  userInfo: {},
  userToken: null,
  status: "idle",
  message: "",
};

export const register = createAsyncThunk(
  "auth/register",
  async (userInfo, thunkAPI) => {
    try {
      return await registerUser(userInfo);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.details) {
        return thunkAPI.rejectWithValue(err.response.data.details);
      } else {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      return await loginUser(userInfo);
    } catch (err) {
      if (err.response && err.response.data && err.response.data.details) {
        return thunkAPI.rejectWithValue(err.response.data.details);
      } else {
        return thunkAPI.rejectWithValue(err.message);
      }
    }
  }
);

export const logout = createAsyncThunk(
  "auth/logout",
  async () => await logoutUser()
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.status = "idle";
      state.message = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("Payload from register fulfilled: ", action.payload);
        state.status = "succeeded";
        state.userInfo = action.payload.user;
        state.userToken = action.payload.accessToken;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        console.log("Payload from register rejected: ", action.payload);
        state.status = "failed";
        state.userInfo = {};
        state.userToken = null;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("Payload from login fulfilled: ", action.payload);
        state.status = "succeeded";
        state.userInfo = action.payload.user;
        state.userToken = action.payload.accessToken;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("Payload from login rejected: ", action.payload);
        state.status = "failed";
        state.userInfo = {};
        state.userToken = null;
        state.message = action.payload;
      })
      .addCase(logout.fulfilled, (state) => {
        state.userInfo = {};
        state.userToken = null;
      });
  },
});

export const { clearState } = authSlice.actions;
export default authSlice.reducer;

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import handleThunkError from "../../utils/handleThunkError";
import { clearJobState } from "../jobs/jobSlice";
import { clearUserState } from "../user/userSlice";
import authAPI from "./authAPI";

const { registerUser, loginUser, refreshAccessToken, logoutUser } = authAPI;

const initialState = {
  userId: null,
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
      return handleThunkError(err, thunkAPI);
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (userInfo, thunkAPI) => {
    try {
      return await loginUser(userInfo);
    } catch (err) {
      return handleThunkError(err, thunkAPI);
    }
  }
);

export const refresh = createAsyncThunk("auth/refresh", async (_, thunkAPI) => {
  try {
    return await refreshAccessToken();
  } catch (err) {
    console.log(err);
    if (err.response && err.response.data && err.response.data.details) {
      toast.error(err.response.data.details);
      thunkAPI.dispatch(logout());

      return thunkAPI.rejectWithValue(err.response.data.details);
    } else {
      toast.error(err.message);
      return thunkAPI.rejectWithValue(err.message);
    }
  }
});

export const logout = createAsyncThunk("auth/logout", async (_, thunkAPI) => {
  try {
    const res = await logoutUser();
    console.log(res);
    if (res.status === 200) {
      toast.success(res.data.message);
      thunkAPI.dispatch(clearAuthState());
      thunkAPI.dispatch(clearJobState());
      thunkAPI.dispatch(clearUserState());
      return res.data;
    }
  } catch (err) {
    console.log(err);
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    clearState: (state) => {
      state.status = "idle";
      state.message = "";
    },
    clearAuthState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.status = "loading";
      })
      .addCase(register.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userId = action.payload.id;
        state.userToken = action.payload.accessToken;
        state.message = action.payload.message;
      })
      .addCase(register.rejected, (state, action) => {
        state.status = "failed";
        state.userId = null;
        state.userToken = null;
        state.message = action.payload;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userId = action.payload.id;
        state.userToken = action.payload.accessToken;
        state.message = action.payload.message;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.userId = null;
        state.userToken = null;
        state.message = action.payload;
      })
      .addCase(refresh.pending, (state) => {
        state.status = "loading";
      })
      .addCase(refresh.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.userToken = action?.payload?.accessToken;
        state.message = action?.payload?.message;
      })
      .addCase(refresh.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state, action) => {
        console.log(action);
        state.status = "succeeded";
        state.message = action.payload;
        state.userId = null;
        state.userToken = null;
      });
  },
});

export const { clearState, clearAuthState } = authSlice.actions;
export default authSlice.reducer;

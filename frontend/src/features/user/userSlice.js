import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import handleThunkError from "../../utils/handleThunkError";
import userAPI from "./userAPI";

const { getAllUsers, getAUser, updateAUser, deleteAUser } = userAPI;

const initialState = {
  users: [],
  loggedInUser: {},
  status: "idle",
  message: "",
};

export const getUsers = createAsyncThunk("user/getAll", async (_, thunkAPI) => {
  try {
    return await getAllUsers();
  } catch (err) {
    return handleThunkError(err, thunkAPI);
  }
});

export const getUser = createAsyncThunk(
  "user/getOne",
  async (userId, thunkAPI) => {
    try {
      return await getAUser(userId);
    } catch (err) {
      return handleThunkError(err, thunkAPI);
    }
  }
);

export const updateUser = createAsyncThunk(
  "user/update",
  async ({ userId, updatedData }, thunkAPI) => {
    try {
      return await updateAUser(userId, updatedData);
    } catch (err) {
      return handleThunkError(err, thunkAPI);
    }
  }
);

export const deleteUser = createAsyncThunk(
  "user/delete",
  async (userId, thunkAPI) => {
    try {
      return await deleteAUser(userId);
    } catch (err) {
      return handleThunkError(err, thunkAPI);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    clearState: (state) => {
      state.status = "idle";
      state.message = "";
    },
    clearUserState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload;
        state.message = action.payload.message || "";
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = "failed";
        state.users = [];
        state.message = action.payload;
      })
      .addCase(getUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.loggedInUser = action.payload;
        state.message = action.payload.message || "";
      })
      .addCase(getUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedUser = state.users.filter(
          (user) => user._id !== action.payload.updatedUser._id
        );
        state.users = [...updatedUser, action.payload.updatedUser];
        state.loggedInUser = action.payload.updatedUser;
        state.message = action.payload.message || "";
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = state.users.filter(
          (user) => user._id !== action.payload.id
        );
        state.message = action.payload.message || "";
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const { clearState, clearUserState } = userSlice.actions;
export default userSlice.reducer;

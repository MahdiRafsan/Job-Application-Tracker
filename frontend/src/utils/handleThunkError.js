import { toast } from "react-toastify";

const handleThunkError = (err, thunkAPI) => {
  if (
    err.response.status === 401 &&
    err.response.data.details.startsWith("jwt ")
  ) {
    return thunkAPI.rejectWithValue("");
  } else if (err.response && err.response.data && err.response.data.details) {
    if (typeof err.response.data.details === "object") {
      for (let [_, value] of Object.entries(err.response.data.details)) {
        toast.error(value);
      }
    } else {
      toast.error(err.response.data.details);
    }
    return thunkAPI.rejectWithValue(err.response.data.details);
  } else {
    return thunkAPI.rejectWithValue(err.message);
  }
};

export default handleThunkError;

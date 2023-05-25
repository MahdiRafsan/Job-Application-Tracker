import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import handleThunkError from "../../utils/handleThunkError";
import jobAPI from "./jobAPI";

const { getAllJobs, getAJob, createAJob, updateAJob, deleteAJob, getJobStats } =
  jobAPI;

const filterState = {
  searchTerm: "",
  applicationStatus: "",
  jobType: "",
  sortBy: "",
};

const stats = {
  upcomingInterviews: [],
  jobTypesData: {},
  statusData: {},
  dataByMonth: {},
  dataByYear: {},
  recentData: {},
};

const initialState = {
  totalJobs: 0,
  currentPage: 1,
  totalPages: 1,
  limit: 15,
  jobs: [],
  selectedJob: {},
  status: "idle",
  message: "",
  ...filterState,
  ...stats,
};

export const getJobs = createAsyncThunk("job/getJobs", async (_, thunkAPI) => {
  try {
    const {
      currentPage,
      limit,
      searchTerm,
      applicationStatus,
      jobType,
      sortBy,
    } = thunkAPI.getState().job;
    const queryString = `page=${currentPage}&limit=${limit}&searchTerm=${searchTerm}&applicationStatus=${applicationStatus}&jobType=${jobType}&sortBy=${sortBy}`;
    return await getAllJobs(queryString);
  } catch (err) {
    return handleThunkError(err, thunkAPI);
  }
});

export const getJob = createAsyncThunk(
  "job/getJob",
  async (jobId, thunkAPI) => {
    try {
      return await getAJob(jobId);
    } catch (err) {
      return handleThunkError(err, thunkAPI);
    }
  }
);

export const createJob = createAsyncThunk(
  "job/createJob",
  async (jobData, thunkAPI) => {
    try {
      return await createAJob(jobData);
    } catch (err) {
      console.log(err);

      return handleThunkError(err, thunkAPI);
    }
  }
);

export const updateJob = createAsyncThunk(
  "job/updateJob",
  async ({ jobId, updatedData }, thunkAPI) => {
    try {
      return await updateAJob(jobId, updatedData);
    } catch (err) {
      return handleThunkError(err, thunkAPI);
    }
  }
);

export const deleteJob = createAsyncThunk(
  "job/deleteJob",
  async (jobId, thunkAPI) => {
    try {
      return await deleteAJob(jobId);
    } catch (err) {
      return handleThunkError(err, thunkAPI);
    }
  }
);

export const getStats = createAsyncThunk("jobs/stats", async (_, thunkAPI) => {
  try {
    return await getJobStats();
  } catch (err) {
    return handleThunkError(err, thunkAPI);
  }
});

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    clearState: (state) => {
      state.status = "idle";
      state.message = "";
    },
    changeCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setLimitPerPage: (state, action) => {
      state.currentPage = 1;
      state.limit = action.payload;
    },
    setFilters: (state, action) => {
      const { name, value } = action.payload;
      state.currentPage = 1;
      state[name] = value;
    },
    clearFilters: (state) => {
      return { ...state, ...filterState, limit: 15 };
    },
    clearJobState: (state) => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getJobs.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getJobs.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.totalJobs = action.payload.totalJobs;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
        state.jobs = action.payload.jobs;
        state.message = action.payload.message;
      })
      .addCase(getJobs.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getJob.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedJob = action.payload;
        state.message = action.payload.message || "";
      })
      .addCase(getJob.rejected, (state, action) => {
        state.status = "failed";
        state.selectedJob = {};
        state.message = action.payload;
      })
      .addCase(createJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createJob.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs.push(action.payload);
        state.message = action.payload.message;
      })
      .addCase(createJob.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(updateJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(updateJob.fulfilled, (state, action) => {
        state.status = "succeeded";
        const updatedJob = state.jobs.filter(
          (job) => job._id !== action.payload.updatedJob._id
        );
        state.jobs = [...updatedJob, action.payload.updatedJob];
        state.message = action.payload.message;
      })
      .addCase(updateJob.rejected, (state, action) => {
        state.status = "failed";
        state.jobs = [];
        state.message = action.payload;
      })
      .addCase(deleteJob.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteJob.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.jobs = state.jobs.filter((job) => job._id !== action.payload.id);
        state.message = action.payload.message;
      })
      .addCase(deleteJob.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      })
      .addCase(getStats.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getStats.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.upcomingInterviews = action.payload.upcomingInterviews;
        state.jobTypesData = action.payload.jobTypesData;
        // state.jobTypesLastQuarter = action.payload.jobTypesLastQuarter;
        state.statusData = action.payload.statusData;
        state.dataByMonth = action.payload.dataByMonth;
        state.dataByYear = action.payload.dataByYear;
        state.recentData = action.payload.recentData;
      })
      .addCase(getStats.rejected, (state, action) => {
        state.status = "failed";
        state.message = action.payload;
      });
  },
});

export const selectJobById = (state, jobId) =>
  state.job.jobs.find((job) => job._id === jobId) || state.job.selectedJob;

export const {
  clearState,
  changeCurrentPage,
  setLimitPerPage,
  setFilters,
  clearFilters,
  clearJobState,
} = jobSlice.actions;
export default jobSlice.reducer;

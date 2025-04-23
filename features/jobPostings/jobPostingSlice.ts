import { JobPosting } from "@/lib/services/jobPostingsService";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface JobsState {
  jobs: JobPosting[];
  loading: boolean;
  error: string | null;
}

const initialState: JobsState = {
  jobs: [],
  loading: false,
  error: null,
};

const jobPostingsSlice = createSlice({
  name: "jobPostings",
  initialState,
  reducers: {
    setJobPostings: (state, action: PayloadAction<JobPosting[]>) => {
      state.jobs = action.payload;
    },
    addJobPosting: (state, action: PayloadAction<JobPosting>) => {
      state.jobs.push(action.payload);
    },
    removeJobPosting: (state, action: PayloadAction<string>) => {
      state.jobs = state.jobs.filter(job => job.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setJobPostings, addJobPosting, removeJobPosting, setLoading, setError } = jobPostingsSlice.actions;
export default jobPostingsSlice.reducer;

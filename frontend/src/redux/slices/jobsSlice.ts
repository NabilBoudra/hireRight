import { Job } from '@/utils/types'
import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'

export interface jobsState {
  value: Job[],
}

const initialState: jobsState = {
  value: [],
}

export const jobsSlice = createSlice({
  name: 'jobs',
  initialState,
  reducers: {
    setJobs: (state, action: PayloadAction<Job[]>) => {
        return { value: action.payload };
    },
    updateJob: (state, action: PayloadAction<Job>) => { 
        return {value: state.value.map(job => { 
           if(job.id === action.payload.id) return action.payload; 
           return job;
        })}
    }, 
  },
})

export const { setJobs, updateJob } = jobsSlice.actions
export default jobsSlice.reducer
import { createSlice } from '@reduxjs/toolkit'
import { fetchJobs } from './actionCreator'

const jobDataSlice = createSlice({
    name: 'jobs',
    initialState: {
        data: [],
        jobList: [],
        totalCount: 0,
        status: 'idle',
        error: null,
        isLoading:false
    },
    reducers: {
        jobAdded:()=>{
            
        }
    },
    extraReducers(builder) {
        builder
            .addCase(fetchJobs.pending, (state, action) => {
                state.status = 'loading'
                state.isLoading = true
            })
            .addCase(fetchJobs.fulfilled, (state, action) => {
                state.status = 'succeeded'
                state.data = action.payload
                state.jobList = state.jobList.concat(action.payload?.jdList)
                state.totalCount = action.payload.totalCount
                state.isLoading = false

            })
            .addCase(fetchJobs.rejected, (state, action) => {
                state.status = 'failed'
                state.error = action.error.message
                state.isLoading = false
            })
    }
})

export const { jobAdded } = jobDataSlice.actions
export default jobDataSlice.reducer
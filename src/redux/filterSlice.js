import { createSlice } from '@reduxjs/toolkit'

const filterDataSlice = createSlice({
    name: 'filters',
    initialState: {
        location: [],
        roles: [],
        search:""
    },
    reducers: {
        updateLocation:(state,action)=>{
            state.location = action.payload
        },
        updateRoles:(state,action)=>{
            state.roles = action.payload
        },
        updateSearch:(state,action)=>{
            state.search = action.payload
        }

    }
})

export const {  updateLocation ,updateRoles,updateSearch} = filterDataSlice.actions
export default filterDataSlice.reducer
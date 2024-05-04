import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
export const fetchJobs = createAsyncThunk('jobs/fetchJobs', (payload) => new Promise((resolve, reject) => {
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/adhoc/getSampleJdJSON`, payload, {
        headers: {
            "Content-Type": "application/json"
        }
    }).then(response => {
        setTimeout(()=>{
            resolve(response?.data)
        },500)
    }).catch(err => {
        axios.isCancel(err)
        console.error(err)
        reject(err)
    })
}))
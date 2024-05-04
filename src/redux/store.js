import { configureStore} from '@reduxjs/toolkit'
//import logger from 'redux-logger';
import jobsSlice from './jobsSlice';
import filterSlice from './filterSlice';
export const configStore = configureStore({
  reducer: {
    jobs:jobsSlice,
    filters:filterSlice
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware()
})
import { configureStore } from '@reduxjs/toolkit';
import ProjectReducer from '../feature/project/ProjectSlice';

export const store = configureStore({
    reducer: {
        projects : ProjectReducer
    }
})


import { configureStore } from "@reduxjs/toolkit";
import billReducer from './slices/billStore'

const store = configureStore({
    reducer: {
        bill: billReducer    
    }
})

export default store


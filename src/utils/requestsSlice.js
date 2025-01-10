import { createSlice } from "@reduxjs/toolkit";


const requestsSlice = createSlice({
    name : 'requests',
    initialState: null,
    reducers:{
        addRequests : (state, action)=>
        {
            return action.payload;
        },
        removeRequests : (state, action) => {
            const newRequests = state.filter((req) => req._id !== action.payload);
            return newRequests;
        }
    }
})


export const {addRequests, removeRequests} = requestsSlice.actions;

export default requestsSlice.reducer;
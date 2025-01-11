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
            const index = state.findIndex((req) => req._id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        }
    }
})


export const {addRequests, removeRequests} = requestsSlice.actions;

export default requestsSlice.reducer;
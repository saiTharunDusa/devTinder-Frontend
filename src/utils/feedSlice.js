import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
    name : 'feed',
    initialState : null,
    reducers:{
        addFeed : (state, action)=>{
            return action.payload;
        },
        removeUserFromFeed:(state, action)=>{
            const index = state.findIndex((user) => user._id === action.payload);
            if(index !== -1)
            {
                state.splice(index, 1);
            }
            
        }
    }
})

export const {addFeed, removeUserFromFeed} = feedSlice.actions;

export default feedSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    subscribedChannelsList: [],
}


const subscriptionSlice = createSlice({
    name: "subscription",
    initialState,
    reducers: {
        addSubscribedChannels: (state, action) => {
            state.subscribedChannelsList = action.payload
        }
    },
})

export const { addSubscribedChannels, } = subscriptionSlice.actions
export default subscriptionSlice.reducer
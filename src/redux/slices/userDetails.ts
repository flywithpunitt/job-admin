import { createSlice } from "@reduxjs/toolkit"

const userDetailsSlice: any = createSlice({
    name: 'userDetails',
    initialState: {
        details: []
    },
    reducers: {
        updateUserDetails(state: any, payload: any) {
            state.details = payload?.payload.details
        },

    }
})
export default userDetailsSlice.reducer;
export const { updateUserDetails } = userDetailsSlice.actions
import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export type CounterState = {
    value: number,
}

const initialState: CounterState = {
    value: 0
}

const counterSlice = createSlice({
    name: 'counter',
    initialState,
    reducers: {
        increment(state) {
            state.value++;
        },
        decrement(state) {
            state.value--;
        },
        amountAdded(state, payload: PayloadAction<number>) {
            state.value += payload.payload;
        }
    }
});

export const { increment, decrement, amountAdded } = counterSlice.actions;

export default counterSlice.reducer;
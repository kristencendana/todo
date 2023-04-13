import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
    items: [],
    loading: false,
    error: null,
    sortBy: 'old'
}

export const getAllData = createAsyncThunk('tasks', async () => {
    const response = await fetch('https://6435c18a537112453fdede44.mockapi.io/tasks');
    const result = response.json();
    return result;
})

export const taskSlice = createSlice({
    name: "task",
    initialState,
    reducers: {
        ADD_TASK: (state, action) => {
            const tasks = [...state.items, action.payload];
            return { ...state, items: [...tasks]}
        },
        EDIT_TASK(state, action) {
            const tasks = state.items.map(task => {
                if (task.id === action.payload.id) {
                    task = action.payload;
                }
                return task;
            })
            return { ...state, items: [...tasks]}
        },
        DELETE_TASK(state, action) {
            const tasks = state.items.filter(task => 
                task.id !== action.payload.id);
            return {...state, items: [...tasks]};
        },
        UPDATE_SORT(state, action) {
            return {...state, sortBy: action.payload}
        }
    },
    extraReducers: {
        [getAllData.pending] : (state) => {
            state.loading = true;
        },
        [getAllData.fulfilled] : (state, action) => {
            state.loading = false;
            state.items = action.payload;
        },
        [getAllData.rejected] : (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
    }
})

export const {ADD_TASK, EDIT_TASK, DELETE_TASK, UPDATE_SORT} = taskSlice.actions

export default taskSlice.reducer;
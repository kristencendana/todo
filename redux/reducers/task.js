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

export const getTime = (input, toDoObject) => {
    const time = Date.now();
    const today = new Date(time);
    if (toDoObject){
        return {
            ...toDoObject,
            title: input.title,
            description: input.description,
            lastUpdated: today.toISOString()
        }
    } else {
        return {
            title: input.title,
            status: input.status,
            description: input.description,
            createdAt: today.toISOString(),
            lastUpdated: today.toISOString()
        }
    }
}

export const getISODate = (ISOString) => {
    const newDate = new Date(ISOString);
      let date = String(newDate);
      let day = date.slice(0,15);
      let time = date.slice(15,21).split(':');
      let hours = Number(time[0]) > 12 ? Number(time[0])%12 : Number(time[0]);
      
      let minutes = Number(time[1]);
      let newTime = hours + ':' + minutes;
      return [day, newTime];
    }

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
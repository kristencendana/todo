import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./reducers/task";
export default configureStore({
    reducer: {
        task: taskSlice
    }
})
import { updateFetch } from "./fetch";
import { getTime } from "./time";

export const handleCheckbox = (task, dispatch) => {

    let newTask = Object.assign({}, task)
    if (newTask.status === true) {
        newTask.status = false;
    } else {
        newTask.status = true;
    }

    const updatedObj = getTime(newTask, newTask);
    updateFetch(updatedObj, dispatch)
}
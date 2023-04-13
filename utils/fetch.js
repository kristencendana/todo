import { DELETE_TASK, EDIT_TASK } from "@/redux/reducers/task";

export const deleteFetch = (task, dispatch, route = false, router=false) => {
    fetch(`https://6435c18a537112453fdede44.mockapi.io/tasks/${task.id}`, {
        method: 'DELETE',
        headers: {'content-type':'application/json'},
    }).then(res => {
        if (res.ok) {
            return res.json();
        }
    }).then(task => {
        if (route) {
            router.push({
                pathname: `/`
            })
        } else {
            dispatch(DELETE_TASK(task))
        }
    }).catch(error => {
        console.log('Error in delete fetch', error)
    })
}

export const updateFetch = (editedTask, dispatch) => {
    fetch(`https://6435c18a537112453fdede44.mockapi.io/tasks/${editedTask.id}`, {
      method: 'PUT',
      headers: {'content-type':'application/json'},
      body: JSON.stringify(editedTask)
    }).then(res => {
      if (res.ok) {
          return res.json();
      }
    }).then(task => {
      dispatch(EDIT_TASK(task))
    }).catch(error => {
      console.log('Error in post fetch', error)
    })
}
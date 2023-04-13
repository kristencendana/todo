import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { getTime } from '@/utils/time';
import { useForm } from "react-hook-form";
import { Checkbox } from '@mui/material';
import { useRouter } from 'next/router';
import { FormControlLabel } from '@mui/material';
import { updateFetch } from '@/utils/fetch';
import { handleCheckbox } from '@/utils/checkbox';
import { Button } from '@mui/material';

function EditPage() {
  
  const dispatch = useDispatch();
  const data = useSelector((state) => state.task)
  const router = useRouter()
  const { pid } = router.query
  const toDoObject = data.items.filter((task) => {
    if (task.id === pid) return true;
    return false;
  })[0];

  const { register, handleSubmit, formState: { errors } } = useForm({});

  const onSubmit = input => {
    const newObj = data.items.filter((task) => {
      if (task.id === pid) return true;
      return false;
    })[0];

    const editedTask = getTime(input, newObj);
    updateFetch(editedTask, dispatch);
    router.push({
      pathname: `/`
    })
  }

  return (
    <div className="bg-white h-screen p-8 text-center">
      <form className="bg-[#efc9af] p-5 space-y-4 "onSubmit={handleSubmit(onSubmit)}>
        <div>
          <h1>New Task Name</h1>
          <input className="w-[300px]"defaultValue={toDoObject.title} {...register("title", { required: true })} />
          {errors.title && <span>This field is required</span>}
        </div>
        <div>
          <h1>New Task Description</h1>
          <textarea className="h-[150px] w-[300px]" defaultValue={toDoObject.description} {...register("description", { required: true })} />
          {errors.description && <span>This field is required</span>}
        </div>
        <FormControlLabel control={<Checkbox checked={toDoObject.status} style ={{color: "#1f8ac0"}} onChange={() => handleCheckbox(toDoObject, dispatch)} />} label="Completed" />
        <Button type="submit" variant="contained" color="success">
          Update
        </Button>
      </form>
    </div>
  )
}

export default EditPage
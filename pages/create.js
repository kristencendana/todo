import React from 'react'
import { useDispatch } from 'react-redux';
import { ADD_TASK } from '@/redux/reducers/task';
import { useForm, Controller } from "react-hook-form";
import { Checkbox } from '@mui/material';
import { useRouter } from 'next/router';
import { getTime } from '@/utils/time';
import { Button } from '@mui/material';

export default function CreatePage() {

  const dispatch = useDispatch();
  const router = useRouter();

  const { register, handleSubmit, control, formState: { errors } } = useForm({});

  const onSubmit = input => {
    const editedTask = getTime(input);

    fetch('https://6435c18a537112453fdede44.mockapi.io/tasks', {
      method: 'POST',
      headers: {'content-type':'application/json'},
      body: JSON.stringify(editedTask)
    }).then(res => {
      if (res.ok) {
          return res.json();
      }
    }).then(task => {
      dispatch(ADD_TASK(task))
        router.push({
          pathname: `/`
        })
    }).catch(error => {
      console.log('Error in post fetch', error)
    })
  }

  return (
    <div className="bg-white p-8 h-screen">
      <form className="flex flex-col justify-center p-8 items-center bg-[#efc9af]" onSubmit={handleSubmit(onSubmit)}>
        <h1>Create New Task</h1>
        <div className="flex flex-col space-y-2">
          <input className="w-[300px] borderColor-black"placeholder="Task Name" {...register("title", { required: true })} />
          {errors.title && <span>This field is required</span>}
          <textarea className="h-[150px] w-[300px]"placeholder="Description" {...register("description", { required: true })} />
          {errors.description && <span>This field is required</span>}
        </div>
        <div className="flex flex-col text-center justify-center items-center">
          <div className="flex justify-center items-center">
            <Controller
              name="status"
              control={control}
              render={({ field }) => <Checkbox {...field} />}
            />
            <h1>Completed</h1>
          </div>
          <Button type="submit" variant="contained" color="success">
            Create
          </Button>
        </div>
      </form>
    </div>
  )
}



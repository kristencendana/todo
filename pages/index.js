import Link from 'next/link';
import { useEffect } from 'react';
import ToDoItem from '@/components/ToDoItem';
import { useSelector, useDispatch } from 'react-redux';
import { getAllData, UPDATE_SORT } from '@/redux/reducers/task';

export default function App() {

  const dispatch = useDispatch();
  const data = useSelector((state) => {
    return state.task;
  })
  let sortedItems = [...data.items];

    if (data.sortBy === 'old'){
      sortedItems.sort((a, b) => {
        return a.createdAt.localeCompare(b.createdAt);
      })
    } else {
      sortedItems.sort((a, b) => {
        return -a.createdAt.localeCompare(b.createdAt);
      })
    }

  const handleSort = (sortByFeature) => {
    dispatch(UPDATE_SORT(sortByFeature));
  }

  useEffect(() => {
    dispatch(getAllData())
  }, [])

  useEffect(() => {
  }, [data])

  return (
      <main className="flex min-h-screen flex-col bg-white pt-8 pl-16 pr-16">
          <section className='flex justify-between text-xl pb-5 '>
            <h1>To-Do Items</h1>
              <Link href='/create'>
                <div className="flex">
                  <svg width="30" height="30" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M21 12c0-4.969-4.031-9-9-9s-9 4.031-9 9 4.031 9 9 9 9-4.031 9-9Z"></path>
                    <path d="M12 8.25v7.5"></path>
                    <path d="M15.75 12h-7.5"></path>
                  </svg>
                  <button>Create To-Do Item</button>
                </div>
              </Link>
          </section>
          <section className="flex text-right justify-end items-end pb-5 space-x-5">
            <h1>Sort By: </h1>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
            </svg>
            <button onClick={() => handleSort('new')}>Sort by Newest</button>
            <button onClick={() => handleSort('old')}>Sort by Oldest</button>
          </section>
          <section className="h-screen overflow-y-scroll scrollbar-thin scrollbar-thumb-[#104c91] scrollbar-track-gray-100">
            {sortedItems && sortedItems.map(task => (
              <ToDoItem key={task.id} task={task}/>
            ))}
          </section>
      </main>
  )
}
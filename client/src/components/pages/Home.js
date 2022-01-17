import React from 'react';
import TaskFilter from '../tasks/TaskFilter';
import TaskForm from '../tasks/TaskForm';
import Tasks from '../tasks/Tasks'

const Home = () => {
    return (
        <div className='grid-2' >
            <div>
                <TaskForm />
            </div>
            <div>
                <TaskFilter />
                <Tasks />
            </div>
        </div>
    )
}

export default Home

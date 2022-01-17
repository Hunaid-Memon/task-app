import React, {Fragment, useContext} from 'react';
import TaskContext from '../context/task/taskContext';
import TaskItem from './TaskItem';

const Tasks = () => {
    const taskContext = useContext(TaskContext);

    const { tasks, filtered } = taskContext;

    if(tasks.length === 0) {
        return <h4>Please use the form to add a task.</h4>
    }
    return (
        <Fragment>
            {filtered !== null ? 
                filtered.map(task => (
                    <TaskItem key={task.id} task={task} />
                )) :
                tasks.map( task => (
                    <TaskItem key={task.id} task={task} />
                ))
        }
        </Fragment>
    )
}

export default Tasks

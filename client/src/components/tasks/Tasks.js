import React, {Fragment, useContext, useEffect} from 'react';
import TaskContext from '../context/task/taskContext';
import Spinner from '../layout/Spinner';
import TaskItem from './TaskItem';

const Tasks = () => {
    const taskContext = useContext(TaskContext);

    const { tasks, filtered, getTasks, loading } = taskContext;

    useEffect(() => {
        getTasks();
        // eslint-disable-next-line
    }, [])

    if(tasks !== null && tasks.length === 0 && !loading ) {
        return <h4>Please use the form to add a task.</h4>
    }
    return (
        <Fragment>
            {tasks !== null && !loading ? ( 
                <Fragment>
                    {filtered !== null ? 
                        filtered.map(task => (
                            <TaskItem key={task._id} task={task} />
                        )) :
                        tasks.map( task => (
                            <TaskItem key={task._id} task={task} />
                        ))
                    }
                </Fragment>
            ) : 
            <Spinner />
            }
        </Fragment>
    )
}

export default Tasks

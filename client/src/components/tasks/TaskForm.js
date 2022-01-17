import React, { useState, useContext, useEffect } from 'react';
import TaskContext from '../context/task/taskContext';

const TaskForm = () => {
    const taskContext = useContext(TaskContext);

    const { addTask, current, clearCurrent, updateTask } = taskContext;

    useEffect(() => {
        if(current !== null) {
            setTask(current)
        } else {
            setTask({
                title: '',
                subject: '',
                type: 'pending',
                setDate: ''
            })
        }
    },[taskContext, current])

    const onSubmit = e => {
        e.preventDefault();

        if(current === null) {
            addTask(task);
        } else {
            updateTask(task)
        }
        clearAll()
    }

    const [task, setTask] = useState({
        title: '',
        subject: '',
        type: 'pending',
        setDate: ''
    });

    const {title, subject, type, setDate} = task;

    const onChange = e => setTask({...task, [e.target.name]: e.target.value});

    const clearAll = () => {
        clearCurrent();
    }

    return(
        <form onSubmit={onSubmit} >
            <h2 className='text-primary' >{current ? 'Edit Task' : 'Add Task'}</h2>
            <input type="text"
                placeholder='Title'
                name='title'
                value={title}
                onChange={onChange}
            />
            <input type="text"
                placeholder='Detail of task'
                name='subject'
                value={subject}
                onChange={onChange}
            />
            <h6>Task Type</h6>
            <input type='radio' name='type' value='pending' checked={type === 'pending'} onChange={onChange}/> Pending
            {' '}
            <input type='radio' name='type' value='completed' checked={type === 'completed'} onChange={onChange}/> Completed
            <input type="date"
                placeholder='Date'
                name='setDate'
                value={setDate}
                onChange={onChange}
            />
            <input type="submit" value={current ? 'Update Task' : 'Add Task'} className='btn btn-primary btn-block' />
            {current && <div>
                <button className="btn btn-dark btn-block" onClick={clearAll} >Clear</button>
            </div>
            }
        </form>
    )
}

export default TaskForm;
import React, { useContext, useEffect, useRef } from 'react';
import TaskContext from '../context/task/taskContext';
import { CLEAR_FILTER, FILTER_TASKS } from '../context/types';

const TaskFilter = () => {
    const taskContext = useContext(TaskContext);
    const {filterTasks, clearFilter, filtered } = taskContext;
    const text = useRef('');

    useEffect(() => {
        if(filtered === null) {
            text.current.value = '';
        }
    })

    const onChange = e => {
        if(text.current.value !== '') {
            filterTasks(e.target.value)
        } else {
            clearFilter()
        }
    }

    return (
        <form>
            <input ref={text} type="text" placeholder='Search Task' onChange={onChange} />
        </form>
    )
}

export default TaskFilter

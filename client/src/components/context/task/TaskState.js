import { useReducer } from 'react';
import { v4 as uuid } from 'uuid';
// const { v4: uuidv4 } = require('uuid');
import taskContext from './taskContext';
import taskReducer from './taskReducer';



import {
    ADD_TASK,
    DELETE_TASK,
    SET_CURRENT,
    CLEAR_CURRENT, 
    UPDATE_TASK, 
    FILTER_TASKS,
    CLEAR_FILTER
} from '../types';

const TaskState = props => {
    const initialState = {
        tasks: [
            {
                id: 1,
                title: "Office",
                subject: "going to office",
                type: "pending",
                setDate: "2022-01-21"
            },
            {
                id: 2,
                title: "Namaz",
                subject: "Perform Namaz",
                type: "completed",
                setDate: "2022-01-22"
            }
        ],
        current: null,
        filtered: null
    }

    const [state, dispatch] = useReducer(taskReducer, initialState);

    // Add Task
    const addTask = task => {
        // task.id = uuid(),
        task.id = 23
        dispatch({ type: ADD_TASK, payload: task })
    }

    // Delete Task
    const deleteTask = id => {
        dispatch({ type: DELETE_TASK, payload: id })
    }

    // Set Current Task
    const setCurrent = task => {
        dispatch({ type: SET_CURRENT, payload: task })
    }

    // Clear Current Task
    const clearCurrent = () => {
        dispatch({ type: CLEAR_CURRENT })
    }

    // Update Task
    const updateTask = task => {
        dispatch({ type: UPDATE_TASK, payload: task })
    }

    // Filter Tasks
    const filterTasks = text => {
        dispatch({ type: FILTER_TASKS, payload: text })
    }

    // Clear Filter
    const clearFilter = () => {
        dispatch({ type: CLEAR_FILTER })
    }

    return (
        <taskContext.Provider
            value={{
                    tasks: state.tasks,
                    current: state.current,
                    filtered: state.filtered,
                    addTask,
                    updateTask,
                    deleteTask,
                    setCurrent,
                    clearCurrent,
                    filterTasks,
                    clearFilter
            }}
        >
            {props.children}
        </taskContext.Provider>
    )

}

export default TaskState;

import { useReducer } from 'react';
import axios from 'axios';
// const { v4: uuidv4 } = require('uuid');
import taskContext from './taskContext';
import taskReducer from './taskReducer';

import {
    GET_TASKS,
    ADD_TASK,
    DELETE_TASK,
    SET_CURRENT,
    CLEAR_CURRENT, 
    UPDATE_TASK, 
    FILTER_TASKS,
    CLEAR_TASKS,
    TASK_ERROR,
    CLEAR_FILTER
} from '../types';

const TaskState = props => {
    const initialState = {
        // tasks: [
        //     {
        //         id: 1,
        //         title: "Office",
        //         subject: "going to office",
        //         type: "pending",
        //         setDate: "2022-01-21"
        //     },
        //     {
        //         id: 2,
        //         title: "Namaz",
        //         subject: "Perform Namaz",
        //         type: "completed",
        //         setDate: "2022-01-22"
        //     }
        // ],
        tasks: null,
        current: null,
        filtered: null,
        error: null
    }

    const [state, dispatch] = useReducer(taskReducer, initialState);

    // Get Task
    const getTasks = async () => {
        try {
            const res = await axios.get('/api/tasks');
            dispatch({ type: GET_TASKS, payload: res.data });
        } catch(err) {
            console.log(err);
        }
    }

    // Add Task
    const addTask = async task => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.post('api/tasks', task, config);
            dispatch({ type: ADD_TASK, payload: res.data })
        } catch(err) {
            console.log(err);
        }
    }

    // Delete Task
    const deleteTask = async id => {
        try {
            await axios.delete(`api/tasks/${id}`);
            dispatch({ type: DELETE_TASK, payload: id })
        } catch(err) {
            console.log(err);
        }
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
    const updateTask = async task => {
        const config = {
            headers: {
                'Content-Type': 'application/json'
            }
        }
        try {
            const res = await axios.put(`api/tasks/${task._id}`, task, config);
            dispatch({ type: UPDATE_TASK, payload: res.data })
        } catch(err) {
            console.log(err);
        }
    }

    // Filter Tasks
    const filterTasks = text => {
        dispatch({ type: FILTER_TASKS, payload: text })
    }

    // Clear Tasks
    const clearTasks = () => {
        dispatch({ type: CLEAR_TASKS })
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
                    error: state.error,
                    addTask,
                    updateTask,
                    deleteTask,
                    setCurrent,
                    clearCurrent,
                    filterTasks,
                    clearFilter,
                    getTasks,
                    clearTasks
            }}
        >
            {props.children}
        </taskContext.Provider>
    )

}

export default TaskState;

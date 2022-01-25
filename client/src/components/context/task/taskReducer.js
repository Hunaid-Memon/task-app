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

export default (state, action) => {
    switch(action.type) {
        case GET_TASKS:
            return {
                ...state,
                tasks: action.payload,
                loading: false
            }
        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, action.payload]
            }
        case UPDATE_TASK:
            return {
                ...state,
                tasks: state.tasks.map(task => task._id === action.payload._id ? action.payload : task)
            }
        case DELETE_TASK:
            return {
                ...state,
                tasks: state.tasks.filter(task => task._id !== action.payload)
            }
        case SET_CURRENT:
            return {
                ...state,
                current: action.payload
            }
        case CLEAR_CURRENT:
            return {
                ...state,
                current: null
            }
        case CLEAR_TASKS:
            return {
                ...state,
                tasks: null,
                filtered: null,
                error: null,
                current: null
            }
        case FILTER_TASKS:
            return {
                ...state,
                filtered: state.tasks.filter(task => {
                    const regex = new RegExp(`${action.payload}`, 'gi');
                    return task.title.match(regex) || task.subject.match(regex);
                })
            }
        case CLEAR_FILTER:
            return {
                ...state,
                filtered: null
            }
        case TASK_ERROR:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state;
    }
}
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import TaskContext from '../context/task/taskContext';

const TaskItem = ({ task }) => {
    const taskContext = useContext(TaskContext);

    const { deleteTask, setCurrent, clearCurrent } = taskContext;

    const { _id, title, subject, type, setDate } = task;

    const onDelete = () => {
        deleteTask(_id);
        clearCurrent();
    }

    return (
        <div className='card bg-light' >
            <h3 className='text-primary text-left' >
                {title} {' '} 
                    <span style={{ float: "right" }} className={'badge ' + (type === 'pending' ? 'badge-success' : 'badge-primary')}>
                        {type.charAt(0).toUpperCase() + type.slice(1)}
                {/* <select name="" id=""> */}
                    {/* <option value="">{type}</option> */}
                {/* </select> */}
                    </span>
                </h3>
                <ul className='list' >
                    {subject && (
                        <li>
                           <i className="fas fa-duotone fa-book" /> {subject}
                        </li>
                    )}
                    {setDate && (
                        <li>
                           <i className="fas fa-duotone fa-circle" /> {setDate}
                        </li>
                    )}
                </ul>
                <p>
                    <button className='btn btn-dark btn-sm' onClick={() => setCurrent(task)} >Edit</button>
                    <button className='btn btn-danger btn-sm' onClick={onDelete} >Delete</button>
                </p>
            
        </div>
    )
}

TaskItem.propTypes = {
    task: PropTypes.object.isRequired,
}

export default TaskItem

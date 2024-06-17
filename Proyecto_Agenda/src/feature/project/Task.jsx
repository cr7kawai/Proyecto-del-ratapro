import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';


const Task = ({ id, description, completed, title, remove, toggle, projectID }) => {

    let data = {
        id,
        projectID
    }
    data = JSON.stringify(data);

    return (
        <div>
            <div className='container py-3 col-10 col-lg-9'>
                <div className='row'>
                    <div className='card p-1 mb-3'>
                       
                        <div className='card-header d-flex justify-content-end align-items-center'>
                            <div  style={{ cursor: 'pointer' }} ><span  onClick={ () => toggle(id) } className= { completed ? "badge text-bg-success p-2" : "badge text-bg-warning p-2" } >
                            {`${ completed ? 'completado' : 'pendiente' }`}</span></div>
                        </div>
                        <div className='card-body mt-1'>
                            <h6 className='card-title-task'> { title } </h6>   
                            <p className='card-text'><span><i className="bi bi-info-circle-fill"></i></span>  { description }</p> 
                        </div>
                        <div className='projectList-btn d-flex py-1 px-3 justify-content-end gap-2'>
                            <button className='btn btn-danger btn-sm' onClick={ () => remove(id) }> Eliminar <i className="bi bi-trash3-fill"></i></button>
                            <Link className='btn btn-primary btn-sm' to={`/editTask/${data}`} style={{ textDecoration: 'none' }} >Editar <i className="bi bi-pencil-fill"></i></Link>
                        </div>   
                    </div>
                </div>   
            </div>
           
        </div>
    );
};


Task.propTypes = {
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    completed: PropTypes.bool.isRequired,
    remove: PropTypes.func.isRequired,
    toggle: PropTypes.func.isRequired
};


export default Task;

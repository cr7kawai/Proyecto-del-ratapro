
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { updateTask } from './ProjectSlice';


const TaskForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stateProject = useSelector( state => state.projects );
    const params = useParams();
    
    var data = JSON.parse(params.data);

    const [task, setTask] = useState({
        title : '',
        description:'',
        completed: false 
    });

    const handleChange = (e) => {
        e.preventDefault()
        
        setTask({
            ...task,
            [e.target.name] : e.target.value,
        })
    }

    const handleSubmit = (e)=> {
        e.preventDefault()
            dispatch(updateTask({
                task,
                projectID: data.projectID
            }))
            navigate(-1)
    };

    useEffect(() => {

        if(data) {
            const { id, projectID } = data;
            const projectFound = stateProject.find((project) => project.id === Number(projectID) );
            const { listTask } = projectFound;
            const taskFound = listTask.find((list) => list.id === id );
            setTask(taskFound)
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);


    return (

        <div className='container-form '>
            <div className='col-10 col-sm-7 col-md-6 col-xl-4'>
              
                <form onSubmit={ handleSubmit } className='form-projects m-2'>
                    <legend className='text-center mb-2'>Editar tarea</legend>
                    <div className="form-floating mb-3 py-1">
                        <input type="text" className="form-control form-control-sm" id="title" name='title' 
                        value={ task.title } placeholder='task' onChange={ handleChange } />
                        <label htmlFor="title" className =" col-form-label-sm">Titulo</label>
                    </div>
                    <div className="form-floating mb-3 py-1">
                        <textarea type="text" name='description' className="form-control form-control-sm" id="description"
                        value={ task.description }  placeholder="description" onChange={ handleChange }   />
                        <label htmlFor="description" className =" col-form-label-sm" >Descripcion</label>
                    </div>
                    <button type='submit' className="btn btn-primary btn-sm col-3">Guardar </button>    
                </form>   
            </div>
        </div>
        
    );
}

export default TaskForm;

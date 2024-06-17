import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import Task from './Task';   
import { deleteTask, toggleTask } from './ProjectSlice';
import noData from '../../assets/img/search_files.svg';


const Project = () => {

    const [project, setProject ] = useState({})  
    const params = useParams();
    const projectID = params.id
    const proj = useSelector( state => state.projects.find(proj => proj.id === Number(params.id)))
    const dispatch = useDispatch()

    const removeTask = (id)=> {
        const taskID = id
        dispatch(deleteTask({
            taskID, projectID
        }))
    };

    const toggle = (id)=> {
        const taskID = id
        dispatch(toggleTask({
            taskID, projectID
        }))
    };

    useEffect(() => {

        if(params.id){    
           setProject({
            ...project, ...proj
           })
        }

    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id, proj ]);


    if(!project.listTask){
        return <h6 className='mens-null'>No hay rutinas en este proyecto.</h6>
    }

    return (
        <>
            <div className='container py-4'>
                <div className='row list-project'>
                    <Link to='/projects' className=' row text-center link-title'>
                        <h1 ><i className="bi bi-check2-circle"></i> { project.nameProject }</h1>
                    </Link>
                    { 
                        project.listTask.length !== 0 ?
                        ( project.listTask.map((task, index)=> (
                        <Task key={ task.id } {...task } remove={ removeTask } toggle={ toggle }
                        projectID ={ projectID } />
                        )))
                        :
                        (
                            <div className='no-Data'>
                                <img className='img-no-Data' src={ noData } alt='No data' />
                                <h3>No hay rutinas en este proyecto.</h3>
                            </div>
                        )  
                    }
                </div>     
            </div>
              
        </>
    );
};


export default Project;

import { useSelector,  useDispatch } from 'react-redux';
import { removeProject } from '../../feature/project/ProjectSlice';
import { Link } from 'react-router-dom';
import noData from '../../assets/img/search_files.svg';

/**
 * 
 * @returns 
 */
const ProjectList = () => {

    const dispatch = useDispatch()
    const projects = useSelector( state => state.projects )
  
    const deleteProject = (id)=> {
        dispatch(removeProject(id))
    }

  
    return (
        <div className='container py-3 col-9 col-lg-8 '>
            <div className='row list-project'>
                <h2 className='text-center my-3'>Agendas</h2>
                    { 
                        projects.length !== 0 ?
                        (projects.map((project, index)=> (
                            <div key={ project.id } className='card p-1 mb-1'>
                                <Link to={ `/project/${project.id}` } className='card-header p-2'  style={{ textDecoration: 'none' }}>
                                    <h3 style={{ cursor: 'pointer' }} className='card-title'><i className="bi bi-check2-circle"></i> { project.nameProject } </h3>
                                </Link>
                                <div  className='card-body'>      
                                    <p className='card-text'>{ project.projectDescription }</p>  
                                </div>        
                                <div className='projectList-btn d-flex py-1 px-3 justify-content-end gap-2'>
                                    <button className='btn btn-danger btn-sm' onClick={ () => deleteProject(project.id) }>Eliminar <i className="bi bi-trash3-fill"></i></button> 
                                    <Link className='btn btn-primary btn-sm' to= { `/editProject/${project.id}` }  style={{ textDecoration: 'none' }}>Editar <i className="bi bi-pencil-fill"></i></Link>  
                                </div>    
                            </div>  )))
                        :
                        (
                            <div className='no-Data'>
                                <img className='img-no-Data' src={ noData } alt='No data' />
                                <h3>agendas no encontradas</h3>
                            </div>
                        )  
                    } 
            </div>
        </div>
    );
}

export default ProjectList;

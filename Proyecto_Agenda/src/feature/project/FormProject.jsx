import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { addProject, updateProject } from './ProjectSlice';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const FormProject = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const params = useParams();
    const [listTask, setListTask] = useState([]);
    const [nameProject, setNameProject] = useState('');
    const [projectDescription, setProjectDescription] = useState('');
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);
    const proj = useSelector(state => state.projects.find(proj => proj.id === Number(params.id)));

    const initialState = {
        title: '',
        description: '',
        completed: false,
        id: 0
    };

    const [task, setTask] = useState(initialState);

    const project = {
        nameProject,
        projectDescription,
        listTask,
        startDate,
        endDate
    };

    const handleTaskChange = (e) => {
        e.preventDefault();
        setTask({
            ...task,
            [e.target.name]: e.target.value,
            id: new Date().valueOf()
        });
    };

    const SubmitTask = (e) => {
        e.preventDefault();
        setListTask([
            ...listTask, task
        ]);
        setTask(initialState);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (params.id) {
            dispatch(updateProject({
                ...project,
                id: params.id
            }));
            navigate('/projects');
        } else {
            dispatch(addProject({
                ...project,
                id: new Date().valueOf()
            }));
        }
        setListTask([]);
        setNameProject('');
        setProjectDescription('');
        navigate('/projects');
    };

    useEffect(() => {
        if (params.id) {
            setNameProject(proj.nameProject);
            setProjectDescription(proj.projectDescription);
            setListTask(proj.listTask);
            setStartDate(proj.startDate ? new Date(proj.startDate) : null);
            setEndDate(proj.endDate ? new Date(proj.endDate) : null);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [params.id]);

    return (
        <div className='container-form'>
            <div className='col-10 col-sm-7 col-md-6 col-lg-4'>
                <form onSubmit={handleSubmit} className='form-projects'>
                    <legend>{params.id ? 'Editar agenda' : 'Crear Agenda'}</legend>

                    <div className="form-floating mb-3 py-1">
                        <input type="text" className="form-control" id="floatingInput" name='nameProject' placeholder="Title project"
                            value={nameProject} onChange={(e) => setNameProject(e.target.value)} required />
                        <label htmlFor="floatingInput">Titulo</label>
                    </div>
                    <div className="form-floating mb-3 py-1">
                        <textarea type="text" name='projectDescription' className="form-control" id="floatingDescription" placeholder="Description"
                            onChange={(e) => setProjectDescription(e.target.value)} value={projectDescription} required />
                        <label htmlFor="floatingDescription">Descripcion</label>
                    </div>

                    <div className="mb-3">
                        <label>Fecha de Inicio:</label>
                        <DatePicker
                            selected={startDate}
                            onChange={(date) => setStartDate(date)}
                            selectsStart
                            startDate={startDate}
                            endDate={endDate}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Seleccione fecha de inicio"
                            className="form-control"
                        />
                    </div>
                    <div className="mb-3">
                        <label>Fecha de Fin:</label><br />
                        <DatePicker
                            selected={endDate}
                            onChange={(date) => setEndDate(date)}
                            selectsEnd
                            startDate={startDate}
                            endDate={endDate}
                            minDate={startDate}
                            dateFormat="dd/MM/yyyy"
                            placeholderText="Seleccione fecha de fin"
                            className="form-control"
                        />
                    </div>

                    <div className='modal-newTask'>
                        <div className="form-text">Agrega un nuevo mantenimiento a tu agenda</div>
                        <button type="button" className="btn-newtask btn btn-outline-secondary btn-sm rounded-circle" data-bs-toggle="modal" data-bs-target="#form-Modal">
                            +
                        </button>
                    </div>

                    <div className="row">
                        <button type="submit" className="btn btn-outline-light btn-sm col-8 m-auto">{params.id ? 'Guardar' : 'Crear'}</button>
                    </div>
                </form>
            </div>

            {/*--------- modal -------- */}

            <div className="modal fade" id="form-Modal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content form-projects">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Nuevo mantenimiento</h5>
                        </div>
                        <div className="modal-body ">

                            <div className="form-floating mb-3 py-1">
                                <input type="text" className="form-control form-control-sm" id="floatingInput-Modal" name='title' placeholder='task' onChange={handleTaskChange} value={task.title} />
                                <label htmlFor="floatingInput-Modal" className="col-form-label-sm">Titulo</label>
                            </div>
                            <div className="form-floating mb-3 py-1">
                                <textarea type="text" name='description' className="form-control form-control-sm" id="floatingDescription-Modal" placeholder="description"
                                    onChange={handleTaskChange} value={task.description} />
                                <label htmlFor="floatingDescription-Modal" className="col-form-label-sm">Descripcion</label>
                            </div>
                        </div>

                        <div className="modal-footer">
                            <button type="button" className="btn btn-secondary btn-sm" data-bs-dismiss="modal">cerrar</button>
                            <button type="button" className="btn btn-primary btn-sm" onClick={SubmitTask} data-bs-dismiss="modal">guardar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FormProject;

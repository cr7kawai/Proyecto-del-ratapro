import { createSlice } from "@reduxjs/toolkit";


export const ProjectSlice = createSlice({
    name: 'Project',
    initialState : [],
    reducers: {
        addProject: (state, action ) => {
            state.push(action.payload)
        },
        removeProject: (state, action ) => {
            const projectFound = state.find((project) => project.id === action.payload)
            state.splice(state.indexOf(projectFound),1)
        },
        updateProject: (state, action) => {
            const { nameProject, projectDescription, id, listTask } = action.payload
            const projectFound = state.find((project) => project.id === Number(id) )
            if(projectFound){
                projectFound.nameProject = nameProject;
                projectFound.projectDescription = projectDescription;  
                projectFound.listTask = listTask;
            }
        },
        deleteTask: (state,action) => {

            // recibe el id del proyecto y el id de la tarea
            const { projectID, taskID } = action.payload
            // obtengo el proyecto y su posicion en el array
            const projectFound = state.find((project) => project.id === Number(projectID));

            if(projectFound) {

                //obtengo el array de tareas del proyecto encontrado y encuentro la tarea requerido
                const {listTask} = projectFound;
                const taskFound = listTask.find((list) => list.id ===  Number(taskID));
                // splice borra la tarea
                listTask.splice(listTask.indexOf(taskFound),1)  
            }
        },
        updateTask: (state, action) => {

            const { projectID, task } = action.payload;

            const projectFound = state.find((project) => project.id === Number(projectID));
            if(projectFound) {
                const {listTask} = projectFound;
                const taskFound = listTask.find((list) => list.id === task.id);
                if(taskFound){
                    taskFound.id = task.id;
                    taskFound.description = task.description;
                    taskFound.title = task.title;
                }
            }

        },
        toggleTask: (state, action) => {
            const { projectID, taskID } = action.payload
            const projectFound = state.find((project) => project.id === Number(projectID));

            if(projectFound) {
                const {listTask} = projectFound;
                const taskFound = listTask.find((list) => list.id ===  Number(taskID));
                if(taskFound){
                    taskFound.completed = !taskFound.completed
                }
            }
        }
    }
})


export const { addProject, removeProject, updateProject, deleteTask, updateTask, toggleTask } = ProjectSlice.actions;

export default ProjectSlice.reducer;


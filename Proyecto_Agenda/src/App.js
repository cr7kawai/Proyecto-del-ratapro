import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormProject from "./feature/project/FormProject";
import ProjectList from "./feature/project/ProjectList";
import Project from "./feature/project/Project";
import Home from "./pages/Home";
import Header from './components/container/Header';
import TaskForm from "./feature/project/TaskForm";
import './App.scss'

function App() {
  return (
    
      <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={ <Home /> } />
            <Route path="/projects-form" element={ <FormProject /> } /> 
            <Route path="/projects" element={ <ProjectList /> } /> 
            <Route path="/project/:id" element={ <Project /> } /> 
            <Route path="/editProject/:id" element={ <FormProject /> } />  
            <Route path="/editTask/:data" element={ <TaskForm /> } />  
          </Routes>
     </BrowserRouter>
  );
}

export default App;
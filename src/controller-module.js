import { displayModule } from "./display-module";
import { projectFactory } from "./factories";
import { informationModule } from "./information-module";
export{ controllerModule };



const controllerModule = (() => {


    let addToProjectsLibary = (project) => {
        informationModule.projectsLibrary.push(project);
    };

    let createProject = () => {
        let temp = informationModule.grabElement('projectName').value;
        let project = projectFactory(temp);
        addToProjectsLibary(project);
    };

    let finalizeProject = () => {
        createProject();
        displayModule.updateProjectsSideNav();
    }

    let openProjectModal = () => {
       informationModule.grabElement('modal').showModal();
       informationModule.grabElement('closeModal').addEventListener('click' , () => {
        informationModule.grabElement('modal').close();  
       })
       informationModule.grabElement('createProject').addEventListener('click', finalizeProject)
    }


    let headerControl = () => {
        displayModule.headerDisplay();
        informationModule.grabElement('addProject').addEventListener('click', openProjectModal);
    }


    




    return {
        createProject,
        headerControl,
    }

})();
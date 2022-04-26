import { displayModule } from "./display-module";
import { projectFactory } from "./factories";
import { informationModule } from "./information-module";
export{ controllerModule };



const controllerModule = (() => {


    let addToProjectsLibary = (project) => {
        informationModule.projectsLibrary.push(project);
    };

    let createProject = () => {
        if (informationModule.grabElement('projectName').value === "" ) 
            return alert('Please insert a name for the project')
        let temp = informationModule.grabElement('projectName').value;
        let project = projectFactory(temp);
        addToProjectsLibary(project);  
        informationModule.grabElement('modal').close();
    };

    let finalizeProject = () => {
        createProject();
        displayModule.updateProjectsSideNav();
        displayModule.updateProjectsMainDisplay();
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

    let toDoControl = () => {
        informationModule.grabElement('toDoModal').showModal();
        displayModule.updateSelectOptions()
    }

   

    


    




    return {
        createProject,
        headerControl,
        toDoControl,
    }

})();
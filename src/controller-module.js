import { displayModule } from "./display-module";
import { projectFactory } from "./factories";
import { informationModule } from "./information-module";
export{ controllerModule };



const controllerModule = (() => {


    let addToProjectsLibary = (project) => {
        informationModule.projectsLibrary.push(project);
    };

    let createProject = () => {
        //Test line, rework in final build
        let temp = prompt('project name');
        let project = projectFactory(temp);
        addToProjectsLibary(project);
    };

    let issueProjectChange = () => {
        createProject();
        displayModule.updateProjectsSideNav();
    }


    let headerControl = () => {
        displayModule.headerDisplay();
        informationModule.grabElement('addProject').addEventListener('click', issueProjectChange);
    }


    




    return {
        createProject,
        headerControl,
    }

})();
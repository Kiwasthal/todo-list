import { controllerModule } from "./controller-module";
import { informationModule } from "./information-module";
export {displayModule};



let displayModule = (() => {

    let emptyDisplay = (element) => {
        while (element.lastElementChild) {
            element.removeChild(element.lastElementChild)
        };
    };


    let addTodoButton = document.createElement('button');
    addTodoButton.classList.add('addTodo');
    addTodoButton.textContent = 'Create todo';
    informationModule.grabElement('sideNav').appendChild(addTodoButton);

    let displayProjectButton = () => {
    let addProjectButton = document.createElement('button');
    addProjectButton.classList.add('addProject')
    addProjectButton.textContent = "Create a project";
    informationModule.grabElement('mainContainer').appendChild(addProjectButton);
    };


    let updateProjectsSideNav = () => {
        emptyDisplay(informationModule.grabElement('projectHeader'));
        informationModule.projectsLibrary.forEach(project => {
            let temp = document.createElement('h5');
            temp.textContent = project.title;
            informationModule.grabElement('projectHeader').appendChild(temp);
        })
    }
    

    let headerDisplay = () => {
        emptyDisplay(informationModule.grabElement('mainContainer'));
        displayProjectButton();
    }



    

    return {
        headerDisplay,
        updateProjectsSideNav,
    }

})();
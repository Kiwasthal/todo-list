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
        addProjectButton.textContent = "CREATE PROJECT";
        informationModule.grabElement('displayInfo').style.display = 'grid'
        informationModule.grabElement('displayInfo').appendChild(addProjectButton);
    };
    

    let headerDisplay = () => {
        emptyDisplay(informationModule.grabElement('displayInfo'));
        displayProjectButton();
    }

    let updateProjectsSideNav = () => {
        emptyDisplay(informationModule.grabElement('projectsDisplay'));
        informationModule.projectsLibrary.forEach(project => {
            let temp = document.createElement('li');
            temp.textContent = project.title;
            informationModule.grabElement('projectsDisplay')
            informationModule.grabElement('projectsDisplay').appendChild(temp);
        })
    }



    

    return {
        headerDisplay,
        updateProjectsSideNav,
    }

})();
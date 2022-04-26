import { controllerModule } from "./controller-module";
import { informationModule } from "./information-module";
import projectIcon  from "./assets/projects.png"
export {displayModule};



let displayModule = (() => {

    let emptyDisplay = (element) => {
        while (element.lastElementChild) {
            element.removeChild(element.lastElementChild)
        };
    };

    let clearToDoModal = () => {
        informationModule.grabElement('toDoName').value = "";
        informationModule.grabElement('toDoDate').value = "";
        informationModule.grabElement('toDoText').value = "";
        informationModule.grabElement('prioritySelect').value = "";
        
    }

    const myProjectIcon = new Image();
    myProjectIcon.src = projectIcon;
    informationModule.grabElement('projectsBar').insertBefore(myProjectIcon , informationModule.grabElement('projectHeader'));


    const addTodoButton = document.createElement('button');
    addTodoButton.classList.add('addTodo');
    addTodoButton.textContent = 'Create todo';
    informationModule.grabElement('sideNav').appendChild(addTodoButton);

    let projectMainDisplay = () => {
        const projectHolder = document.createElement('div');
        projectHolder.classList.add('projectsHolder');
        informationModule.grabElement('displayInfo').appendChild(projectHolder)
    }

    let displayProjectButton = () => {
        const addProjectButton = document.createElement('button');
        addProjectButton.classList.add('addProject')
        addProjectButton.textContent = "CREATE PROJECT";
        informationModule.grabElement('displayInfo').style.display = 'grid'
        informationModule.grabElement('displayInfo').appendChild(addProjectButton);
    };
    

    let headerDisplay = () => {
        emptyDisplay(informationModule.grabElement('displayInfo'));
        displayProjectButton();
        projectMainDisplay();
    }

    let displayTodoList = (e) => {
        informationModule.projectsLibrary.forEach(project => {
            if (project.title === e.target.textContent) {
                emptyDisplay(informationModule.grabElement('mainContainer'));
                for (let i = 0 ; i < project.todoLibrary.length ; i++) {
                    
                    let todoContainer = document.createElement('div')
                    todoContainer.classList.add('todoView');
                    informationModule.grabElement('mainContainer').appendChild(todoContainer)
                    
                }
            }
        })
    }

    let updateProjectsSideNav = () => {
        emptyDisplay(informationModule.grabElement('projectsDisplay'));
        informationModule.projectsLibrary.forEach(project => {
            let temp = document.createElement('li');
            temp.addEventListener('click' , displayTodoList )
            temp.textContent = project.title;
            informationModule.grabElement('projectsDisplay').appendChild(temp);
        })
    }

    let updateSelectOptions = () => {
        emptyDisplay(informationModule.grabElement('projectSelect'));
        for (let i = 0 ; i < informationModule.projectsLibrary.length ; i++) {
            let option = document.createElement('option');
            option.textContent = informationModule.projectsLibrary[i].title;
            option.value = informationModule.projectsLibrary[i].title;
            informationModule.grabElement('projectSelect').appendChild(option);
        }
    }

    let updateProjectsMainDisplay = () => {
        emptyDisplay(informationModule.grabElement('projectsHolder'));
        informationModule.projectsLibrary.forEach(project => {
            let temp = document.createElement('div');
            temp.textContent = project.title;
            temp.classList.add('projectSheet')
            informationModule.grabElement('projectsHolder').appendChild(temp);
        })
    }



    

    return {
        headerDisplay,
        updateProjectsSideNav,
        updateProjectsMainDisplay,
        updateSelectOptions,
        clearToDoModal,
    }

})();
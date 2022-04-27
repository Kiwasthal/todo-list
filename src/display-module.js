import { controllerModule } from "./controller-module";
import { informationModule } from "./information-module";
import projectIcon  from "./assets/projects.png";
import expandIcon from "./assets/expand.svg";
import editIcon from "./assets/edit.svg";
import priorityIcon from "./assets/priority.svg"
import deleteIcon from "./assets/delete.svg"
export { displayModule };



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
    myProjectIcon.classList.add('projectIcon');
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
    };

    //To do creation Funtion

    

    let assignPriorityColor = (check) => {
       return check === 'High' ? '#d72915' : check === 'Medium' ? '#d0a415' : '#1a901a';
    }

    let expandTodo = (element , info) => {
        if (element.classList.contains('active')) {
            element.classList.remove('active');
            element.style.height = 'auto';
            element.removeChild(todoText);
        } else {
            element.style.height = '20vh';
            element.classList.add('active');
            let todoText = document.createElement('p');
            todoText.textContent = info;
            todoText.classList.add('todoText');
            element.appendChild(todoText);
        }
    }
    
    //Main Todo Display logic


    let displayTodoList = (e) => {
        informationModule.projectsLibrary.forEach(project => {
            if (project.title === e.target.textContent) {

                emptyDisplay(informationModule.grabElement('displayInfo'));

                for (let i = 0 ; i < project.todoLibrary.length ; i++) {
                    
                    let todoContainer = document.createElement('div');
                    todoContainer.classList.add('todoView');

                    let todoHeader = document.createElement('h2');
                    let todoDate = document.createElement('h2');

                    todoHeader.classList.add('todoHeader');
                    todoDate.classList.add('todoDate');

                    todoContainer.style.borderLeftColor = assignPriorityColor(project.todoLibrary[i].priority);
                    
                    todoHeader.textContent = project.todoLibrary[i].toDoTitle;
                    todoDate.textContent = project.todoLibrary[i].date;

                    let imageContainer = document.createElement('div');
                    imageContainer.classList.add('imageContainer');

                    const myExpandIcon = new Image();
                    myExpandIcon.src = expandIcon;
                    imageContainer.appendChild(myExpandIcon);


                    const myEditIcon = new Image();
                    myEditIcon.src = editIcon;
                    imageContainer.appendChild(myEditIcon);

                    const myPriorityIcon = new Image();
                    myPriorityIcon.src = priorityIcon;
                    imageContainer.appendChild(myPriorityIcon);

                    const myDeleteIcon = new Image();
                    myDeleteIcon.src = deleteIcon;
                    imageContainer.appendChild(myDeleteIcon);


                    //Add event listeners to images

                    myExpandIcon.addEventListener('click', () => {
                        expandTodo(todoContainer , project.todoLibrary[i].description);
                    });

                    
                   

                    // myEditIcon.addEventListener('click')
                    // myPriorityIcon.addEventListener('click')
                    // myDeleteIcon.addEventListener('click')
                    
                    todoContainer.appendChild(todoHeader);
                    todoContainer.appendChild(todoDate);
                    todoContainer.appendChild(imageContainer);
                    
                    informationModule.grabElement('displayInfo').appendChild(todoContainer);
                    
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
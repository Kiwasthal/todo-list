import { controllerModule } from "./controller-module";
import { informationModule } from "./information-module";
import projectIcon  from "./assets/projects.png";
import expandIcon from "./assets/expand.svg";
import editIcon from "./assets/edit.svg";
import priorityIcon from "./assets/priority.svg"
import deleteIcon from "./assets/delete.svg"
import barsIcon from "./assets/bars.svg"
import saveIcon from "./assets/save.svg"
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
     

    const myBarsIcon = new Image();
    myBarsIcon.src = barsIcon;
    myBarsIcon.classList.add('barsIcon');
    informationModule.grabElement('navbar').appendChild(myBarsIcon);

    const myProjectIcon = new Image();
    myProjectIcon.src = projectIcon;
    myProjectIcon.classList.add('projectIcon');
    informationModule.grabElement('projectsBar').insertBefore(myProjectIcon , informationModule.grabElement('projectHeader'));


    const addTodoButton = document.createElement('button');
    addTodoButton.classList.add('addTodo');
    addTodoButton.textContent = 'Create todo';
    informationModule.grabElement('sideNav').appendChild(addTodoButton);

    let toggleSideNav = () => {
        if (informationModule.grabElement('sideNav').classList.contains('sidenavHide')){
            informationModule.grabElement('sideNav').classList.remove('sidenavHide')

        } else {
            informationModule.grabElement('sideNav').classList.add('sidenavHide');
        }
    }

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

    let changePriority = (check) => {
        return check === 'High' ? 'Medium' : check === 'Medium' ? 'Low' : 'High';
    }

    let expandTodo = (element , info) => {
        let todoText = document.createElement('p');
        if (element.classList.contains('expanded')) {
            let remove = element.querySelector('p');
            element.classList.remove('expanded');
            element.removeChild(remove);
            element.style.height = 'auto';
        } else {
            element.style.height = '20vh';
            element.classList.add('expanded');
            todoText.textContent = info;
            todoText.classList.add('todoText');
            element.appendChild(todoText);
        }
    }

    let editTodo = (container) => {

        let todoHeader = container.querySelector('.todoHeader');
        let todoDate = container.querySelector('.todoDate');
        let inputNewHeader = document.createElement('input');
        let inputNewDate = document.createElement('input');
        inputNewHeader.classList.add('newHeader');
        inputNewDate.classList.add('newDate');
        inputNewHeader.type = 'text';
        inputNewHeader.value = todoHeader.textContent;
        inputNewDate.type = 'date'
        inputNewDate.value = todoDate.textContent;
        container.removeChild(todoHeader);
        container.removeChild(todoDate);
        container.appendChild(inputNewHeader);
        container.appendChild(inputNewDate);
        container.classList.add('editing');
        
    }


    let saveTodo = (container) => {
        container.classList.remove('editing');
        let grabHeader = container.querySelector('.newHeader');
        let grabDate = container.querySelector('.newDate');

        let todoHeader = document.createElement('h2');
        let todoDate = document.createElement('h2');

        todoHeader.classList.add('todoHeader');
        todoDate.classList.add('todoDate');

        todoHeader.textContent = grabHeader.value;
        
        todoDate.textContent = grabDate.value;
        
        container.removeChild(grabHeader);
        container.removeChild(grabDate);
        container.appendChild(todoHeader);
        container.appendChild(todoDate);

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

                    myPriorityIcon.addEventListener('click', () => {
                        project.todoLibrary[i].priority = changePriority(project.todoLibrary[i].priority);
                        todoContainer.style.borderLeftColor = assignPriorityColor(project.todoLibrary[i].priority);
                    })

                    myEditIcon.addEventListener('click', () => {
                        if (todoContainer.classList.contains('editing')) {
                            saveTodo(todoContainer, project.todoLibrary[i].toDoTitle , project.todoLibrary[i].date);
                            project.todoLibrary[i].toDoTitle = todoContainer.querySelector('.todoHeader').textContent;
                            project.todoLibrary[i].date = todoContainer.querySelector('.todoDate').textContent;
                        } else {
                            editTodo(todoContainer)
                        }
                           
                    });
                   

                    // myEditIcon.addEventListener('click')
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
        toggleSideNav
    }

})();
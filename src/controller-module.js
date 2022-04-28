import { displayModule } from "./display-module";
import { projectFactory, todoFactory } from "./factories";
import { informationModule } from "./information-module";
import { format , isPast , parseISO , getMonth, getDay } from 'date-fns'
import { el } from "date-fns/locale";
export{ controllerModule };



const controllerModule = (() => {


    

    let addToProjectsLibary = (project) => {
        informationModule.projectsLibrary.push(project);
    };
    
    //Project Methods

    let pushTodoToLibrary = {
        addtoLibrary(todo){
            this.todoLibrary.push(todo);
        }
    }

    //Module
    
    let confirmation = true;


    let createProject = () => {
        if (informationModule.grabElement('projectName').value === "" ) 
            return alert('Please insert a name for the project')

        let temp = informationModule.grabElement('projectName').value;
        let project = projectFactory(temp);
        addToProjectsLibary(project);  
        project.insertTodo = pushTodoToLibrary.addtoLibrary
        informationModule.grabElement('modal').close();
    };

    let createToDo = () => {
        

        confirmation = true;

        let todoTitle = informationModule.grabElement('toDoName').value;
        let todoDate = informationModule.grabElement('toDoDate').value;
        let todoText = informationModule.grabElement('toDoText').value;
        let todoPriority = informationModule.grabElement('prioritySelect').value;

        if (todoDate === "") {
            confirmation = false;
            alert('Please select a date');
            return
        }

        if (todoTitle === "") {
            confirmation = false;
            alert('Please select a name for your Todo');
            return
        }

        if (isPast(parseISO(todoDate)) && getDay(new Date) !== getDay(parseISO(todoDate))) {
            confirmation = false;
            alert('Please insert a future date for your todos');
            return;
            
        };

        
        let todo = todoFactory(todoTitle , todoDate , todoText , todoPriority );
        for (let i = 0 ; i < informationModule.projectsLibrary.length ; i++) {
            for (let y = 0 ; y < informationModule.projectsLibrary[i].todoLibrary.length ; y++) {
                if (informationModule.projectsLibrary[i].todoLibrary[y].toDoTitle === todoTitle) {
                    alert ('Your todos should have different names');
                    confirmation = false;
                    return
                } else {
                    confirmation = true;
                }
            }
        }

        if (confirmation) {
            for (let i = 0 ; i < informationModule.projectsLibrary.length ; i++) {
                if (informationModule.projectsLibrary[i].title === informationModule.grabElement('projectSelect').value) {
                    informationModule.projectsLibrary[i].insertTodo(todo);
                    confirmation = true ;
                };
            };
        };
    };

    //Work here for display

    let finalizeProject = () => {
        createProject();
        displayModule.updateProjectsSideNav();
        displayModule.updateProjectsMainDisplay();
    }

    let finalizeTodo = () => {
        createToDo();  
        if (confirmation) {
        displayModule.clearToDoModal();
        informationModule.grabElement('toDoModal').close();
        }
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
        displayModule.projectMainDisplay();
        displayModule.updateProjectsMainDisplay();
        informationModule.grabElement('addProject').addEventListener('click', openProjectModal);
    }

    let toDoControl = () => {
        informationModule.grabElement('toDoModal').showModal();
        displayModule.updateSelectOptions();
        informationModule.grabElement('closeToDo').addEventListener('click', () => {
            informationModule.grabElement('toDoModal').close();
        });
        informationModule.grabElement('createToDo').addEventListener('click' , finalizeTodo)
    }



    return {
        createProject,
        headerControl,
        toDoControl,
    }

})();
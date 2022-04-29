import { displayModule } from "./display-module";
import { projectFactory, todoFactory } from "./factories";
import { informationModule } from "./information-module";
import { format , isPast , parseISO , getMonth, getDay } from 'date-fns'
import { el } from "date-fns/locale";
export{ controllerModule };



const controllerModule = (() => {

    let pushTodoToLibrary = {
        addtoLibrary(todo){
            this.todoLibrary.push(todo);
        }
    }


    if (localStorage.getItem("mylocalStore") === null) {

    } else {
        informationModule.projectsLibrary = JSON.parse(localStorage.getItem('mylocalStore'));
        informationModule.projectsLibrary.forEach(project => {
            project.insertTodo =  pushTodoToLibrary.addtoLibrary;
        })
        displayModule.updateProjectsSideNav();
    }

    

    
    

    let updateLocalStorage = () => {
        localStorage.setItem('mylocalStore', JSON.stringify(informationModule.projectsLibrary));
        const mylocalData = JSON.parse(localStorage.getItem('mylocalStore'));
    }



    let addToProjectsLibary = (project) => {
        informationModule.projectsLibrary.push(project);
    };
    
    //Project Methods

    

    //Module
    
    let confirmation = true;


    let createProject = () => {

        confirmation = true;

        if (informationModule.grabElement('projectName').value === "" ) 
            return alert('Please insert a name for the project')

        let temp = informationModule.grabElement('projectName').value;

        for (let i = 0 ; i < informationModule.projectsLibrary.length ; i++) {

            if (informationModule.projectsLibrary[i].title === temp ) {
                alert ('Your projects should have different names');
                confirmation = false;
                return
            }
        }

        if (confirmation) {

        let project = projectFactory(temp);
        addToProjectsLibary(project);  
        project.insertTodo = pushTodoToLibrary.addtoLibrary
        informationModule.grabElement('modal').close();
        informationModule.grabElement('modal').style.display = '';
        displayModule.clearProjectModal();
        updateLocalStorage();

        }
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
                    updateLocalStorage();
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
       informationModule.grabElement('modal').style.display = 'grid';
       informationModule.grabElement('closeModal').addEventListener('click' , () => {
        
        informationModule.grabElement('modal').style.display = '';
        informationModule.grabElement('modal').close();
        displayModule.clearProjectModal();  
        
       })
       informationModule.grabElement('createProject').addEventListener('click', finalizeProject)
    }


    let headerControl = () => {
        
        displayModule.headerDisplay();
        displayModule.projectMainDisplay();
        displayModule.updateProjectsMainDisplay();
        displayModule.resetAnimation();
        informationModule.grabElement('addProject').addEventListener('click', openProjectModal);
    }

    let toDoControl = () => {
        informationModule.grabElement('toDoModal').showModal();
        displayModule.updateSelectOptions();
        informationModule.grabElement('closeToDo').addEventListener('click', () => {

            displayModule.clearToDoModal();
            informationModule.grabElement('toDoModal').close();

        });
        informationModule.grabElement('createToDo').addEventListener('click' , finalizeTodo)
    }



    return {
        createProject,
        headerControl,
        toDoControl,
        updateLocalStorage
    }

})();
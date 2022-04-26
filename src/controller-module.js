import { displayModule } from "./display-module";
import { projectFactory, todoFactory } from "./factories";
import { informationModule } from "./information-module";
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
        let todoTitle = informationModule.grabElement('toDoName').value;
        let todoDate = informationModule.grabElement('toDoDate').value;
        let todoText = informationModule.grabElement('toDoText').value;
        let todoPriority = informationModule.grabElement('prioritySelect').value;

        let todo = todoFactory(todoTitle , todoDate , todoText , todoPriority );
        for (let i = 0 ; i < informationModule.projectsLibrary.length ; i++) {
            if (informationModule.projectsLibrary[i].title === informationModule.grabElement('projectSelect').value) {
               informationModule.projectsLibrary[i].insertTodo(todo);
            }
        }
    }

    let finalizeProject = () => {
        createProject();
        displayModule.updateProjectsSideNav();
        displayModule.updateProjectsMainDisplay();
    }

    let finalizeTodo = () => {
        createToDo();  
        displayModule.clearToDoModal();
        informationModule.grabElement('toDoModal').close();
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
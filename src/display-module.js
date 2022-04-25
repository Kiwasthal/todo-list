
import { informationModule } from "./information-module";
export {displayModule};


let displayModule = (() => {

    let addTodoButton = document.createElement('button');
    addTodoButton.classList.add('addTodo');
    addTodoButton.textContent = 'Create todo';
    informationModule.grabElement('sideNav').appendChild(addTodoButton);

    let displayProjectButton = () => {
    let addProjectButton = document.createElement('button');
    addProjectButton.textContent = "Create a project";
    informationModule.grabElement('mainContainer').appendChild(addProjectButton);
    };

    console.log(informationModule.grabElement('projectHeader'));

    informationModule.grabElement('projectHeader').addEventListener('click', displayProjectButton)

    return {
        displayProjectButton,
    }
    
})();
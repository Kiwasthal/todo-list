
import { informationModule } from "./information-module";
export {displayModule};


let displayModule = (() => {

    let addTodoButton = document.createElement('button');
    addTodoButton.classList.add('addTodo');
    addTodoButton.textContent = 'Create todo';
    informationModule.grabSideNav().appendChild(addTodoButton);

})();
import { informationModule } from './information-module';
import { controllerModule } from './controller-module';
import { displayModule } from './display-module';
export { appModule }

const appModule = (() => {
    
    informationModule.grabElement('projectHeader').addEventListener('click', controllerModule.headerControl);
    informationModule.grabElement('projectIcon').addEventListener('click', controllerModule.headerControl)
    informationModule.grabElement('toDoButton').addEventListener('click', controllerModule.toDoControl);
    informationModule.grabElement('barsIcon').addEventListener('click', displayModule.toggleSideNav);
    informationModule.grabElement('dropIcon').addEventListener('click', displayModule.dropIconToggle);
    
})();
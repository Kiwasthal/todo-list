import { informationModule } from './information-module';
import { controllerModule } from './controller-module';
export {appModule}

const appModule = (() => {

    informationModule.grabElement('projectHeader').addEventListener('click', controllerModule.headerControl);

})();
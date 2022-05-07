import projectIcon from './assets/projects.png';
import barsIcon from './assets/bars.svg';
import dropIcon from './assets/drop.svg';
import { informationModule } from './information-module';

const createBarsIcon = () => {
  const myBarsIcon = new Image();
  myBarsIcon.src = barsIcon;
  myBarsIcon.classList.add('barsIcon');
  informationModule.grabElement('navbar').appendChild(myBarsIcon);
};

const createProjectTitle = () => {
  const projectTitle = document.createElement('h1');
  projectTitle.textContent = "Organize Your Todo's ";
  projectTitle.classList.add('projectTitle');
  informationModule.grabElement('navbar').appendChild(projectTitle);
};

const createProjectIcon = () => {
  const myProjectIcon = new Image();
  myProjectIcon.src = projectIcon;
  myProjectIcon.classList.add('projectIcon');
  informationModule
    .grabElement('projectsBar')
    .insertBefore(
      myProjectIcon,
      informationModule.grabElement('projectHeader')
    );
};

const createDropIcon = () => {
  const myDropIcon = new Image();
  myDropIcon.src = dropIcon;
  myDropIcon.classList.add('dropIcon');
  informationModule.grabElement('projectsBar').appendChild(myDropIcon);
};

const createAddTodoButton = () => {
  const addTodoButton = document.createElement('button');
  addTodoButton.classList.add('addTodo');
  addTodoButton.textContent = 'Create todo';
  informationModule.grabElement('sideNav').appendChild(addTodoButton);
};

const createBasicDomDisplayElements = () => {
  createBarsIcon();
  createProjectTitle();
  createProjectIcon();
  createDropIcon();
  createAddTodoButton();
};

export { createBasicDomDisplayElements };

import { controllerModule } from './controller-module';
import { informationModule } from './information-module';
import { displayTodo, displayTodayTodo } from './todoUI';
import projectIcon from './assets/projects.png';
import barsIcon from './assets/bars.svg';
import dropIcon from './assets/drop.svg';
import deleteIcon from './assets/delete.svg';
export { displayModule };

const displayModule = (() => {
  // Creating dom elements-referances - App module will apply listeners to these elements

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

  createBasicDomDisplayElements();

  const emptyDisplay = element => {
    while (element.lastElementChild) {
      element.removeChild(element.lastElementChild);
    }
  };

  // Functions used around the build to smooth-out the U.I.

  const resetAnimation = () => {
    informationModule
      .grabElement('displayInfo')
      .classList.remove('displayInfoEmerge');
    setTimeout(() => {
      informationModule
        .grabElement('displayInfo')
        .classList.add('displayInfoEmerge');
    }, 1);
  };

  const dropIconToggle = () => {
    if (
      informationModule
        .grabElement('dropIcon')
        .classList.contains('rotateDropIcon')
    ) {
      informationModule
        .grabElement('dropIcon')
        .classList.remove('rotateDropIcon');
      document
        .querySelector('.projectsDisplay')
        .classList.remove('projectsDisplayToggle');
    } else {
      informationModule.grabElement('dropIcon').classList.add('rotateDropIcon');
      document
        .querySelector('.projectsDisplay')
        .classList.add('projectsDisplayToggle');
    }
  };

  const clearToDoModal = () => {
    informationModule.grabElement('toDoName').value = '';
    informationModule.grabElement('toDoDate').value = '';
    informationModule.grabElement('toDoText').value = '';
    informationModule.grabElement('prioritySelect').value = '';
  };

  const clearProjectModal = () => {
    informationModule.grabElement('projectName').value = '';
  };

  const toggleSideNav = () => {
    if (
      informationModule.grabElement('sideNav').classList.contains('sidenavHide')
    ) {
      informationModule.grabElement('sideNav').classList.remove('sidenavHide');
    } else {
      informationModule.grabElement('sideNav').classList.add('sidenavHide');
    }
  };

  // Updating the Project display of the .MainContainer with each projects created

  const projectMainDisplay = () => {
    const projectHolder = document.createElement('div');
    projectHolder.classList.add('projectsHolder');
    informationModule.grabElement('displayInfo').appendChild(projectHolder);
    resetAnimation();
  };

  // Creating a button to add more projects

  const displayProjectButton = () => {
    const addProjectButton = document.createElement('button');
    addProjectButton.classList.add('addProject');
    addProjectButton.textContent = 'CREATE PROJECT';
    informationModule.grabElement('displayInfo').appendChild(addProjectButton);
  };

  // Pulling together previous functions

  const headerDisplay = () => {
    informationModule
      .grabElement('displayInfo')
      .classList.add('displayInfoEmerge');
    emptyDisplay(informationModule.grabElement('displayInfo'));
    displayProjectButton();
    projectMainDisplay();
  };

  const createToDoDisplay = function () {
    resetAnimation();
    informationModule.projectsLibrary.forEach(displayTodo, this);
  };

  const createTodayDisplay = function () {
    resetAnimation();
    emptyDisplay(informationModule.grabElement('displayInfo'));
    informationModule.projectsLibrary.forEach(displayTodayTodo, this);
  };

  // Populating sideNav with all project created;

  const updateProjectsSideNav = () => {
    emptyDisplay(informationModule.grabElement('projectsDisplay'));
    informationModule.projectsLibrary.forEach(project => {
      const temp = document.createElement('li');
      temp.addEventListener('click', createToDoDisplay);
      temp.textContent = project.title;
      informationModule.grabElement('projectsDisplay').appendChild(temp);
    });
  };

  // Pupulating select element with references to all projects created;

  const updateSelectOptions = () => {
    emptyDisplay(informationModule.grabElement('projectSelect'));
    for (let i = 0; i < informationModule.projectsLibrary.length; i++) {
      const option = document.createElement('option');
      option.textContent = informationModule.projectsLibrary[i].title;
      option.value = informationModule.projectsLibrary[i].title;
      informationModule.grabElement('projectSelect').appendChild(option);
    }
  };

  // Updating main container with names of all project's created and a way to remove each project

  const updateProjectsMainDisplay = () => {
    emptyDisplay(informationModule.grabElement('projectsHolder'));
    informationModule.projectsLibrary.forEach(project => {
      const temp = document.createElement('div');
      temp.textContent = project.title;
      temp.classList.add('projectSheet');
      informationModule.grabElement('projectsHolder').appendChild(temp);

      const deleteProject = new Image();
      deleteProject.src = deleteIcon;
      deleteProject.classList.add(`${temp.textContent.replace(/\s/g, '')}`);
      temp.appendChild(deleteProject);

      deleteProject.addEventListener('click', e => {
        const check = e.target.classList.value;

        for (let i = 0; i < informationModule.projectsLibrary.length; i++) {
          if (
            informationModule.projectsLibrary[i].title.replace(/\s/g, '') ===
            check
          ) {
            const index = informationModule.projectsLibrary.indexOf(
              informationModule.projectsLibrary[i]
            );
            informationModule.projectsLibrary.splice(index, 1);
          }
        }
        informationModule.grabElement('projectsHolder').removeChild(temp);
        updateProjectsSideNav();
        controllerModule.updateLocalStorage();
      });
    });
  };

  return {
    headerDisplay,
    updateProjectsSideNav,
    projectMainDisplay,
    updateProjectsMainDisplay,
    updateSelectOptions,
    clearToDoModal,
    toggleSideNav,
    dropIconToggle,
    createTodayDisplay,
    resetAnimation,
    clearProjectModal,
    emptyDisplay,
  };
})();

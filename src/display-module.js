import { controllerModule } from './controller-module';
import { informationModule } from './information-module';
import markIcon from './assets/mark.png';
import projectIcon from './assets/projects.png';
import quillIcon from './assets/quill-pen.png';
import { format, isSameDay, parseISO } from 'date-fns';
import { todoUImodule } from './todoUI';
import barsIcon from './assets/bars.svg';
import dropIcon from './assets/drop.svg';
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

  const emptyDisplay = (element) => {
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

  // Each time one of the referenced Projects from the sideNav is clicked; we want to be able to display all Todos
  // of said Project , inside the main container

  // Functions used inside each todo-displayed in the main container to add functionality to each todo

  const dTodo = function () {
    resetAnimation();
    informationModule.projectsLibrary.forEach(todoUImodule, this);
  };

  // Main Todo Display logic;

  const displayTodoList = (e) => {
    resetAnimation();
    informationModule.projectsLibrary.forEach((project) => {
      if (project.title === e.target.textContent) {
        emptyDisplay(informationModule.grabElement('displayInfo'));

        for (let i = 0; i < project.todoLibrary.length; i++) {
          const todoContainer = document.createElement('div');
          todoContainer.classList.add('todoView');

          const todoHeader = document.createElement('h2');
          const todoDate = document.createElement('h2');

          todoHeader.classList.add('todoHeader');
          todoDate.classList.add('todoDate');

          todoContainer.style.borderLeftColor = assignPriorityColor(
            project.todoLibrary[i].priority
          );

          todoHeader.textContent = project.todoLibrary[i].toDoTitle;
          todoDate.textContent = format(
            new Date(project.todoLibrary[i].date),
            'MM/dd/yyyy'
          );

          const imageContainer = document.createElement('div');
          imageContainer.classList.add('imageContainer');

          const myExpandIcon = new Image();
          myExpandIcon.src = expandIcon;
          imageContainer.appendChild(myExpandIcon);

          const myEditIcon = new Image();
          myEditIcon.src = editIcon;
          myEditIcon.classList.add('editIcon');
          imageContainer.appendChild(myEditIcon);

          const myPriorityIcon = new Image();
          myPriorityIcon.src = priorityIcon;
          imageContainer.appendChild(myPriorityIcon);

          const myDeleteIcon = new Image();
          myDeleteIcon.classList.add('deleteIcon');
          myDeleteIcon.src = deleteIcon;

          imageContainer.appendChild(myDeleteIcon);

          todoContainer.appendChild(todoHeader);
          todoContainer.appendChild(todoDate);
          todoContainer.appendChild(imageContainer);

          informationModule
            .grabElement('displayInfo')
            .appendChild(todoContainer);

          // Add event listeners to images

          myExpandIcon.addEventListener('click', () => {
            expandTodo(todoContainer, project.todoLibrary[i].description);
          });

          myPriorityIcon.addEventListener('click', () => {
            project.todoLibrary[i].priority = changePriority(
              project.todoLibrary[i].priority
            );
            todoContainer.style.borderLeftColor = assignPriorityColor(
              project.todoLibrary[i].priority
            );
          });

          myEditIcon.addEventListener('click', () => {
            replaceEditIcon(imageContainer, myEditIcon, myPriorityIcon);
            editTodo(todoContainer);
            document
              .querySelector('.saveIcon')
              .addEventListener('click', () => {
                saveTodo(
                  todoContainer,
                  project.todoLibrary[i].toDoTitle,
                  project.todoLibrary[i].date
                );
                replaceSaveIcon(imageContainer, myEditIcon, myPriorityIcon);
                project.todoLibrary[i].toDoTitle =
                  todoContainer.querySelector('.todoHeader').textContent;

                project.todoLibrary[i].date = format(
                  new Date(
                    todoContainer.querySelector('.todoDate').textContent
                  ),
                  'yyyy-MM-dd'
                );
                controllerModule.updateLocalStorage();
              });
          });

          myDeleteIcon.addEventListener('click', () => {
            const check =
              todoContainer.querySelector('.todoHeader').textContent;

            for (let i = 0; i < project.todoLibrary.length; i++) {
              if (project.todoLibrary[i].toDoTitle === check) {
                const index = project.todoLibrary.indexOf(
                  project.todoLibrary[i]
                );
                project.todoLibrary.splice(index, 1);
                informationModule
                  .grabElement('displayInfo')
                  .removeChild(todoContainer);
                controllerModule.updateLocalStorage();
              }
            }
          });
        }
      }
    });
  };

  // Creating a header that once clicked searches for all todo's with due-day of today

  const createTodayDisplay = () => {
    resetAnimation();
    emptyDisplay(informationModule.grabElement('displayInfo'));
    for (let i = 0; i < informationModule.projectsLibrary.length; i++) {
      for (
        let y = 0;
        y < informationModule.projectsLibrary[i].todoLibrary.length;
        y++
      ) {
        if (
          isSameDay(
            parseISO(informationModule.projectsLibrary[i].todoLibrary[y].date),
            new Date()
          )
        ) {
          const todoContainer = document.createElement('div');
          todoContainer.classList.add('todoView');
          todoContainer.dataset.index = i;

          const todoHeader = document.createElement('h2');
          const todoDate = document.createElement('h2');

          todoHeader.classList.add('todoHeader');
          todoDate.classList.add('todoDate');

          todoContainer.style.borderLeftColor = assignPriorityColor(
            informationModule.projectsLibrary[i].todoLibrary[y].priority
          );

          todoHeader.textContent =
            informationModule.projectsLibrary[i].todoLibrary[y].toDoTitle;
          todoDate.textContent = format(
            new Date(informationModule.projectsLibrary[i].todoLibrary[y].date),
            'MM/dd/yyyy'
          );

          const imageContainer = document.createElement('div');
          imageContainer.classList.add('imageContainer');

          const myExpandIcon = new Image();
          myExpandIcon.src = expandIcon;
          imageContainer.appendChild(myExpandIcon);

          const myEditIcon = new Image();
          myEditIcon.src = editIcon;
          myEditIcon.classList.add('editIcon');
          imageContainer.appendChild(myEditIcon);

          const myPriorityIcon = new Image();
          myPriorityIcon.src = priorityIcon;
          imageContainer.appendChild(myPriorityIcon);

          const myDeleteIcon = new Image();
          myDeleteIcon.classList.add('deleteIcon');
          myDeleteIcon.src = deleteIcon;
          myDeleteIcon.dataset.index =
            informationModule.projectsLibrary[i].todoLibrary[y].index;
          imageContainer.appendChild(myDeleteIcon);

          todoContainer.appendChild(todoHeader);
          todoContainer.appendChild(todoDate);
          todoContainer.appendChild(imageContainer);

          informationModule
            .grabElement('displayInfo')
            .appendChild(todoContainer);
        }
      }
    }
  };

  // Populating sideNav with all project created;

  const updateProjectsSideNav = () => {
    emptyDisplay(informationModule.grabElement('projectsDisplay'));
    informationModule.projectsLibrary.forEach((project) => {
      const temp = document.createElement('li');
      temp.addEventListener('click', dTodo);
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
    informationModule.projectsLibrary.forEach((project) => {
      const temp = document.createElement('div');
      temp.textContent = project.title;
      temp.classList.add('projectSheet');
      informationModule.grabElement('projectsHolder').appendChild(temp);

      const deleteProject = new Image();
      deleteProject.src = deleteIcon;
      deleteProject.classList.add(`${temp.textContent.replace(/\s/g, '')}`);
      temp.appendChild(deleteProject);

      deleteProject.addEventListener('click', (e) => {
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
  };
})();

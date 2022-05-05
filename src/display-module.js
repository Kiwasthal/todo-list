import { controllerModule } from './controller-module';
import { informationModule } from './information-module';
import markIcon from './assets/mark.png';
import projectIcon from './assets/projects.png';
import expandIcon from './assets/expand.svg';
import editIcon from './assets/edit.svg';
import priorityIcon from './assets/priority.svg';
import deleteIcon from './assets/delete.svg';
import barsIcon from './assets/bars.svg';
import saveIcon from './assets/save.svg';
import dropIcon from './assets/drop.svg';
import quillIcon from './assets/quill-pen.png';
import { format, isSameDay, parseISO } from 'date-fns';
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

  // A basic function called to empty any container

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

  const assignPriorityColor = (check) => {
    return check === 'High'
      ? '#d72915'
      : check === 'Medium'
      ? '#d0a415'
      : '#1a901a';
  };

  const changePriority = (check) => {
    return check === 'High' ? 'Medium' : check === 'Medium' ? 'Low' : 'High';
  };

  const expandTodo = (element, info) => {
    const todoText = document.createElement('p');
    if (element.classList.contains('expanded')) {
      const remove = element.querySelector('p');
      element.classList.remove('expanded');
      element.removeChild(remove);
      element.style.height = 'auto';
    } else {
      element.style.height = '20vh';
      element.classList.add('expanded');
      todoText.textContent = info;
      todoText.classList.add('todoText');
      element.appendChild(todoText);
    }
  };

  const editTodo = (container) => {
    const todoHeader = container.querySelector('.todoHeader');
    const todoDate = container.querySelector('.todoDate');
    const inputNewHeader = document.createElement('input');
    const inputNewDate = document.createElement('input');
    inputNewHeader.classList.add('newHeader');
    inputNewDate.classList.add('newDate');
    inputNewHeader.type = 'text';
    inputNewHeader.value = todoHeader.textContent;
    inputNewDate.type = 'date';
    inputNewDate.value = todoDate.textContent;
    container.removeChild(todoHeader);
    container.removeChild(todoDate);
    container.appendChild(inputNewHeader);
    container.appendChild(inputNewDate);
    container.classList.add('editing');
  };

  const saveTodo = (container) => {
    container.classList.remove('editing');
    const grabHeader = container.querySelector('.newHeader');
    const grabDate = container.querySelector('.newDate');

    const todoHeader = document.createElement('h2');
    const todoDate = document.createElement('h2');

    todoHeader.classList.add('todoHeader');
    todoDate.classList.add('todoDate');

    todoHeader.textContent = grabHeader.value;

    todoDate.textContent = format(new Date(grabDate.value), 'MM/dd/yyyy');

    container.removeChild(grabHeader);
    container.removeChild(grabDate);
    container.appendChild(todoHeader);
    container.appendChild(todoDate);
  };

  const replaceEditIcon = (container, icon, reference) => {
    container.removeChild(icon);
    const mySaveIcon = new Image();
    mySaveIcon.src = saveIcon;
    mySaveIcon.classList.add('saveIcon');
    container.insertBefore(mySaveIcon, reference);
  };

  const replaceSaveIcon = (container, newIcon, reference) => {
    const replace = document.querySelector('.saveIcon');
    container.removeChild(replace);
    container.insertBefore(newIcon, reference);
  };

  const dTodo = function () {
    resetAnimation();
    informationModule.projectsLibrary.forEach(displayTodo, this);
  };

  const createTodoDOM = (project, todo) => {
    const todoContainer = document.createElement('div');
    todoContainer.classList.add('todoView');
    const todoHeader = document.createElement('h2');
    const todoDate = document.createElement('h2');

    todoHeader.classList.add('todoHeader');
    todoDate.classList.add('todoDate');

    todoContainer.style.borderLeftColor = assignPriorityColor(todo.priority);

    todoHeader.textContent = project.todoLibrary[todo].toDoTitle;
    todoDate.textContent = format(
      new Date(project.todoLibrary[todo].date),
      'MM/dd/yyyy'
    );

    const imageContainer = document.createElement('div');
    imageContainer.classList.add('imageContainer');

    todoContainer.appendChild(todoHeader);
    todoContainer.appendChild(todoDate);
    todoContainer.appendChild(imageContainer);

    informationModule.grabElement('displayInfo').appendChild(todoContainer);
  };

  const displayTodo = function (project) {
    if (project.title === this.textContent) {
      emptyDisplay(informationModule.grabElement('displayInfo'));
      for (let todo in project.todoLibrary) {
        createTodoDOM(project, todo);
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
      }
    }
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

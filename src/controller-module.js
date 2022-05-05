import { displayModule } from './display-module';
import { projectFactory, todoFactory } from './factories';
import { informationModule } from './information-module';
import { format, isPast, parseISO, getMonth, getDay } from 'date-fns';
import { el } from 'date-fns/locale';
export { controllerModule };

const controllerModule = (() => {
  // Initializing confirmation passed around the module for validation purpuses;

  let confirmation = true;

  // Method created to add todo's to project libraries;

  const pushTodoToLibrary = {
    addtoLibrary(todo) {
      this.todoLibrary.push(todo);
    },
  };

  // Local storage, since controller Module is an IIFE will run when the page is loaded getting the local data;
  // Also a check is implemented so the project does not crash if there is no local data;

  if (localStorage.getItem('mylocalStore') === null) {
  } else {
    informationModule.projectsLibrary = JSON.parse(
      localStorage.getItem('mylocalStore')
    );
    informationModule.projectsLibrary.forEach((project) => {
      project.insertTodo = pushTodoToLibrary.addtoLibrary;
    });
    displayModule.updateProjectsSideNav();
  }

  // Every time we update the main array from the information module, updateLocal is called so we can save the User's data;

  const updateLocalStorage = () => {
    localStorage.setItem(
      'mylocalStore',
      JSON.stringify(informationModule.projectsLibrary)
    );
    const mylocalData = JSON.parse(localStorage.getItem('mylocalStore'));
  };

  // A method for pushing projects to main array from info-module

  const addToProjectsLibary = (project) => {
    informationModule.projectsLibrary.push(project);
  };

  // Module functions to get data from HTML dialogues for different objects;

  const createProject = () => {
    confirmation = true;

    if (informationModule.grabElement('projectName').value === '') {
      return alert('Please insert a name for the project');
    }

    const temp = informationModule.grabElement('projectName').value;

    for (let i = 0; i < informationModule.projectsLibrary.length; i++) {
      if (informationModule.projectsLibrary[i].title === temp) {
        alert('Your projects should have different names');
        confirmation = false;
        return;
      }
    }

    if (confirmation) {
      const project = projectFactory(temp);
      addToProjectsLibary(project);
      project.insertTodo = pushTodoToLibrary.addtoLibrary;
      informationModule.grabElement('modal').close();
      informationModule.grabElement('modal').style.display = '';
      displayModule.clearProjectModal();
      updateLocalStorage();
    }
  };

  const createToDo = () => {
    confirmation = true;

    const todoTitle = informationModule.grabElement('toDoName').value;
    const todoDate = informationModule.grabElement('toDoDate').value;
    const todoText = informationModule.grabElement('toDoText').value;
    const todoPriority = informationModule.grabElement('prioritySelect').value;

    if (todoDate === '') {
      confirmation = false;
      alert('Please select a date');
      return;
    }

    if (todoTitle === '') {
      confirmation = false;
      alert('Please select a name for your Todo');
      return;
    }

    if (
      isPast(parseISO(todoDate)) &&
      getDay(new Date()) !== getDay(parseISO(todoDate))
    ) {
      confirmation = false;
      alert('Please insert a future date for your todos');
      return;
    }

    const todo = todoFactory(todoTitle, todoDate, todoText, todoPriority);
    for (let i = 0; i < informationModule.projectsLibrary.length; i++) {
      for (
        let y = 0;
        y < informationModule.projectsLibrary[i].todoLibrary.length;
        y++
      ) {
        if (
          informationModule.projectsLibrary[i].todoLibrary[y].toDoTitle ===
          todoTitle
        ) {
          alert('Your todos should have different names');
          confirmation = false;
          return;
        } else {
          confirmation = true;
        }
      }
    }

    if (confirmation) {
      for (let i = 0; i < informationModule.projectsLibrary.length; i++) {
        if (
          informationModule.projectsLibrary[i].title ===
          informationModule.grabElement('projectSelect').value
        ) {
          informationModule.projectsLibrary[i].insertTodo(todo);
          updateLocalStorage();
          confirmation = true;
        }
      }
    }
  };

  // Create functions passed as event listener callbacks in APP module;

  const finalizeProject = () => {
    createProject();
    displayModule.updateProjectsSideNav();
    displayModule.updateProjectsMainDisplay();
  };

  const finalizeTodo = () => {
    createToDo();
    if (confirmation) {
      displayModule.clearToDoModal();
      informationModule.grabElement('toDoModal').close();
    }
  };

  const openProjectModal = () => {
    informationModule.grabElement('modal').showModal();
    informationModule.grabElement('modal').style.display = 'grid';
    informationModule
      .grabElement('closeModal')
      .addEventListener('click', () => {
        informationModule.grabElement('modal').style.display = '';
        informationModule.grabElement('modal').close();
        displayModule.clearProjectModal();
      });

    informationModule
      .grabElement('createProject')
      .addEventListener('click', finalizeProject);
  };

  const headerControl = () => {
    displayModule.headerDisplay();
    displayModule.projectMainDisplay();
    displayModule.updateProjectsMainDisplay();
    displayModule.resetAnimation();
    informationModule
      .grabElement('addProject')
      .addEventListener('click', openProjectModal);
  };

  const toDoControl = () => {
    informationModule.grabElement('toDoModal').showModal();
    displayModule.updateSelectOptions();
    informationModule.grabElement('closeToDo').addEventListener('click', () => {
      displayModule.clearToDoModal();
      informationModule.grabElement('toDoModal').close();
    });
    informationModule
      .grabElement('createToDo')
      .addEventListener('click', finalizeTodo);
  };

  return {
    createProject,
    headerControl,
    toDoControl,
    updateLocalStorage,
  };
})();

import expandIcon from './assets/expand.svg';
import editIcon from './assets/edit.svg';
import priorityIcon from './assets/priority.svg';
import deleteIcon from './assets/delete.svg';
import { displayModule } from './display-module';
import { informationModule } from './information-module';
import {
  assignPriorityColor,
  changePriority,
  expandTodo,
  editTodo,
  replaceEditIcon,
  replaceSaveIcon,
  saveTodo,
} from './todoClickFunctions';
import { format, isSameDay, parseISO } from 'date-fns';
import { controllerModule } from './controller-module';

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

  todoContainer.appendChild(todoHeader);
  todoContainer.appendChild(todoDate);

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

  myExpandIcon.addEventListener('click', () => {
    expandTodo(todoContainer, project.todoLibrary[todo].description);
  });
  myPriorityIcon.addEventListener('click', () => {
    project.todoLibrary[todo].priority = changePriority(
      project.todoLibrary[todo].priority
    );
    todoContainer.style.borderLeftColor = assignPriorityColor(
      project.todoLibrary[todo].priority
    );
  });
  myEditIcon.addEventListener('click', () => {
    replaceEditIcon(imageContainer, myEditIcon, myPriorityIcon);
    editTodo(todoContainer);
    document.querySelector('.saveIcon').addEventListener('click', () => {
      saveTodo(
        todoContainer,
        project.todoLibrary[todo].toDoTitle,
        project.todoLibrary[todo].date
      );
      replaceSaveIcon(imageContainer, myEditIcon, myPriorityIcon);
      project.todoLibrary[todo].toDoTitle =
        todoContainer.querySelector('.todoHeader').textContent;

      project.todoLibrary[todo].date = format(
        new Date(todoContainer.querySelector('.todoDate').textContent),
        'yyyy-MM-dd'
      );
      controllerModule.updateLocalStorage();
    });
  });
  myDeleteIcon.addEventListener('click', () => {
    const check = todoContainer.querySelector('.todoHeader').textContent;

    for (let i = 0; i < project.todoLibrary.length; i++) {
      if (project.todoLibrary[i].toDoTitle === check) {
        const index = project.todoLibrary.indexOf(project.todoLibrary[i]);
        project.todoLibrary.splice(index, 1);
        informationModule.grabElement('displayInfo').removeChild(todoContainer);
        controllerModule.updateLocalStorage();
      }
    }
  });
  todoContainer.appendChild(imageContainer);
  informationModule.grabElement('displayInfo').appendChild(todoContainer);
};

const displayTodo = function (project) {
  if (project.title === this.textContent) {
    displayModule.emptyDisplay(informationModule.grabElement('displayInfo'));
    for (let todo in project.todoLibrary) {
      createTodoDOM(project, todo);
    }
  }
};

const displayTodayTodo = function (project) {
  for (let todo in project.todoLibrary) {
    if (isSameDay(parseISO(project.todoLibrary[todo].date), new Date())) {
      createTodoDOM(project, todo);
    }
  }
};

export { displayTodo, displayTodayTodo };

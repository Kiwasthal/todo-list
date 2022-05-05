import expandIcon from './assets/expand.svg';
import editIcon from './assets/edit.svg';
import priorityIcon from './assets/priority.svg';
import deleteIcon from './assets/delete.svg';
import saveIcon from './assets/save.svg';

const todoUImodule = () => {
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

    createDOMimages(todoContainer);
    informationModule.grabElement('displayInfo').appendChild(todoContainer);
  };

  const createDOMimages = (father) => {
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
    father.appendChild(imageContainer);
  };

  const displayTodo = function (project) {
    if (project.title === this.textContent) {
      emptyDisplay(informationModule.grabElement('displayInfo'));
      for (let todo in project.todoLibrary) {
        createTodoDOM(project, todo);
      }
    }
  };
  return { displayTodo };
};

export { todoUImodule };

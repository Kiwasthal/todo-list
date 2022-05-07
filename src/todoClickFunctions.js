import saveIcon from './assets/save.svg';
import { format } from 'date-fns';

const assignPriorityColor = check => {
  return check === 'High'
    ? '#d72915'
    : check === 'Medium'
    ? '#d0a415'
    : '#1a901a';
};
const changePriority = check => {
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

const editTodo = container => {
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

const saveTodo = container => {
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

export {
  assignPriorityColor,
  changePriority,
  expandTodo,
  editTodo,
  replaceEditIcon,
  replaceSaveIcon,
  saveTodo,
};

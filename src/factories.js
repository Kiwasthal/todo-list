export { todoFactory };
export { projectFactory };

const todoFactory = (toDoTitle, date, description, priority) => {
  return { toDoTitle, date, description, priority };
};

const projectFactory = (projectTitle) => {
  const title = projectTitle;
  const todoLibrary = [];

  return { todoLibrary, title };
};

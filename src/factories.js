export { todoFactory };
export { projectFactory };

const todoFactory = (toDoTitle , date , description , priority ) => {
   return {toDoTitle , date , description , priority}; 
};

const projectFactory = (projectTitle) => {
   let title = projectTitle;
   let todoLibrary = [];

   return {  todoLibrary , title };
}
export {todoFactory};
export {projectFactory};

const todoFactory = (toDoTitle , date , description , priority ) => {
   return {toDoTitle , date , description , priority}; 
};

const projectFactory = (projectTitle) => {
   title = projectTitle;
   todoLibrary = [];

   return {  todoLibrary , title };
}
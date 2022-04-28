export {informationModule};

const informationModule = (() => {

    let projectsLibrary = [];

    let grabElement = (item) => {

    switch(item) {
        case 'navbar':
            return document.querySelector('.navbar');
        case 'sideNav':
            return document.querySelector('.sidenav');
        case 'projectIcon':
            return document.querySelector('.projectIcon');
        case 'toDoButton':
            return document.querySelector('.addTodo');
        case 'mainContainer':
            return document.querySelector('.mainContainer');
        case 'projectHeader':
            return document.querySelector('.projectHeader');
        case 'projectsBar':
            return document.querySelector('.projectsBar');
        case 'addProject':
            return document.querySelector('.addProject');
        case 'displayInfo':
            return document.querySelector('.displayInfo');
        case 'projectsDisplay':
            return document.querySelector('.projectsDisplay');
        case 'modal':
            return document.querySelector('.modal');
        case 'closeModal':
            return document.querySelector('.closeModal');
        case 'createProject':
            return document.querySelector('.createProject');
        case 'projectName':
            return document.querySelector('#projectName');
        case 'toDoName':
            return document.querySelector('#toDoName');
        case 'toDoDate':
            return document.querySelector('#toDoDate');
        case 'toDoText':
            return document.querySelector('.todoText')
        case 'projectsHolder':
            return document.querySelector('.projectsHolder');
        case 'toDoModal':
            return document.querySelector('.toDoModal');
        case 'projectSelect':
            return document.querySelector('.projectSelect');
        case 'closeToDo':
            return document.querySelector('.closeToDo');
        case 'createToDo':
            return document.querySelector('.createToDo');
        case 'prioritySelect':
            return document.querySelector('.prioritySelect');
        case 'barsIcon':
            return document.querySelector('.barsIcon');
        case 'dropIcon':
            return document.querySelector('.dropIcon');
        case 'today':
            return document.querySelector('.today');
    }};

    return {
        projectsLibrary,
        grabElement,
    };

})();
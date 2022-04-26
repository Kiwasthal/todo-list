export {informationModule};

const informationModule = (() => {

    let projectsLibrary = [];

    let grabElement = (item) => {

    switch(item) {
        case 'sideNav':
            return document.querySelector('.sidenav');
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
        case 'projectsHolder':
            return document.querySelector('.projectsHolder');
        case 'toDoModal':
            return document.querySelector('.toDoModal');
        case 'projectSelect':
            return document.querySelector('.projectSelect');
    }};

    return {
        projectsLibrary,
        grabElement,
    };

})();
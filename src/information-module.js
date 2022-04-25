export {informationModule};

const informationModule = (() => {

    let grabElement = (item) => {
        
    switch(item) {
        case 'sideNav':
            return document.querySelector('.sidenav');
        case 'toDoButton':
            return document.querySelector('.addTodo');
        case 'mainContainer':
            return document.querySelector('.mainContainer');
        case 'projectHeader':
            return document.querySelector('.projectHeader')
    }};

    return {
        grabElement,
    };

})();
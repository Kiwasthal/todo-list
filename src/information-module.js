export {informationModule};

const informationModule = (() => {

    let grabToDoButton = () => {
        return document.querySelector('.addTodo');
    }

    let grabSideNav = () => {
        return document.querySelector('.sidenav')
    }

    return {
        grabSideNav,
        grabToDoButton,
        };

})();
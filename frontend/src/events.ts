const preventRightMenu = () => {
    window.oncontextmenu = function(event) {
        event.preventDefault();
        event.stopPropagation();
        return false;
    };
};

export const initializeEvents = (setDirectionSpeed: (speed: number) => void, onGameStart: () => void) => {
    const leftControl = document.querySelector('.control.left');
    const rightControl = document.querySelector('.control.right');
    const startButton = document.querySelector('#start-button');

    const onLeft = () => setDirectionSpeed(-.8);
    const onRight = () => setDirectionSpeed(.8);
    const onRelease = () => setDirectionSpeed(0);

    document.addEventListener('keydown', evt => {
        switch (evt.keyCode) {
            case 37:
                return onLeft();
            case 39:
                return onRight();
        }
    });

    document.addEventListener('keyup', evt => {
        onRelease();
    });

    leftControl.addEventListener('touchstart', onLeft);
    leftControl.addEventListener('touchend', onRelease);
    rightControl.addEventListener('touchstart', onRight);
    rightControl.addEventListener('touchend', onRelease);

    leftControl.addEventListener('mousedown', onLeft);
    leftControl.addEventListener('mouseup', onRelease);
    rightControl.addEventListener('mousedown', onRight);
    rightControl.addEventListener('mouseup', onRelease);

    preventRightMenu();

    startButton.addEventListener('click', onGameStart);
};

export const onResize = (cb: () => void) => {
    window.addEventListener('resize', cb);
};
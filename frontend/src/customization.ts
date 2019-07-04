import * as Koji from 'koji-tools';

export const customize = () => {
    const root = document.documentElement;
    const {
        backgroundColor,
        mainColor,
        textColor,
        cubeMainColor,
        cubeSecondaryColor,
    } = Koji.config.colors;
    const { perspective } = Koji.config.settings;
    const perspectiveToSet = -Math.min(Math.max(parseInt(perspective), 0), 90) + 'deg';

    root.style.setProperty('--background-color', backgroundColor);
    root.style.setProperty('--main-color', mainColor);
    root.style.setProperty('--text-color', textColor);
    root.style.setProperty('--cube-main-color', cubeMainColor);
    root.style.setProperty('--cube-secondary-color', cubeSecondaryColor);

    root.style.setProperty('--perspective', perspectiveToSet);
};
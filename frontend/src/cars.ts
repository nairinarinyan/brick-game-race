import { getRandomPosition } from './utils';

export type CarElement = HTMLDivElement;

export interface Car {
    el: CarElement;
    position: number;
    fromLeft: boolean;
}

const createCube = () => {
    const sides = ['front', 'back', 'left', 'bottom', 'right', 'top'];
    const cube = document.createElement('div');
    cube.classList.add('cube');

    sides.forEach(side => {
        const sideEl = document.createElement('figure');
        sideEl.classList.add(side);
        cube.appendChild(sideEl);
    });

    return cube;
};

export const createCar = (container: HTMLElement): CarElement => {
    const cubeTransforms = [[50, 0], [-50, 0], [0, -50], [0, 50], [50, 100], [-50, 100]];
    const tireIndices = [0, 1, 4, 5];
    const carContainer = document.createElement('div');
    carContainer.classList.add('car-container');
    container.appendChild(carContainer);

    cubeTransforms.forEach(([x, z], i) => {
        const cube = createCube();
        const isTire = ~tireIndices.indexOf(i);
        isTire && cube.classList.add('tire');
        cube.style.transform = `translateX(${x}px) translateZ(${z}px)`;
        carContainer.appendChild(cube);
    });

    return carContainer;
};

export const createCars = (container: HTMLElement, n = 4, cars: Car[] = []): Car[] => {
    if (!n) return cars;

    const el = createCar(container);
    const car = { el, position: 0, fromLeft: getRandomPosition() };

    return createCars(container, n - 1, cars.concat(car));
};
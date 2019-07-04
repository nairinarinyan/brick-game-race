export interface Config {
    blockSize: number;
    carWidth: number;
    carHeight: number;
    quarter: number;
    distanceBetween: number;
    initialSpeed: number;
    acceleration: number;
}


export const configure = (container: HTMLElement): Config => {
    const boundingBox = container.getBoundingClientRect();

    const blockSize = 50;
    const carWidth = 3 * blockSize;
    const carHeight = 4 * blockSize;
    const quarter = boundingBox.width / 4;
    const distanceBetween = 800;
    const initialSpeed = .5;
    const acceleration = .0002;

    return { blockSize, carWidth, carHeight, quarter, distanceBetween, initialSpeed, acceleration };
};
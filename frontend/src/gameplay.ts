import { getRandomPosition, checkCollision } from './utils';
import { GameState, State } from './game-state';
import { Car, CarElement } from './cars';

export const moveCars = (cars: Car[], carWidth: number, carHeight: number, delta: number, quarter: number, distanceBetween: number, gameState: GameState) => {
    if (gameState.state === State.PLAYING) {
        gameState.accelerate();
    }

    const speed = gameState.getSpeed();
    const currentPosition = gameState.getRacerPosition();

    cars.forEach((car, i) => {
        let { el, position, fromLeft } = car;
        car.position = position ? position += speed * delta : -distanceBetween * (i + 1);

        if (position >= distanceBetween) {
            car.position = -distanceBetween * (cars.length - 1);
            car.fromLeft = getRandomPosition();
        }

        if (position >= -carHeight && position <= carHeight) {
            const isHit = checkCollision(carWidth, currentPosition, quarter, fromLeft);
            if (isHit) {
                gameState.lose();
            }
        }

        el.style.transform = `translateZ(${position}px) translate(${fromLeft ? -quarter : quarter}px)`;
    });
};

export const controlCar = (car: CarElement, delta: number, quarter: number, gameState: GameState) => {
    const currentPosition = gameState.getRacerPosition();
    const position = Math.min(Math.max(-quarter, currentPosition + gameState.getDirectionSpeed() * delta), quarter);

    gameState.setRacerPosition(position);

    car.style.transform = `translate(${position}px)`;
};
import { initializeEvents, onResize } from './events';
import { createCars, createCar, Car, CarElement } from './cars';
import { GameState, State } from './game-state';
import { moveCars, controlCar } from './gameplay';
import { configure, Config } from './config';

const createRender = (config: Config, gameState: GameState, cars: Car[], racingCar: CarElement) => {
    const { carWidth, carHeight, quarter, distanceBetween } = config;

    const render = (lastTimeStamp: number) => (timeStamp: number) => {
        requestAnimationFrame(render(timeStamp));

        const delta = Math.min(timeStamp - lastTimeStamp, config.maxFrameDuration);

        moveCars(cars, carWidth, carHeight, delta, quarter, distanceBetween, gameState);
        controlCar(racingCar, delta, quarter, gameState);
        gameState.incrementScore();
    };

    return render;
};

const reset = (container: HTMLElement) => {
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }
}

const init = (config: Config, container: HTMLElement) => {
    reset(container);

    const { initialSpeed, acceleration } = config;
    const gameState = new GameState(initialSpeed, acceleration);

    const setDirectionSpeed = gameState.setDirectionSpeed.bind(gameState);
    const startGame = gameState.play.bind(gameState);

    initializeEvents(setDirectionSpeed, startGame);
    wireUpUI(gameState);

    const cars = createCars(container, config.blockSize);
    const racingCar = createCar(container, config.blockSize);

    const render = createRender(config, gameState, cars, racingCar);

    render(window.performance.now() - 32)(window.performance.now() - 16);
};

const wireUpUI = (gameState: GameState) => {
    const ui = document.querySelector('.ui');
    const currentScoreEl = document.querySelector('.current-score') as HTMLDivElement;
    const highScoreEl = document.querySelector('.high-score') as HTMLDivElement;

    gameState.subscribe('state', (state: State) => {
        switch (state) {
            case State.STOPPED:
                ui.classList.remove('lost');
                ui.classList.remove('playing');
                ui.classList.add('stopped');
                break;
            case State.PLAYING:
                ui.classList.remove('lost');
                ui.classList.remove('stopped');
                ui.classList.add('playing');
                break;
            case State.LOST:
                ui.classList.remove('playing');
                ui.classList.remove('stopped');
                ui.classList.add('lost');
                break;
            default:
                break;
        }
    });

    gameState.subscribe('score', scores => {
        const [currentScore, highScore] = scores as number[];
        currentScoreEl.innerText = currentScore.toString();
        highScoreEl.innerText = highScore.toString();
    });
};

const container = document.querySelector('.container') as HTMLElement;
const startGame = () => init(configure(container), container);

startGame();
onResize(startGame);
export const getRandomPosition = () => !Math.round(Math.random());

export const checkCollision = (carWidth: number, position: number, quarter: Number, fromLeft: Boolean): boolean => { 
    return fromLeft ? position - carWidth < -quarter : position + carWidth > quarter;
};

export const throttle = (fn: (...args: any) => void, interval = 100) => {
    let lastCallTime = 0;

    return (...args: any[]) => {
        if (Date.now() - lastCallTime > interval) {
            fn(...args);
            lastCallTime = Date.now();
        }
    }
};
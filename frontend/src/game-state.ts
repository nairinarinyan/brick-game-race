import { throttle } from './utils';

export enum State {
    STOPPED = 'stopped',
    PLAYING = 'playing',
    LOST = 'lost',
}

type SubscriptionTopic = 'score' | 'state';
type SubscriptionCallback = (payload: State | number[]) => void;

interface Subscriber {
    topic: SubscriptionTopic;
    callback: SubscriptionCallback;
}

export class GameState {
    private racerPosition = 0;
    private directionSpeed = 0;
    private initialSpeed: number;
    private initialAcceleration: number
    private startedTime: number
    currentScore = 0;
    highScore: number

    state = State.STOPPED;

    private subscribers: Subscriber[] = [];
    private updateScoresThrottled: () => void;
    updateScoreSubscribers: (score: number) => void;

    constructor(
        private speed: number,
        private acceleration: number,
    ) {
        this.initialSpeed = speed;
        this.initialAcceleration = acceleration;
        this.highScore = parseInt(localStorage.getItem('highscore')) || 0;

        this.updateScoresThrottled = throttle(() => this.updateScores(), 500);
    }

    play() {
        this.state = State.PLAYING;
        this.emitChange('state', this.state);
        this.startedTime = Date.now();
    }

    lose() {
        const isNotPlaying = this.state !== State.PLAYING;
        const tooEarly = Date.now() - this.startedTime < 2000;

        if (isNotPlaying || tooEarly) {
            return;
        }

        this.state = State.LOST;
        this.speed = this.initialSpeed;
        this.acceleration = this.initialAcceleration;
        this.currentScore = 0;

        this.emitChange('state', this.state);
    }

    getSpeed(): number {
        return this.speed;
    }

    accelerate() {
        this.speed += this.acceleration;
    }

    incrementScore() {
        if (this.state !== State.PLAYING) {
            return;
        }

        this.currentScore += this.speed * 10 << 0;
        this.updateScoresThrottled();
    }

    updateScores() {
        if (this.currentScore > this.highScore) {
            this.highScore = this.currentScore;
            localStorage.setItem('highscore', this.highScore.toString());
        }

        this.emitChange('score', [this.currentScore, this.highScore]);
    }

    setRacerPosition(position: number) {
        this.racerPosition = position;
    }

    getRacerPosition(): number {
        return this.racerPosition;
    }

    setDirectionSpeed(speed: number) {
        if (this.state !== State.PLAYING) {
            return;
        }

        this.directionSpeed = speed;
    }

    getDirectionSpeed(): number {
        return this.directionSpeed;
    }

    subscribe(topic: SubscriptionTopic, callback: SubscriptionCallback) {
        this.subscribers.push({
            topic,
            callback
        });

        switch (topic) {
            case 'score':
                return callback([this.currentScore, this.highScore]);
            case 'state':
                return callback(this.state);
            default:
                break;
        }
    }

    emitChange(topic: SubscriptionTopic, payload: State | number[]) {
        this.subscribers
            .filter(sub => sub.topic === topic)
            .forEach(subscriber => {
                subscriber.callback(payload);
            });
    }
};



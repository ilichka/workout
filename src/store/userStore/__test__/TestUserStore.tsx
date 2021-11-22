import { exerciseObject } from '../../../utils/types';
import { action, makeObservable, observable } from 'mobx';

export default class TestUserStore {
    totalTime: number;

    exercisesArray: Array<exerciseObject>;

    constructor() {
        this.exercisesArray = [
            {
                description: '1',
                duration: 20,
                id: 63,
                photo: '1',
                title: '1',
                video: '1',
            },
            {
                description: '2',
                duration: 20,
                id: 63,
                photo: '2',
                title: '2',
                video: '2',
            },
            {
                description: '3',
                duration: 20,
                id: 63,
                photo: '3',
                title: '3',
                video: '3',
            },
            {
                description: '4',
                duration: 20,
                id: 63,
                photo: '4',
                title: '4',
                video: '4',
            },
            {
                description: '5',
                duration: 20,
                id: 63,
                photo: '5',
                title: '5',
                video: '5',
            },
        ];
        this.totalTime = 0;

        makeObservable(this, {
            exercisesArray: observable,
            totalTime: observable,
            updateTotalTime: action,
        });
    }

    updateTotalTime = (time: number): void => {
        this.totalTime += time;
    };
}

import RootStore from '../rootStore/Store';
import { action, makeObservable, observable } from 'mobx';
import { getExercises } from '../../utils/requester/getExercises';
import { exerciseObject, objectInArrayWithExercises } from '../../utils/types';

export default class UserStore {
    rootStore: RootStore;

    totalTime: number;

    exercisesArray: Array<exerciseObject>;

    exercises: Array<objectInArrayWithExercises>;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.exercises = [];
        this.exercisesArray = [];
        this.totalTime = 0;

        makeObservable(this, {
            setExercises: action,
            exercises: observable,
            exercisesArray: observable,
            totalTime: observable,
            updateTotalTime: action,
        });
    }

    updateTotalTime = (time: number): void => {
        this.totalTime += time;
    };

    setExercises = async (): Promise<{ isLoaded: boolean }> => {
        await getExercises().then((res) => {
            this.exercises = res.data.data.questions;
            this.exercisesArray = res.data.data.questions.reduce(
                (acc: Array<exerciseObject>, value: objectInArrayWithExercises) =>
                    acc.concat(value.exercises),
                [],
            );
        });

        return { isLoaded: true };
    };
}

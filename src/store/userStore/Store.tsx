import RootStore from '../rootStore/Store';
import { action, makeObservable, observable } from 'mobx';
import { getExercises } from '../../utils/requester/getExercises';

export default class UserStore {
    rootStore: RootStore;

    currentExercise: number;

    totalTime: number;

    exercisesArray: Array<{
        description: string;
        duration: number;
        id: number;
        photo: string;
        title: string;
        video: string;
    }>;

    exercises: Array<{
        title: string;
        exercises: Array<{
            description: string;
            duration: number;
            id: number;
            photo: string;
            title: string;
            video: string;
        }>;
    }>;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
        this.exercises = [];
        this.currentExercise = 0;
        this.exercisesArray = [];
        this.totalTime = 0;

        makeObservable(this, {
            setExercises: action,
            exercises: observable,
            currentExercise: observable,
            exercisesArray: observable,
            totalTime: observable,
            updateTotalTime: action,
        });
    }

    changeCurrentExercise = (type: string, value?: number) => {
        switch (type) {
            case 'increase':
                this.currentExercise++;
                break;
            case 'decrease':
                this.currentExercise--;
        }
    };

    updateTotalTime = (time: number): void => {
        console.log('aaa');
        this.totalTime += time;
    };

    setExercises = async (): Promise<{ isLoaded: boolean }> => {
        await getExercises().then((res) => {
            this.exercises = res.data.data.questions;
            this.exercisesArray = res.data.data.questions.reduce(
                (
                    acc: Array<object>,
                    value: {
                        title: string;
                        exercises: Array<{
                            description: string;
                            duration: number;
                            id: number;
                            photo: string;
                            title: string;
                            video: string;
                        }>;
                    },
                ) => acc.concat(value.exercises),
                [],
            );
        });

        return { isLoaded: true };
    };
}

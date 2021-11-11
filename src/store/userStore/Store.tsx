import RootStore from '../rootStore/Store';
import { action, makeObservable, observable } from 'mobx';
import { getExercises } from '../../utils/requester/getExercises';

export default class UserStore {
    rootStore: RootStore;

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

        makeObservable(this, {
            setExercises: action,
            exercises: observable,
        });
    }

    setExercises = async (): Promise<{ isLoaded: boolean }> => {
        await getExercises().then((res) => {
            this.exercises = res.data.data.questions;
        });

        return { isLoaded: true };
    };
}

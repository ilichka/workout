import UserStore from '../userStore/Store';
import { action, makeObservable, observable } from 'mobx';

export default class RootStore {
    userStore: UserStore;

    isLoading: boolean;

    isError: boolean;

    constructor() {
        this.isError = false;
        this.isLoading = true;

        this.userStore = new UserStore(this);

        makeObservable(this, {
            isError: observable,
            isLoading: observable,
            toggleError: action,
            toggleLoading: action,
        });

        this.initApp();
    }

    initApp(): void {
        Promise.all([this.userStore.setExercises()]).then(this.toggleLoading, (er) => {
            this.toggleLoading();
            this.toggleError();
            console.log(er);
        });
    }

    toggleLoading = (): void => {
        this.isLoading = !this.isLoading;
    };

    toggleError = (): void => {
        this.isError = !this.isError;
    };
}

import { renderHook } from '@testing-library/react-hooks';
import React, { createContext, RefObject } from 'react';
import useExercise from '../useExercise';
import { render } from '@testing-library/react';
import ExercisePage from '../ExercisePage';
import { configure, mount, shallow } from 'enzyme';
import TestUserStore from '../../../../store/userStore/__test__/TestUserStore';
import Adapter from 'enzyme-adapter-react-16';
import { Provider } from 'mobx-react';
import store from '../../../../store/store';
import CompletePage from '../../completePage/CompletePage';

configure({ adapter: new Adapter() });

const testUseExerciseParams = {
    duration: 5,
    currentExercise: 0,
    title: 'title',
    video: 'video',
    lastExerciseIndex: 20,
};

const testUseExerciseParamsWithWrongFields = {
    duration: -2,
    currentExercise: 0,
    title: 'title',
    video: 'video',
    lastExerciseIndex: 20,
};

const sleep = (t: number) => new Promise((resolve) => setTimeout(resolve, t));

describe('useExercise tests', () => {
    it('verifies that it return correct data with mock values', () => {
        const { result } = renderHook(() => useExercise(testUseExerciseParams));
        expect(result.current.animationDuration).toBe(5);
        expect(result.current.animationDurationValue).toBe(5);
        expect(typeof result.current.changeExercise).toBe('function');
        expect(result.current.isCompleted).toBe(false);
        expect(result.current.isFirst).toBe(true);
        expect(result.current.isLast).toBe(false);
        expect(result.current.isRunning).toBe(true);
        expect(typeof result.current.leaveWorkout).toBe('function');
        expect(result.current.newCurrentExercise).toBe(0);
        expect(typeof result.current.playPauseHandler).toBe('function');
        expect(result.current.src).toBe('video');
        expect(result.current.status).toBe('preparing');
        expect(result.current.timeToUpdate).toBe(0);
        expect(result.current.title).toBe('Get ready');
    });

    it('verifies that it return error while wrong params', () => {
        const { result } = renderHook(() => useExercise(testUseExerciseParamsWithWrongFields));
        expect(result.error.message).toBe('you passed wrong values');
    });

    /* it('vasfqsfqwe', async () => {
        const store = new TestUserStore();
        const Context = createContext(store)
        const wrapper = shallow(
            <Context.Provider value={store}>
                <ExercisePage />
            </Context.Provider>,
        );
        console.log(wrapper.debug());
        expect(wrapper.find('ExercisePage').text()).toBe('ExercisePage');
    });*/
});

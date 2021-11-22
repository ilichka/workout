import { useInterval } from '../../../utils/utils';
import React, { RefObject, useState } from 'react';

type useExerciseObject = {
    duration: number;
    currentExercise: number;
    title: string;
    video: string;
    lastExerciseIndex: number;
};

const useExercise = ({
    duration,
    currentExercise,
    title,
    video,
    lastExerciseIndex,
}: useExerciseObject) => {
    const [status, setStatus] = useState('preparing');
    const [animationDuration, setAnimationDuration] = useState(5);
    const [animationDurationValue, setAnimationDurationValue] = useState(5);
    const [isRunning, setIsRunning] = useState(true);
    const [isCompleted, setIsCompleted] = useState(false);
    const [timeToUpdate, setTimeToUpdate] = useState(0);
    const [newCurrentExercise, setNewCurrentExercise] = useState(currentExercise);

    if (duration < 0 || currentExercise < 0 || lastExerciseIndex < 0) {
        throw new Error('you passed wrong values');
    }

    const changeTotalTime = (): void => {
        if (status === 'training') {
            const time = duration - Math.ceil(animationDurationValue);
            setTimeToUpdate(time);
            setIsRunning(true);
        }
    };

    const changeExercise = (value: number): void => {
        changeTotalTime();
        setNewCurrentExercise((prevValue) => prevValue + value);
        setStatus('preparing');
        setAnimationDuration(5);
        setAnimationDurationValue(5);
        !isRunning && setIsRunning(true);
    };

    const playPauseHandler = (): void => {
        setIsRunning(!isRunning);
    };

    const onAnimationEnd = (): void => {
        changeTotalTime();
        if (currentExercise === lastExerciseIndex && status === 'training') {
            setIsCompleted(true);
        } else {
            const valueToSet = status === 'training' ? 5 : duration;
            status === 'training' && setNewCurrentExercise((prevValue) => prevValue + 1);
            setAnimationDurationValue(valueToSet);
            setAnimationDuration(valueToSet);
            setStatus((prevStatus) => (prevStatus === 'preparing' ? 'training' : 'preparing'));
        }
    };

    const leaveWorkout = (): void => {
        setIsCompleted(true);
    };

    useInterval(
        () => {
            if (animationDurationValue === 0) {
                onAnimationEnd();
            } else {
                const newValue = +(animationDurationValue - 0.1).toFixed(2);
                setAnimationDurationValue(newValue);
            }
        },
        isRunning ? 100 : null,
    );

    return {
        title: status === 'preparing' ? 'Get ready' : title,
        isFirst: currentExercise === 0,
        isLast: currentExercise === lastExerciseIndex,
        changeExercise,
        status,
        animationDuration,
        animationDurationValue,
        isRunning,
        leaveWorkout,
        src: video,
        playPauseHandler,
        isCompleted,
        timeToUpdate,
        newCurrentExercise,
    };
};

export default useExercise;

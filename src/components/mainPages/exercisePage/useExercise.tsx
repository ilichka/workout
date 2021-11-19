import { useInterval } from '../../../utils/utils';
import React, { RefObject, useState } from 'react';
import { useHistory } from 'react-router-dom';

const useExercise = (
    vidRef: RefObject<HTMLVideoElement>,
    duration: number,
    updateTotalTime: (time: number) => void,
    currentExercise: number,
    title: string,
    video: string,
    setCurrentExercise: React.Dispatch<React.SetStateAction<number>>,
    lastExerciseIndex: number,
) => {
    const history = useHistory();
    const [status, setStatus] = useState('preparing');
    const [animationDuration, setAnimationDuration] = useState(5);
    const [animationDurationValue, setAnimationDurationValue] = useState(5);
    const [isRunning, setIsRunning] = useState(true);

    const changeTotalTime = (): void => {
        if (status === 'training') {
            const time = duration - Math.ceil(animationDurationValue);
            updateTotalTime(time);
        }
    };

    const changeExercise = (value: number): void => {
        changeTotalTime();
        setCurrentExercise((prevValue) => prevValue + value);
        setStatus('preparing');
        setAnimationDuration(5);
        setAnimationDurationValue(5);
        !isRunning && setIsRunning(true);
    };

    const playPauseHandler = (): void => {
        isRunning ? vidRef.current?.pause() : vidRef.current?.play();
        setIsRunning(!isRunning);
    };

    const onAnimationEnd = (): void => {
        changeTotalTime();
        if (currentExercise === lastExerciseIndex && status === 'training') {
            history.push('/complete');
        } else {
            const valueToSet = status === 'training' ? 5 : duration;
            status === 'training' && setCurrentExercise((prevValue) => prevValue + 1);
            setAnimationDurationValue(valueToSet);
            setAnimationDuration(valueToSet);
            setStatus((prevStatus) => (prevStatus === 'preparing' ? 'training' : 'preparing'));
        }
    };

    const leaveWorkout = (): void => {
        history.push('/complete');
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
    };
};

export default useExercise;

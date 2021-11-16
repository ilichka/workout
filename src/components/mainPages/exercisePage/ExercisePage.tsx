import React, { useState, useRef } from 'react';
import { useInterval, useStore } from '../../../utils/utils';
import classNames from 'classnames';
import Button from '../../helpers/button/Button';
import { useHistory } from 'react-router-dom';
import CountdownCircle from '../../helpers/countdownCircle/CountdownCircle';

const ExercisePage: React.FC = () => {
    const { userStore } = useStore();
    const history = useHistory();
    const vidRef = useRef<HTMLVideoElement>(null);
    const [status, setStatus] = useState('preparing');
    const [animationDuration, setAnimationDuration] = useState(5);
    const [animationDurationValue, setAnimationDurationValue] = useState(5);
    const [isRunning, setIsRunning] = useState(true);

    const changeTotalTime = (): void => {
        if (status === 'training') {
            const time =
                userStore.exercisesArray[userStore.currentExercise].duration -
                Math.ceil(animationDurationValue);
            userStore.updateTotalTime(time);
        }
    };

    const changeExercise = (type: string): void => {
        changeTotalTime();
        userStore.changeCurrentExercise(type);
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
        if (userStore.currentExercise == 20 && status === 'training') {
            userStore.changeCurrentExercise('set', 0);
            history.push('/complete');
        } else {
            const valueToSet =
                status === 'training'
                    ? 5
                    : userStore.exercisesArray[userStore.currentExercise].duration;
            status === 'training' && userStore.changeCurrentExercise('increase', 1);
            setAnimationDurationValue(valueToSet);
            setAnimationDuration(valueToSet);
            setStatus((prevStatus) => (prevStatus === 'preparing' ? 'training' : 'preparing'));
        }
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
    return (
        <div className="exercise-page">
            <div className="exercise-status">
                {status === 'preparing'
                    ? 'Get ready'
                    : userStore.exercisesArray[userStore.currentExercise].title}
            </div>
            <div className="tools">
                <Button
                    btnClass={classNames(userStore.currentExercise === 0 && 'hidden')}
                    onClick={changeExercise.bind(this, 'decrease')}
                >
                    <div className="previous" />
                </Button>
                <CountdownCircle
                    countdownClass={status}
                    animationDuration={animationDuration}
                    animationDurationValue={animationDurationValue}
                    radius="56"
                    cx="64"
                    cy="64"
                />
                <Button
                    btnClass={classNames(userStore.currentExercise === 20 && 'hidden')}
                    onClick={changeExercise.bind(this, 'increase')}
                >
                    <div className="next" />
                </Button>
            </div>
            <video
                ref={vidRef}
                width="800"
                height="450"
                autoPlay
                muted
                controls={false}
                loop
                src={userStore.exercisesArray[userStore.currentExercise].video}
            />
            <div className="button-wrapper">
                <Button btnClass="play-pause-button" onClick={playPauseHandler}>
                    <div className={classNames('button-image', !isRunning ? 'play' : 'pause')} />
                </Button>
            </div>
        </div>
    );
};

export default ExercisePage;

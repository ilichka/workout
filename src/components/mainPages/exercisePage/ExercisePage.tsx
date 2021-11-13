import React, { useEffect, useState, useRef } from 'react';
import { useInterval, useStore } from '../../../utils/utils';
import classNames from 'classnames';
import Button from '../../helpers/button/Button';
import { useHistory } from 'react-router-dom';

type Props = {};

const ExercisePage: React.FC<Props> = () => {
    const { userStore } = useStore();
    const history = useHistory();
    const vidRef = useRef(null);
    const circleRef = useRef(null);
    const [status, setStatus] = useState('preparing');
    const [animationDuration, setAnimationDuration] = useState(5);
    const [animationDurationValue, setAnimationDurationValue] = useState(5);
    const [toggled, setToggled] = useState(false);
    const [delay, setDelay] = useState(100);
    const [isRunning, setIsRunning] = useState(true);

    const changeTotalTime = () => {
        const time =
            userStore.exercisesArray[userStore.currentExercise].duration -
            Math.ceil(animationDurationValue);
        status === 'training' && userStore.updateTotalTime(time);
    };

    const changeExercise = (type: string) => {
        changeTotalTime();
        userStore.changeCurrentExercise(type);
        setToggled(!toggled);
        setStatus('preparing');
        setAnimationDuration(5);
        setAnimationDurationValue(5);
        !isRunning && setIsRunning(true);
    };

    const getNewStatus = (): string => {
        return status === 'preparing' ? 'training' : 'preparing';
    };

    const changeVideoStatus = (): void => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        isRunning ? vidRef.current.pause() : vidRef.current.play();
    };

    const playPauseHandler = () => {
        changeVideoStatus();
        setIsRunning(!isRunning);
    };

    const onAnimationEnd = () => {
        const newStatus = getNewStatus();
        changeTotalTime();
        if (userStore.currentExercise == 20 && newStatus === 'preparing') {
            history.push('/complete');
        } else {
            const valueToSet =
                newStatus === 'preparing'
                    ? 5
                    : userStore.exercisesArray[userStore.currentExercise].duration;
            newStatus === 'preparing' && userStore.changeCurrentExercise('increase', 1);
            setAnimationDurationValue(valueToSet);
            setAnimationDuration(valueToSet);
            setStatus(newStatus);
        }
    };

    useInterval(
        () => {
            setAnimationDurationValue(animationDurationValue - 0.1);
        },
        isRunning ? delay : null,
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
                <div className={classNames('countdown', { training: status === 'training' })}>
                    <div className="countdown-number">{Math.ceil(animationDurationValue)}</div>
                    <svg className="countdown-svg">
                        <circle
                            ref={circleRef}
                            onAnimationEnd={onAnimationEnd}
                            className={classNames(
                                'countdown-circle',
                                toggled
                                    ? `countdown-circle-toggled-${status}`
                                    : `countdown-circle-${status}`,
                                !isRunning && 'paused',
                            )}
                            style={{ animationDuration: `${animationDuration}s` }}
                            r="56"
                            cx="64"
                            cy="64"
                        />
                    </svg>
                </div>
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

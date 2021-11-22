import React, { useEffect, useRef, useState } from 'react';
import { useStore } from '../../../utils/utils';
import classNames from 'classnames';
import Button from '../../helpers/button/Button';
import CountdownCircle from '../../helpers/countdownCircle/CountdownCircle';
import useExercise from './useExercise';
import CompletePage from '../completePage/CompletePage';

const ExercisePage: React.FC = () => {
    const { userStore } = useStore();
    console.log(userStore);
    const [currentExercise, setCurrentExercise] = useState(0);
    const vidRef = useRef<HTMLVideoElement>(null);
    const {
        title,
        isFirst,
        isLast,
        changeExercise,
        status,
        animationDuration,
        animationDurationValue,
        isRunning,
        leaveWorkout,
        playPauseHandler,
        src,
        isCompleted,
        timeToUpdate,
        newCurrentExercise,
    } = useExercise({
        duration: userStore.exercisesArray[currentExercise].duration,
        currentExercise,
        title: userStore.exercisesArray[currentExercise].title,
        video: userStore.exercisesArray[currentExercise].video,
        lastExerciseIndex: userStore.exercisesArray.length - 1,
    });

    useEffect(() => {
        isRunning ? vidRef.current?.play() : vidRef.current?.pause();
        userStore.updateTotalTime(timeToUpdate);
        setCurrentExercise(newCurrentExercise);
    }, [isRunning, timeToUpdate, newCurrentExercise]);

    if (isCompleted) {
        return <CompletePage />;
    }

    return (
        <div className="exercise-page">
            <div className="exercise-status">{title}</div>
            <div className="tools">
                <Button
                    btnClass={classNames(isFirst && 'hidden')}
                    onClick={changeExercise.bind(this, -1)}
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
                    btnClass={classNames(isLast && 'hidden')}
                    onClick={changeExercise.bind(this, 1)}
                >
                    <div className="next" />
                </Button>
            </div>
            <div className="video-wrapper">
                {!isRunning && (
                    <div className="paused-window">
                        <div className="pause-header">Workout paused</div>
                        <div className="pause-tip">
                            Press “Play button” or “Space bar” to continue
                        </div>
                        <Button btnClass="leave-button" onClick={leaveWorkout}>
                            Leave workout
                        </Button>
                    </div>
                )}
                <video
                    ref={vidRef}
                    width="800"
                    height="450"
                    autoPlay
                    muted
                    controls={false}
                    loop
                    src={src}
                />
            </div>
            <div className="button-wrapper">
                <Button btnClass="play-pause-button" onClick={playPauseHandler}>
                    <div className={classNames('button-image', !isRunning ? 'play' : 'pause')} />
                </Button>
            </div>
        </div>
    );
};

export default ExercisePage;

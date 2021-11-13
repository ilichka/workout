import React from 'react';
import { observer } from 'mobx-react';
import ExerciseSection from './ExerciseSection';
import { useStore } from '../../../utils/utils';
import Button from '../../helpers/button/Button';
import { useHistory } from 'react-router-dom';

type Props = {};

const MainPage: React.FC<Props> = observer(() => {
    const history = useHistory();
    const { userStore } = useStore();
    const startTraining = () => {
        history.push('/exercise');
    };
    return (
        <div className="main-page">
            <div className="main-image" />
            <div className="exercise-block">
                <div className="exercise-block-header">
                    <div className="exercise-day">Day 1</div>
                    <div className="exercise-kind">Morning Flexibility Routine</div>
                    <div className="exercise-options">Easy • 15 min • No equipment</div>
                </div>
                <div className="exercise-sections">
                    <ExerciseSection sections={userStore.exercises} />
                </div>
            </div>
            <Button btnClass="main-page-button" onClick={startTraining}>
                Start Workout
            </Button>
        </div>
    );
});

export default MainPage;

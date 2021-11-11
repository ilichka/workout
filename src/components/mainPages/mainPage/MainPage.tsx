import React from 'react';
import { observer } from 'mobx-react';
import ExerciseSection from './ExerciseSection';
import { useStore } from '../../../utils/utils';
import Button from '../../helpers/button/Button';

type Props = {};

const MainPage: React.FC<Props> = observer(() => {
    const { userStore } = useStore();
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
            <Button innerText="button" />
        </div>
    );
});

export default MainPage;

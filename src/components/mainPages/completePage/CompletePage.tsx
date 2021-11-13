import React from 'react';
import Button from '../../helpers/button/Button';
import { useHistory } from 'react-router-dom';
import { useStore } from '../../../utils/utils';

type Props = {};

const CompletePage: React.FC<Props> = () => {
    const history = useHistory();
    const { userStore } = useStore();
    console.log(userStore);
    const backToMain = () => {
        history.push('/');
    };
    return (
        <div className="complete-page">
            <div className="complete-image" />
            <div className="complete-tip">Workout completed!</div>
            <div className="congratulations">
                Nice job. You’re done. Here’s the workout summary.
            </div>
            <div className="time-block">
                <span className="time-title">Seconds</span>
                <span className="time-value">{userStore.totalTime}</span>
            </div>
            <Button btnClass="complete-button" onClick={backToMain}>
                Save & Continue
            </Button>
        </div>
    );
};

export default CompletePage;

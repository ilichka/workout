import React, { Fragment } from 'react';

type Props = {
    sections: Array<{
        title: string;
        exercises: Array<{ title: string; duration: number; id: number; photo: string }>;
    }>;
};

const ExerciseSection: React.FC<Props> = ({ sections }) => {
    console.log(sections);
    return (
        <Fragment>
            {sections.map((section, index) => (
                <div className="exercise-section" key={index}>
                    <div className="section-name">{section.title}</div>
                    {section.exercises.map((exercise) => (
                        <div className="section-row" key={exercise.id}>
                            <img src={exercise.photo} alt="row" className="exercise-image" />
                            <div className="exercise-info">
                                <div className="exercise-name">{exercise.title}</div>
                                <div className="exercise-time">{exercise.duration} sec</div>
                            </div>
                        </div>
                    ))}
                </div>
            ))}
        </Fragment>
    );
};

export default ExerciseSection;

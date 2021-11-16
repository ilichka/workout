import React from 'react';
import classNames from 'classnames';

type Props = {
    countdownClass: string;
    animationDuration: number;
    animationDurationValue: number;
    radius: string;
    cx: string;
    cy: string;
};

const CountdownCircle: React.FC<Props> = ({
    countdownClass,
    animationDuration,
    animationDurationValue,
    radius,
    cx,
    cy,
}) => {
    return (
        <div className={classNames('countdown', countdownClass)}>
            <div className="countdown-number">{Math.ceil(animationDurationValue)}</div>
            <svg className="countdown-svg">
                <circle
                    className="countdown-circle"
                    style={{
                        strokeDashoffset: `${
                            352 - (352 / animationDuration) * animationDurationValue
                        }px`,
                    }}
                    r={radius}
                    cx={cx}
                    cy={cy}
                />
            </svg>
        </div>
    );
};

export default CountdownCircle;

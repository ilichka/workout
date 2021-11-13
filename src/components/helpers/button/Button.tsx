import React from 'react';
import classNames from 'classnames';

type Props = {
    innerText?: string;
    btnClass?: string;
    onClick?: () => void;
    children?: React.ReactChild;
};

//also we can use the classNames library to add additional classes to our button
const Button: React.FC<Props> = ({ innerText, btnClass, onClick, children }) => {
    return (
        <div className={classNames('custom-button', btnClass)} onClick={onClick}>
            {children}
        </div>
    );
};

export default Button;

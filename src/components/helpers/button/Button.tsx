import React from 'react';

type Props = {
    innerText: string;
};

//also we can use the classNames library to add additional classes to our button
const Button: React.FC<Props> = ({ innerText }) => {
    return <div className="custom-button">{innerText}</div>;
};

export default Button;

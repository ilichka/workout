import React from 'react';

const Preloader: React.FC = () => {
    return (
        <div className="preloader-wrapper">
            <div className="sk-wave">
                {[1, 2, 3, 4, 5].map((elem, i) => (
                    <div key={i} className={`sk-rect sk-rect-${i + 1}`} />
                ))}
            </div>
        </div>
    );
};

export default Preloader;

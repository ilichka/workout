import React from 'react';
import { Route, Switch } from 'react-router-dom';
import MainPage from './mainPage/MainPage';
import ExercisePage from './exercisePage/ExercisePage';
import CompletePage from './completePage/CompletePage';
import NoMatch from './noMatch/NoMathc';
import { useStore } from '../../utils/utils';
import { observer } from 'mobx-react';
import Preloader from '../helpers/preloader/Preloader';

const ROUTES = [
    { path: '/', exact: true, component: MainPage },
    { path: '/exercise', exact: true, component: ExercisePage },
    { path: '/complete', exact: true, component: CompletePage },
    { path: '*', component: NoMatch },
];

const MainLayout: React.FC = observer(() => {
    const { isError, isLoading } = useStore();

    if (isLoading) {
        return <Preloader />;
    }

    if (isError) {
        return <div className="error">APP ERROR</div>;
    }

    return (
        <div className="main-wrapper">
            <Switch>
                {ROUTES.map((route, index) => (
                    <Route key={index} {...route} />
                ))}
            </Switch>
        </div>
    );
});

export default MainLayout;

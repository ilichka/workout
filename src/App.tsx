import React from 'react';
import './App.scss';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from './store/provider/Provider';
import { useStore } from './utils/utils';
import MainPage from './components/mainPages/mainPage/MainPage';
import ExercisePage from './components/mainPages/exercisePage/ExercisePage';
import NoMatch from './components/mainPages/noMatch/NoMathc';
import Preloader from './components/helpers/preloader/Preloader';
import { observer } from 'mobx-react';

const ROUTES = [
    { path: '/', exact: true, component: MainPage },
    { path: '/exercise', exact: true, component: ExercisePage },
    { path: '*', component: NoMatch },
];

const App: React.FC = observer(() => {
    const { isError, isLoading } = useStore();

    return (
        <Provider>
            <Router>
                {isLoading && <Preloader />}
                {isError && <div className="error">APP ERROR</div>}
                {!isError && !isLoading && (
                    <div className="main-wrapper">
                        <Switch>
                            {ROUTES.map((route, index) => (
                                <Route key={index} {...route} />
                            ))}
                        </Switch>
                    </div>
                )}
            </Router>
        </Provider>
    );
});

export default App;

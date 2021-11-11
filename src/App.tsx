import React from 'react';
import './App.scss';

import MainLayout from './components/mainPages/MainLayout';

import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from './store/provider/Provider';

const App: React.FC = () => {
    return (
        <Provider>
            <Router>
                <MainLayout />
            </Router>
        </Provider>
    );
};

export default App;

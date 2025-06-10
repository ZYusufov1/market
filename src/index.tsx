import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import {PersistGate} from "redux-persist/integration/react";
import { store, persistor } from './store';
import {Provider} from "react-redux";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <App />
            </PersistGate>
        </Provider>
    </React.StrictMode>,
);

import { createStore, applyMiddleware } from 'redux';
// import promise from 'redux-promise';
import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';

import todoApp from './reducers/index';



const configureStore = () => {
    // const middlewares = [promise];
    const middlewares = [thunk];

    if (process.env.NODE_ENV !== 'production') {
        middlewares.push(createLogger());
    }

    return createStore(
        todoApp,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
        applyMiddleware(...middlewares)
    );
};

export default configureStore;
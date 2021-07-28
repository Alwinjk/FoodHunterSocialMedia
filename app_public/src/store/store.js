import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { isLoading, user } from './LoginReducer';
import { post } from './PostReducer';
import { userList } from './UserListReducer';

const reducers = {
    user,
    isLoading,
    post,
    userList
};

const persistConfigure = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}

const rootReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfigure, rootReducer);

export const configureStore = () => 
    createStore(
        persistedReducer,
        composeWithDevTools( applyMiddleware(thunk))

    );
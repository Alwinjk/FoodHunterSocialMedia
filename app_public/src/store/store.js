import { combineReducers, createStore, applyMiddleware } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import autoMergeLevel2 from 'redux-persist/es/stateReconciler/autoMergeLevel2';
import { isLoading, user } from './LoginReducer';
import { post } from './PostReducer';
import { userList } from './UserListReducer';

import { USER_LOGOUT } from './LogoutAction';


const reducers = {
    user,
    isLoading,
    post,
    userList,    
};

const rootReducer = (state, action) => {
    if(action.type === USER_LOGOUT){
        storage.removeItem('persist:root')
        storage.removeItem('persist:rehydrate')
        return appReducer(undefined, action);
    }
    return appReducer(state, action);
}

const persistConfigure = {
    key: 'root',
    storage,
    stateReconciler: autoMergeLevel2,
}

const appReducer = combineReducers(reducers);
const persistedReducer = persistReducer(persistConfigure, rootReducer);

export const configureStore = () => 
    createStore(
        persistedReducer,
        composeWithDevTools( applyMiddleware(thunk))

    );
import { createStore,combineReducers,compose,applyMiddleware } from "redux";
import thunk from 'redux-thunk';
import authReducer from '../reducers/auth';
import modalReducer from '../reducers/modal';
import storage from 'redux-persist/lib/storage';
import {persistStore,persistReducer} from "redux-persist";


const reducer = combineReducers({
    authReducer,
    modalReducer
})

const persistConfig = {
    key:"sshhhh",
    storage,
    whitelist: [
        'authReducer', "modalReducer"
    ]
}

const persistedReducer = persistReducer(persistConfig,reducer)
const store = createStore(persistedReducer,compose(applyMiddleware(thunk)));
// const store = createStore(persistedReducer);


const Persistor = persistStore(store);

export {Persistor}
export default store;
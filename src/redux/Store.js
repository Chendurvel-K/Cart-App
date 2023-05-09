import {createStore} from 'redux';
import CartItemsReducer from './reducer/CartReducerSamps';

const store = createStore(CartItemsReducer);

export default store;

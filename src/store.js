import { applyMiddleware, combineReducers, createStore } from 'redux';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';
import { composeWithDevTools } from 'redux-devtools-extension';
import { thunk } from 'redux-thunk';
import { configureStore } from '@reduxjs/toolkit';

// const rootReducer = combineReducers({
//   account: accountReducer,
//   customer: customerReducer,
// });

// const store = createStore(rootReducer);

// We want to use the thunk middlewear into our application.
// When we use thunk. We instead of returning an action object, we can return a function. This function will receive dispatch and getState as arguments. We can use these to dispatch multiple actions or to get the current state of the store.

// const store = createStore(
//   rootReducer,
//   composeWithDevTools(applyMiddleware(thunk))
// );

// using redux toolkit
const store = configureStore({
  reducer: {
    account: accountReducer,
    customer: customerReducer,
  },
});

export default store;

// store.dispatch({ type: 'account/deposit', payload: 500 });
// store.dispatch({ type: 'account/withdraw', payload: 100 });
// console.log(store.getState());

// store.dispatch({
//   type: 'account/requestLoan',
//   payload: { amount: 1000, purpose: 'Buy a car' },
// });
// console.log(store.getState());

// store.dispatch({ type: 'account/payLoan' });

// console.log(store.getState());

// action creators

// store.dispatch(deposit(500));
// console.log(store.getState());

// store.dispatch(withdraw(100));
// console.log(store.getState());

// store.dispatch(requestLoan(1000, 'Buy a car'));
// console.log(store.getState());

// store.dispatch(payLoan());
// console.log(store.getState());
// This is a simple example of a Redux store. It has a reducer that manages the state of the store, and it has action creators that dispatch actions to the store.

// store.dispatch(deposit(500));
// store.dispatch(createCustomer('John Doe', '123456789'));
// console.log(store.getState());

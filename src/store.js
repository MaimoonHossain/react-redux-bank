import { combineReducers, createStore } from 'redux';
import accountReducer from './features/accounts/accountSlice';
import customerReducer from './features/customers/customerSlice';

const rootReducer = combineReducers({
  account: accountReducer,
  customer: customerReducer,
});

const store = createStore(rootReducer);

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

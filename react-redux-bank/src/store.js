import { createStore } from 'redux';

const initialState = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'account/deposit':
      return {
        ...state,
        balance: state.balance + action.payload,
      };
    case 'account/withdraw':
      return {
        ...state,
        balance: state.balance - action.payload,
      };
    case 'account/requestLoan':
      if (state.loan > 0) return state;
      return {
        ...state,
        loan: action.payload.amount,
        loanPurpose: action.payload.purpose,
        balance: state.balance + action.payload.amount,
      };
    case 'account/payLoan':
      return {
        ...state,
        balance: state.balance - state.loan,
        loanPurpose: '',
        loan: 0,
      };
    default:
      return state;
  }
}

const store = createStore(reducer);

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

function deposit(amount) {
  return { type: 'account/deposit', payload: amount };
}

function withdraw(amount) {
  return { type: 'account/withdraw', payload: amount };
}

function requestLoan(amount, purpose) {
  return { type: 'account/requestLoan', payload: { amount, purpose } };
}

function payLoan() {
  return { type: 'account/payLoan' };
}

store.dispatch(deposit(500));
console.log(store.getState());

store.dispatch(withdraw(100));
console.log(store.getState());

store.dispatch(requestLoan(1000, 'Buy a car'));
console.log(store.getState());

store.dispatch(payLoan());
console.log(store.getState());
// This is a simple example of a Redux store. It has a reducer that manages the state of the store, and it has action creators that dispatch actions to the store.
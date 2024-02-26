import { createSlice } from '@reduxjs/toolkit';

const initialStateAccount = {
  balance: 0,
  loan: 0,
  loanPurpose: '',
  isLoading: false,
};

const accountSlice = createSlice({
  name: 'account',
  initialState: initialStateAccount,
  reducers: {
    deposit(state, action) {
      state.balance += action.payload;
      state.isLoading = false;
    },
    withdraw(state, action) {
      state.balance -= action.payload;
    },
    requestLoan: {
      prepare(amount, purpose) {
        return {
          payload: { amount, purpose },
        };
      },

      reducer(state, action) {
        if (state.loan > 0) return;
        state.loan = action.payload.amount;
        state.loanPurpose = action.payload.purpose;
        state.balance += action.payload.amount;
      },
    },
    payLoan(state, action) {
      state.balance -= state.loan;
      state.loanPurpose = '';
      state.loan = 0;
    },
    convertingCurrency(state, action) {
      state.isLoading = true;
    },
  },
});

export const { withdraw, requestLoan, payLoan } = accountSlice.actions;

export function deposit(amount, currency) {
  if (currency === 'USD') return { type: 'account/deposit', payload: amount };

  // when redux will see that we are returning a function. It'll immediately identify that it's a redux thunk. so, it'll execute the function and pass the dispatch and getState as arguments. It'll not dispatch the action immediately. It'll wait for the function to finish and then dispatch the action.

  // This function is sitting between the initial dispatching and the reducer in the store receiving the action. It's a middleware that allows us to do something before the action reaches the reducer.
  return async function (dispatch, getState) {
    dispatch({ type: 'account/convertingCurrency' });
    // Api call
    const res = await fetch(
      `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
    );

    const data = await res.json();
    const converted = data.rates.USD;
    // return action
    dispatch({ type: 'account/deposit', payload: converted });
  };
}

export default accountSlice.reducer;

// export default function accountReducer(state = initialStateAccount, action) {
//   switch (action.type) {
//     case 'account/deposit':
//       return {
//         ...state,
//         balance: state.balance + action.payload,
//         // After deposit set isLoading to false
//         isLoading: false,
//       };
//     case 'account/withdraw':
//       return {
//         ...state,
//         balance: state.balance - action.payload,
//       };
//     case 'account/requestLoan':
//       if (state.loan > 0) return state;
//       return {
//         ...state,
//         loan: action.payload.amount,
//         loanPurpose: action.payload.purpose,
//         balance: state.balance + action.payload.amount,
//       };
//     case 'account/payLoan':
//       return {
//         ...state,
//         balance: state.balance - state.loan,
//         loanPurpose: '',
//         loan: 0,
//       };
//     case 'account/convertingCurrency':
//       return {
//         ...state,
//         isLoading: true,
//       };
//     default:
//       return state;
//   }
// }

// export function deposit(amount, currency) {
//   if (currency === 'USD') return { type: 'account/deposit', payload: amount };

//   // when redux will see that we are returning a function. It'll immediately identify that it's a redux thunk. so, it'll execute the function and pass the dispatch and getState as arguments. It'll not dispatch the action immediately. It'll wait for the function to finish and then dispatch the action.

//   // This function is sitting between the initial dispatching and the reducer in the store receiving the action. It's a middleware that allows us to do something before the action reaches the reducer.
//   return async function (dispatch, getState) {
//     dispatch({ type: 'account/convertingCurrency' });
//     // Api call
//     const res = await fetch(
//       `https://api.frankfurter.app/latest?amount=${amount}&from=${currency}&to=USD`
//     );

//     const data = await res.json();
//     const converted = data.rates.USD;
//     // return action
//     dispatch({ type: 'account/deposit', payload: converted });
//   };
// }

// export function withdraw(amount) {
//   return { type: 'account/withdraw', payload: amount };
// }

// export function requestLoan(amount, purpose) {
//   return { type: 'account/requestLoan', payload: { amount, purpose } };
// }

// export function payLoan() {
//   return { type: 'account/payLoan' };
// }

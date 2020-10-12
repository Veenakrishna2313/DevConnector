//by default this reducerwrites to the store

import { SET_USER } from "../actions/types";

const initialState={

  isAuthenticated:false,
  user:{}
};

export default function(state=initialState, action){

  switch(action.type){

    case SET_USER:
      return {
//spread the data(copy of data is made)
        ...state,
        user:action.payload

      }

default:
  return state
}

}
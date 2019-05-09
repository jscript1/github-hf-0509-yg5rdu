import * as userDetailsActions from '../actions/userDetails-actions'

export default function userDetailsReducer(state = [],action){
  
  switch(action.type){
    case userDetailsActions.ADD_USER_DETAILS:
     return action.payload

    case userDetailsActions.REMOVE_USER_DETAILS:
     return state 
    
    case userDetailsActions.RESET_USER_DETAILS:
     return {} 

    case userDetailsActions.ADDNEWFORM_USER_DETAILS:
     return {...state,forms:[...(state.forms || []),action.payload]}

    case userDetailsActions.REMOVEFORM_USER_DETAILS:
      let formsData = state.forms
      let formsDataNew = formsData.filter(form => form.fId !== action.payload)
     return {...state,forms:formsDataNew}

    default:
     return state
  }
}
import * as editableQuestionActions from '../actions/editableQuestion-actions'

export default function editableQuestionReducer(state = [],action){

  switch(action.type){
    
    case editableQuestionActions.ADD_EDITABLE_QUESTION:
        return {qId:action.payload}
    case editableQuestionActions.REMOVE_EDITABLE_QUESTION:
        return {}
    case editableQuestionActions.RESET_EDITABLE_QUESTION:
        return {}    
    default:
     return state
  }
}
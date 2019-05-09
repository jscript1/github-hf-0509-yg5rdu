import * as questionActions from '../actions/question-actions'

export default function questionsReducer(state = [],action){

  switch(action.type){
    case questionActions.ADD_QUESTION:
     return [...state,action.payload]

    case questionActions.ADD_MANY_QUESTIONS:
     return [...state,...action.payload] 
    
    case questionActions.ADD_MANY_QUESTIONS_AND_SAVE_STATE:
     return [...action.payload] 
        
    case questionActions.UPDATE_QUESTION:
     return state.map(question =>
        question.qId !== action.payload.qId ? question : {...question,...action.payload.qPartial}
      )     

    case questionActions.DELETE_QUESTION:
     return state.filter( question => {
       return (question.qId!== action.payload)
     })

    case questionActions.RESET_QUESTIONS:
     return []
    
    default:
     return state
  }
}
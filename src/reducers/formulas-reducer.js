export default function formulasReducer(state = [],action){
 switch(action.type){
    case 'updateFormula':
      return action.payload.forumla
    default:
     return state
  }
}
export let ADD_EDITABLE_QUESTION = "editableQuestion:addEditableQuestion"
export let REMOVE_EDITABLE_QUESTION = "editableQuestion:removeEditableQuestion"
export let RESET_EDITABLE_QUESTION = "editableQuestion:resetEditableQuestion"

export function addEditableQuestion(qId) {
  return {
    type : ADD_EDITABLE_QUESTION,
    payload: qId
  }
}

export function removeEditableQuestion() {
  return {
    type : REMOVE_EDITABLE_QUESTION,
    payload:1
  }
}

export function resetEditableQuestion() {
  return {
    type : RESET_EDITABLE_QUESTION,
    payload:1
  }
}
export let UPDATE_QUESTION = "questions:updateQuestion"
export let ADD_QUESTION = "questions:addQuestion"
export let DELETE_QUESTION = "questions:deleteQuestion"
export let ADD_MANY_QUESTIONS = "questions:addManyQuestions"
export let ADD_MANY_QUESTIONS_AND_SAVE_STATE = "questions:addManyQuestionsAndSaveState"
export let RESET_QUESTIONS = "questions:resetQuestions"

export function updateQuestion(qId,qPartial) {
    return {
    type : UPDATE_QUESTION,
    payload: {
      qId,
      qPartial
    }
  }
}

export function addQuestion(question) {
    return {
    type : ADD_QUESTION,
    payload: question
  }
}

export function addManyQuestions(questions) {
    return {
    type : ADD_MANY_QUESTIONS,
    payload: questions
  }
}

export function addManyQuestionsAndSaveState(questions) {
    return {
    type : ADD_MANY_QUESTIONS_AND_SAVE_STATE,
    payload: questions
  }
}

export function deleteQuestion(qId) {
    return {
    type : DELETE_QUESTION,
    payload: qId
  }
}

export function resetQuestions() {
    return {
    type : RESET_QUESTIONS,
    payload: 1
  }
}
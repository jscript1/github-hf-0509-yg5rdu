import React, { Component } from 'react';
import { render } from 'react-dom';
import SignUp from './SignUp'
import SignIn from './SignIn'
import AppRouter from './AppRouter'
import history from "./history";
import {combineReducers, createStore} from 'redux'
import { devToolsEnhancer } from 'redux-devtools-extension';
import {Provider} from 'react-redux';
import questionsReducer from './reducers/questions-reducer';
import formulasReducer from './reducers/formulas-reducer';
import userDetailsReducer from './reducers/userDetails-reducer';
import editableQuestionReducer from './reducers/editableQuestion-reducer';
import './style.css';
import undoable,{ includeAction, excludeAction } from 'redux-undo';
import * as questionActions from './actions/question-actions'
import * as editableQuestionActions from './actions/editableQuestion-actions'
import firebase from './firebase'
//import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";

let includeUndoRedoActionsArray = [questionActions.UPDATE_QUESTION, questionActions.ADD_QUESTION,questionActions.DELETE_QUESTION,editableQuestionActions.ADD_EDITABLE_QUESTION,editableQuestionActions.REMOVE_EDITABLE_QUESTION,questionActions.ADD_MANY_QUESTIONS_AND_SAVE_STATE]

let allReducers = undoable(combineReducers(
  {
    questions : questionsReducer,
    formulas: formulasReducer,
    editableQuestion : editableQuestionReducer,
    userDetails : userDetailsReducer,    
  }),
  { 
    filter: includeAction(includeUndoRedoActionsArray) 
  } 
)

let store = createStore(
  allReducers,
  {
     questions: [],
     formulas : {test:"test"},
     editableQuestion: {},
     userDetails :{}
  },
  window.devToolsExtension && window.devToolsExtension()
);

render(
  <Provider store={store}><AppRouter aRandomProps={"What is this?"}/></Provider>, document.getElementById('root'));

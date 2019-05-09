import React from 'react';
import firebase from './firebase'
import history from "./history";
import { connect } from 'react-redux';
import { ActionCreators } from 'redux-undo';
import * as editableQuestionActions from './actions/editableQuestion-actions'
import * as questionActions from './actions/question-actions'
import * as userDetailsActions from './actions/userDetails-actions'


export class Hello extends React.Component{
  
constructor(props){
    super(props);   
    this.user = "No user"
};

componentDidMount()
{
  var user = firebase.auth().currentUser;
  
  if (user) {
    this.user = user
  } else {
    history.replace("/")
  }

}

render(){
    return(
        <div className="dummy">
        {/*  <p>This is Hello Component</p> */}
        </div>
    )
    }      
 }


let mapStateToProps = (state, props) => {
  return {
    questions: state.present.questions,
    formulas: state.formulas,
    editableQuestion : state.present.editableQuestion,
    extraProps: props.aRandomProps,
    totalState: state
  }

};

let mapDispatchToProps = (dispatch, props) => {
  return {
    
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(Hello);
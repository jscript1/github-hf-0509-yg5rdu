import React, { Component } from 'react';
import {connect} from 'react-redux';
import { ActionCreators } from 'redux-undo';
import Hello from './Hello';
import Questions from './Questions';
import QuestionEditPanel from './QuestionEditPanel';
import FormBuildPanel from './FormBuildPanel';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit} from '@fortawesome/free-solid-svg-icons'
import firebase from './firebase'
import history from "./history";
import * as userDetailsActions from './actions/userDetails-actions';
import * as questionActions from './actions/question-actions';
import DisplayFormsList from './DisplayFormsList';

export class Dashboard extends Component {
  constructor(props){
    super(props);      
    this.user = "No user"
    this.totalUserDetails = {}
  }

addUserDetails = (userDetails) => {
    this.props.addUserDetails(userDetails)
  };

addManyQuestions = (questions) => {
    this.props.addManyQuestions(questions)    
  };  

componentDidMount()
{
  var user = firebase.auth().currentUser;
  
  let fetchDetailsFromDB = true
  {this.props.userDetails.uid?fetchDetailsFromDB=false:fetchDetailsFromDB=true}

  if (user && fetchDetailsFromDB) {
    console.log("Fetching user Details from DB")
    this.user = user
    this.addUserDetails({uid:this.user.uid})
    var db = firebase.firestore();
    var docRef = db.collection("users").doc(this.user.uid);
    
    docRef.get().then((doc) => {
        if (doc.exists) {
            this.totalUserDetails = doc.data()
            this.addUserDetails(this.totalUserDetails)
        } else {
          //The user doc must exist so this is invalid  
        }
    }).catch(function(error) {
    var errorCode = error.code;
    var errorMessage = error.message;
    alert(error.message)
  });  

  } else if (!fetchDetailsFromDB){
     //We are good. Store updated already.
    console.log("Use details from store")
    }
    else {
    //console.log("Push to home page")
    history.replace("/")
  }
}

render() {
    return (
      <div className="dummy">
         {/* <p>Hi This is Dashboard Component {this.user.email} - {this.user.uid}</p> */}
         <DisplayFormsList/>         
      </div>
    );
  }
}

let mapStateToProps = (state,props) => {
 return {
   questions : state.present.questions,
   formulas : state.formulas,
   editableQuestion : state.present.editableQuestion,
   totalState : state,
   userDetails : state.present.userDetails,
 } 
};

let mapDispatchToProps = (dispatch,props) => {
 return{
    addUserDetails : (userDetails) => {
      dispatch(userDetailsActions.addUserDetails(userDetails))
    },
    addManyQuestions: (questions) => {
        dispatch(questionActions.addManyQuestions(questions))
        dispatch(ActionCreators.clearHistory())
    },
 }    
};

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
import React from 'react';
import {connect} from 'react-redux';
import { ActionCreators } from 'redux-undo';
import firebase from './firebase'
import history from "./history";
import Questions from './Questions';
import QuestionEditPanel from './QuestionEditPanel';
import FormBuildPanel from './FormBuildPanel';
import Hello from './Hello';
import * as questionActions from './actions/question-actions';
import * as editableQuestionActions from './actions/editableQuestion-actions'
import ControlButtonsPanel from './ControlButtonsPanel';
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash,faEdit,faArrows} from '@fortawesome/free-solid-svg-icons'
import Paper from '@material-ui/core/Paper';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import LeftOptionsInEditPanel from './LeftOptionsInEditPanel'

library.add(faTrash)
library.add(faEdit)

let styles = theme => ({
  root: {
    flexGrow: 1,
    alignContent:'flex-end'
  },
  paper: {
    padding: theme.spacing.unit * 2,    
  },
});

export class EditForm extends React.Component{
  
constructor(props){
    super(props);
    this.fId = this.props.match.params.fid    
};

addManyQuestions = (questions) => {
    this.props.addManyQuestions(questions)    
  };  

resetQuestionsInStore = () => {
  this.props.resetQuestionsInStore()
}

componentDidMount()
{
  this.resetQuestionsInStore()
  var user = firebase.auth().currentUser;
  if (user) {
     //USer logged in
    var db = firebase.firestore();
    var docRef = db.collection("forms").doc(this.fId);
    
    docRef.get().then((doc) => {
    if(doc.exists && doc.data().uid !== user.uid)
    {
      //history.replace("/")
    }
    let questionsArray 
    if (doc.exists && doc.data().uid === user.uid ) {
        console.log(33,doc.data().uid)
        questionsArray = doc.data().questions
    } else {
        questionsArray = []
    }
    console.log(133,questionsArray)
    this.addManyQuestions(questionsArray)
    }).catch(function(error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(error.message)
    })
  } else {
    history.replace("/")
  }

}

render(){

  let { theme } = this.props;
  let { classes } = this.props;

  let middleComponent
    if ((!this.props.editableQuestion.qId) || (this.props.questions.length ===0)) {
      middleComponent = <Questions fId={this.fId}/>
    } else {
      middleComponent = <QuestionEditPanel name={"Questions Edit Panel"} fId={this.fId}/>
    }
    
    return (
      
      <div className="parent">
        { /* <p>Hi This is Dashboard Component {this.props.userDetails.uemail} - {this.props.userDetails.uid}</p>
        <Hello name={"Hello component place holder"} /> */}
         <ControlButtonsPanel fId={this.fId}/>
        {/* <p>This is Quick Edit Form Component</p>
          <h2>Id:{this.fId}</h2> */}
        <div className="complete-box">
         <Paper className={classes.paper}>
          <div>
            <LeftOptionsInEditPanel/>
          </div>
         </Paper> 
         <Paper className={classes.paper}>
          <div className="column2">
           {middleComponent}
          </div>
          </Paper>
          <Paper className={classes.paper}>
          <div className="column3">
            <FormBuildPanel content={this.props.questions}/>
          </div>
          </Paper>
        </div>
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
    resetQuestionsInStore: () => {
      dispatch(questionActions.resetQuestions())
      dispatch(editableQuestionActions.resetEditableQuestion())
      dispatch(ActionCreators.clearHistory())
    },

 }    
};


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(EditForm)));
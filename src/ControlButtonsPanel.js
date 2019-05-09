import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import {connect} from 'react-redux';
import * as questionActions from './actions/question-actions'
import { ActionCreators } from 'redux-undo';
import firebase from './firebase'
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

let styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
});

export class ControlButtonsPanel extends React.Component{
  
constructor(props){
    super(props);    
};

undoChanges = () => {
  this.props.undoChanges();
};

redoChanges = () => {

   this.props.redoChanges();
};

clearChangesStorage = () => {
   this.props.clearChangesStorage();
};

saveChanges = () => {
  var db = firebase.firestore();
  var saveQuestionsSet = this.props.questions
  saveQuestionsSet = saveQuestionsSet.map(question => {
    delete question.qAnswer
    return question
  })
  db.collection("forms").doc(this.props.fId).set(  
    { questions:saveQuestionsSet,       
      formulas : {test:"test"},
      editableQuestion: {}
    },{ merge: true })
  .then(() => {
    // console.log("Document written to DB with ID");
     this.clearChangesStorage()
  })
  .catch(function(error) {
     console.error("Error adding document: ", error);
  });
};


  render(){
     
    let { theme } = this.props;
    let { classes } = this.props;

     return(
        <div className={classes.root} className="controlButtonsPanel">
          <Grid container alignContent="flex-end" wrap="no-wrap" spacing={8} justify="flex-end">
        {/* <p>Form Id {this.props.fId}</p>
         <p>This is Undo Redo Component</p> */}
         
         <Grid item>
         <Button className={classes.button} onClick={this.undoChanges.bind(this)} disabled={!this.props.totalState.past.length}            
            size="small"
            variant="contained"
            color="primary"            
          >
          Undo Changes
         </Button>      
         </Grid>   
         <Grid item>
         <Button className={classes.button} onClick={this.redoChanges.bind(this)} disabled={!this.props.totalState.future.length}            
            size="small"
            variant="contained"
            color="primary"            
          >
          Redo Changes
          </Button>   
          </Grid>       
          <Grid item>
        <Button className={classes.button}            
            size="small"
            variant="contained"
            color="primary"
            onClick={this.saveChanges.bind(this)} disabled={!this.props.totalState.past.length}
          >
            Save Changes-{this.props.totalState.past.length} changes made
         </Button>
         </Grid>
        </Grid>                
      </div>
    );
    }      
 }

let mapStateToProps = (state,props) => {
 return {
   questions : state.present.questions,
   formulas : state.formulas,
   extraProps : props.aRandomProps,
   totalState : state,
   userDetails : state.present.userDetails,
 }
 
};

let mapDispatchToProps = (dispatch,props) => {
 return{
        undoChanges : () => {
          dispatch(ActionCreators.undo())
        },
        redoChanges : () => {
          dispatch(ActionCreators.redo())
        },
        clearChangesStorage : () => {
          dispatch(ActionCreators.clearHistory())
        }        
 }    
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(ControlButtonsPanel)));
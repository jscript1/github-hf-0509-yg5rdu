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
import Typography from '@material-ui/core/Typography';
import Modal from '@material-ui/core/Modal';
import Highlight from 'react-highlight';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

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
  paper: {
    position: 'absolute',
    width: theme.spacing.unit * 50,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing.unit * 4,
    outline: 'none',
  },
});

export class ControlButtonsPanel extends React.Component{
  
constructor(props){
    super(props);
    this.state = {
    embedFormOpen: false,
  };    
};

embedFormClose = () => {
    this.setState({ embedFormOpen: false });
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

embedFormOpen = () => {
   this.setState({ embedFormOpen: true });
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
         <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.embedFormOpen}
          onClose={this.embedFormClose}
        >
          <div style={getModalStyle()} className={classes.paper}>
            <Typography variant="h6" id="modal-title">
              Add this code snippet on your site
            </Typography>
            <Typography variant="subtitle1" id="simple-modal-description">
            <Highlight className='language-name-of-snippet'>
               Form Id : {this.props.fId}
            </Highlight>
            </Typography>
            <Button className={classes.button} onClick={this.embedFormClose.bind(this)}          
            size="small"
            variant="contained"
            color="primary"            
          >
          Close
         </Button>      
         
          </div>
        </Modal>
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
         <Grid item>
         <Button className={classes.button} onClick={this.embedFormOpen.bind(this)}
            size="small"
            variant="contained"
            color="primary"            
          >
          Add form to website
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
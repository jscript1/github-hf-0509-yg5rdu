import React from 'react';
import firebase from './firebase'
import * as firebaseNPM from 'firebase';
import history from "./history";
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import FileCopy from '@material-ui/icons/FileCopy';
import Icon from '@material-ui/core/Icon';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import * as userDetailsActions from './actions/userDetails-actions';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Grid from '@material-ui/core/Grid';

let styles = theme => ({
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginTop: theme.spacing.unit +20,
    marginBottom: theme.spacing.unit - 10,
    marginLeft: theme.spacing.unit,
  },
});

export class DisplayFormsList extends React.Component{
  
constructor(props){
    super(props);     
};

clearChangesStorage = () => {
   this.props.clearChangesStorage();
};

addNewFormToUserDetails = (newFormObject) => {
    this.props.addNewFormToUserDetails(newFormObject)
};

addNewFormToUserDetails = (newFormObject) => {
    this.props.addNewFormToUserDetails(newFormObject)
};

removeFormFromUserDetails = (fId) => {
    this.props.removeFormFromUserDetails(fId)
};

editForm = (fId) => {
  history.push("/editform/"+fId);
}
removeForm = (fId,formsData) => {
  var db = firebase.firestore()
  var doc = db.collection("users").doc(this.props.userDetails.uid)
  doc.update({
    forms: formsData.filter(form => form.fId !== fId)
    }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

 db.collection("forms").doc(fId).delete().then(function() {
    console.log("Document successfully deleted!");
  }).catch(function(error) {
      console.error("Error removing document: ", error);
  });

  this.removeFormFromUserDetails(fId)   
}

cloneForm = (fId) => {    
    
    let formsData = this.props.userDetails.forms
    let selectedForm = formsData.filter(form  => form.fId === fId)
    let fName = " (Copy of "+selectedForm[0].fName+")"
    let nextFormNumber 
    {formsData? nextFormNumber = formsData.length+1 : nextFormNumber = 1}
    let shortid = require('shortid').generate();
    let moment = require('moment')().format()
    let newFormObject = {
      fId:shortid, //Form Id
      fName:"Form #"+nextFormNumber+fName, //Form Name
      fCD : moment,//Form CreatedDate/Time
      fVisits: 0, //Form Visits
      fSubmissions:0 //Form Submission
    }
    let newFormId = shortid
    var db = firebase.firestore()
    var doc = db.collection("users").doc(this.props.userDetails.uid)
    doc.update({
    forms: firebaseNPM.firestore.FieldValue.arrayUnion(newFormObject)
    });

    this.addNewFormToUserDetails(newFormObject)

    var docRef = db.collection("forms").doc(fId);
    let questionsArray = []
    docRef.get().then((doc) => {    
    if (doc.exists && doc.data().uid === this.props.userDetails.uid ) {
        console.log(33,doc.data().uid)
        questionsArray = doc.data().questions
    } else {
        questionsArray = []
    }   
  
    var saveQuestionsSet = questionsArray
    console.log("SAQ",newFormId)
    db.collection("forms").doc(newFormId).set(  
      { questions:saveQuestionsSet,       
        formulas : {test:"test"},
        editableQuestion: {},
        uid : this.props.userDetails.uid,
       somePlaceHolder: "Some Place Holder"
      })
    .then(() => {
      // console.log("Document written to DB with ID");      
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
   }) 
}    


addNewForm = () => {    
    
    let formsData = this.props.userDetails.forms
    let nextFormNumber 
    {formsData? nextFormNumber = formsData.length+1 : nextFormNumber = 1}
    let shortid = require('shortid').generate();
    let moment = require('moment')().format()
    let newFormObject = {
      fId:shortid, //Form Id
      fName:"Form #"+nextFormNumber, //Form Name
      fCD : moment,//Form CreatedDate/Time
      fVisits: 0, //Form Visits
      fSubmissions:0 //Form Submission
    }
    console.log(newFormObject)
    console.log(189,this.props.userDetails.uid)
    console.log(177,this.props.userDetails.forms)
    var db = firebase.firestore()
    var doc = db.collection("users").doc(this.props.userDetails.uid)
    doc.update({
    forms: firebaseNPM.firestore.FieldValue.arrayUnion(newFormObject)
    });

    db.collection("forms").doc(shortid).set(  
    { questions:[],       
      uid : this.props.userDetails.uid,
      somePlaceHolder: "Some Place Holder"
    })
    .then(() => {
      // console.log("Document written to DB with ID");      
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });

    this.addNewFormToUserDetails(newFormObject)
}    

render(){
    let { theme } = this.props;
    let { classes } = this.props;
    
    let formsData = this.props.userDetails.forms
    let formsDataJSX 
    {formsData? formsDataJSX = formsData.map( (form) => {
      return (
        <div>
        <p/>
        <AppBar position="static" color="default">
        <Toolbar>
          <IconButton color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            {form.fName}{/* - {form.fId} */ }
          </Typography>
          <FileCopy className={classes.extendedIcon} color="primary" onClick={this.cloneForm.bind(this,form.fId)}/>
          <EditIcon className={classes.extendedIcon} color="primary" onClick={this.editForm.bind(this,form.fId)}/>
          <DeleteIcon className={classes.extendedIcon} color="secondary" onClick={this.removeForm.bind(this,form.fId,formsData)}/>
        </Toolbar>
      </AppBar>
      </div>
        )
    }):formsDataJSX}
    return(
       <div>        
         <Grid container spacing={24}>
         <Grid item xs={1}></Grid>
         <Grid item xs={10}>        
         <Button size="medium" variant="contained" color="primary" aria-label="Add" className={classes.button} onClick={this.addNewForm.bind(this)}>
          <AddIcon className={classes.extendedIcon}/>
          Create New Form
        </Button>
        </Grid>
        <Grid item xs></Grid>
        <Grid container spacing={24}>
        <Grid item xs={1}></Grid>
        <Grid item xs={10}>        
          {formsDataJSX}
        </Grid>
        <Grid item xs></Grid>
        </Grid> 
        </Grid> 
       </div>                 
    )
  }      
}

let mapStateToProps = (state,props) => {
 return {
   questions : state.present.questions,
   formulas : state.formulas,
   editableQuestion : state.present.editableQuestion,   
   userDetails : state.present.userDetails,
   totalState : state,
 } 
};

let mapDispatchToProps = (dispatch,props) => {
 return{
    addNewFormToUserDetails : (newFormObject) => {
      dispatch(userDetailsActions.addNewFormToUserDetails(newFormObject))
    },
    removeFormFromUserDetails : (fId) => {
      dispatch(userDetailsActions.removeFormFromUserDetails(fId))
    },
    clearChangesStorage : () => {
      dispatch(ActionCreators.clearHistory())
    } 
 }    
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(DisplayFormsList)));
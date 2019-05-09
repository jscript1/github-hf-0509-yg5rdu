import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import firebase from './firebase'
import history from "./history";
import { connect } from 'react-redux';
import * as editableQuestionActions from './actions/editableQuestion-actions'
import * as questionActions from './actions/question-actions'
import * as userDetailsActions from './actions/userDetails-actions'
import { ActionCreators } from 'redux-undo';


let styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
};

export class TopAppBar extends React.Component {
  
constructor(props){
    super(props);   
};

resetStore(){
  this.props.resetStore()
}

signup = (event) => {
   history.replace("/signup")
};

signin = (event) => {
   history.replace("/signin")
};

pricing = (event) => {
   history.replace("/pricing")
};

dashboard = (event) => {
   history.replace("/dashboard")
};

signout = (event) => {
 firebase.auth().signOut().then(() => {
   this.resetStore()
   history.replace("/")
}).catch(function(error) {
   console.log("Error in Signed out user",error.message)
});
};

render(){
   let appbarJSX
   let firstPathParam = window.location.pathname.split("/")
   switch(firstPathParam[1]) {
   
  case "dashboard":
  case "editform":
   appbarJSX  = (
     <div>
      <Button color="inherit" onClick={this.dashboard.bind(this)}>Dashboard</Button>
      <Button color="inherit" onClick={this.signout.bind(this)}>Logout</Button>
     </div> 
    )
    break;
  case "signup":
   appbarJSX  = (
      <Button color="inherit" onClick={this.signin.bind(this)}>Sign In</Button>
    )
    break;    
  case "pricing":
   appbarJSX  = (
      <Button color="inherit" onClick={this.signup.bind(this)}>Create New Account</Button>      
    )
    break;
  default:
    appbarJSX  = (
      <div>
      <Button color="inherit" onClick={this.pricing.bind(this)}>Pricing</Button>      
      <Button color="inherit" onClick={this.signup.bind(this)}>Create New Account</Button>
      </div>
    )
    break;
} 

  let { classes } = this.props;
  return (
    <div className={classes.root}>
       <AppBar position="static">
        <Toolbar>
          <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" color="inherit" className={classes.grow}>
            HF
          </Typography>
          {appbarJSX}
        </Toolbar>
      </AppBar>
    </div>
  );
  }
}

let mapStateToProps = (state, props) => {
  return {
    questions: state.present.questions,
    formulas: state.formulas,
    editableQuestion : state.present.editableQuestion,
    extraProps: props.aRandomProps,
    userDetails : state.present.userDetails,
    totalState: state
  }

};

let mapDispatchToProps = (dispatch, props) => {
  return {
    resetStore: () => {
      dispatch(questionActions.resetQuestions())
      dispatch(editableQuestionActions.resetEditableQuestion())
      dispatch(userDetailsActions.resetUserDetails())
      dispatch(ActionCreators.clearHistory())
    },
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TopAppBar));

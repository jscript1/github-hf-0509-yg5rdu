import React from 'react';
import firebase from './firebase'
import history from "./history";
import {connect} from 'react-redux';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Icon from '@material-ui/core/Icon';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


let styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

export class DisplayFormsList extends React.Component{
  
constructor(props){
    super(props);     
};

render(){
    let { theme } = this.props;
    let { classes } = this.props;

    console.log(890,this.props.userDetails.uid)
    console.log(770,this.props.userDetails.forms)

    return(
        <div className="formsList">          
         <Fab size="medium" variant="extended" color="primary" aria-label="Add" className={classes.margin}>
          <AddIcon className={classes.extendedIcon}/>
          Add New Form
        </Fab>    
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
    addUserDetails : (uid) => {
      dispatch(userDetailsActions.addUserDetails(uid))
    },
 }    
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(DisplayFormsList)));
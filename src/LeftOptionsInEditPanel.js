import React from 'react';
import firebase from './firebase'
import history from "./history";
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';

let styles = theme => ({
  button: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit*1.2,
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

export class LeftOptionsInEditPanel extends React.Component{
  
constructor(props){
    super(props);     
};

render(){
   
  let { theme } = this.props;
  let { classes } = this.props;

    return(
        <div className="leftOptionsInEditPanel">
         <Button variant="contained" size="medium" color="default" className={classes.button}>
          <AddIcon />
        </Button>
        <Button variant="contained" size="medium" color="default" className={classes.button}>
          <AddIcon />
        </Button>
        </div>
    );
    }      
}

export default withStyles(styles)(LeftOptionsInEditPanel);
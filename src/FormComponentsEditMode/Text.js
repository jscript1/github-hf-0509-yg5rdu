import React from 'react';
import {connect} from 'react-redux';
import * as questionActions from './../actions/question-actions'
import icons from 'glyphicons'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';


let styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit*0.9,
  },
  dense: {
    marginTop: 16,
  },
  menu: {
    width: 200,
  },
  button: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    marginLeft: theme.spacing.unit+15,
    marginRight: theme.spacing.unit,
  },
});

export class Text extends React.Component{

 constructor(props) {
    super(props);
    this.headerTags = ["h1","h2","h3","h4","h5","h6"]
  }

handleChange = (value,qTag) => event => {
    let currentQuestion = this.props.questions.filter(item => item.qId === this.props.editableQuestion.qId)[0]    
    this.props.onUpdateQuestion(currentQuestion.qId,{[qTag]:event.target.value})
}

render(){

  let { theme } = this.props;
  let { classes } = this.props;

  let currentQuestion = this.props.questions.filter(item => item.qId === this.props.editableQuestion.qId)[0]

  let headerJSXTags = this.headerTags.map((item) => 
  {     
    return (
     item===currentQuestion.titleSize ? 
      <Button className={classes.button} variant="contained" color="default" value={item} disabled>{item}</Button>
      : 
      <Button className={classes.button} variant="contained" color="default" value={item} onClick={(e) => {this.props.onUpdateQuestion(currentQuestion.qId,{titleSize: item})}}>{item}</Button>
      
     )
   }
  )
  
  let showHideLogicBlock = 
  (
      <div>
          <div className="checkboxEditOptions">
          <TextField
            id="outlined-name"
            label="Formula"
            className={classes.textField}
            value={currentQuestion.qShowHide?currentQuestion.qShowHide:""}
            onChange={this.handleChange('value',"qShowHide")}
            margin="normal"
            variant="outlined"
          />        
        </div>      
      </div>
  )  

  return(
    <div>
      <div>
        <h2>Title</h2>
       <TextField
          fullWidth = "true"
          id="outlined-bare"
          value={currentQuestion.qText}
          margin="dense"
          variant="outlined"
          onChange={(e) => {this.props.onUpdateQuestion(currentQuestion.qId,{qText: e.target.value})}}
        />
        <h2>Select size of the title text</h2>
        {headerJSXTags}
        <h2>Show/Hide Formula</h2>
        {showHideLogicBlock} 
      </div>
    </div>
  )
}
}

let mapStateToProps = (state,props) => {
 return {
   questions : state.present.questions,
   formulas : state.formulas,
   editableQuestion : state.present.editableQuestion,
   totalState : state
 } 
};

let mapDispatchToProps = (dispatch,props) => {
 return{
    removeEditableQuestion: () => {
      dispatch(editableQuestionActions.removeEditableQuestion())
    },
    onUpdateQuestion : (qId,qPartial) => {
      dispatch(questionActions.updateQuestion(qId,qPartial))
    },
 }    
};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(Text)));
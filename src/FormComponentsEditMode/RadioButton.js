import React from 'react';
import {connect} from 'react-redux';
import * as questionActions from './../actions/question-actions'
import icons from 'glyphicons'
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import DeleteForeverOutlined from '@material-ui/icons/DeleteForeverOutlined';
import AddIcon from '@material-ui/icons/Add';
import Fab from '@material-ui/core/Fab';

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
  deleteIcon :{
    marginTop: theme.spacing.unit+25,
  },
  addIcon :{
    marginLeft: theme.spacing.unit+10,
    marginTop: theme.spacing.unit-5,
  }
});

export class MultipleChoiceRadioButtons extends React.Component{

 constructor(props) {
    super(props);
    this.headerTags = ["h1","h2","h3","h4","h5","h6"]
  }

handleChange = (value,qTag) => event => {
    let currentQuestion = this.props.questions.filter(item => item.qId === this.props.editableQuestion.qId)[0]    
    this.props.onUpdateQuestion(currentQuestion.qId,{[qTag]:event.target.value})
}


handleOptionLabelChange = (name,qOptionsId) => event => {
    console.log(11111,event.target.value,qOptionsId)
    let currentQuestion = this.props.questions.filter(item => item.qId === this.props.editableQuestion.qId)[0]
    let qOptionsArray  = currentQuestion.qOptions.map((item => {
       if (qOptionsId === item.id){
          return {...item,"label":event.target.value}
       }
       return item
     })
    )
    console.log(qOptionsArray)
    this.props.onUpdateQuestion(currentQuestion.qId,{"qOptions":qOptionsArray})
};

handleOptionValueChange = (value,qOptionsId) => event => {
    console.log(11111,event.target.value,qOptionsId)
    let currentQuestion = this.props.questions.filter(item => item.qId === this.props.editableQuestion.qId)[0]
    let qOptionsArray  = currentQuestion.qOptions.map((item => {
       if (qOptionsId === item.id){
          return {...item,"value":event.target.value}
       }
       return item
     })
    )
    console.log(qOptionsArray)
    this.props.onUpdateQuestion(currentQuestion.qId,{"qOptions":qOptionsArray})
};

deleteOption = (qOptionsId) => {
    let currentQuestion = this.props.questions.filter(item => item.qId === this.props.editableQuestion.qId)[0]
    let qOptionsArray  = currentQuestion.qOptions.filter((item => item.id !== qOptionsId))
    console.log("delete",qOptionsArray)
    this.props.onUpdateQuestion(currentQuestion.qId,{"qOptions":qOptionsArray})
}

addOption = () => {
    
    let currentQuestion = this.props.questions.filter(item => item.qId === this.props.editableQuestion.qId)[0]
    let shortid = require('shortid').generate();
    let qOptionsArray  = currentQuestion.qOptions

    let nextOptionNumber 
    {qOptionsArray? nextOptionNumber = qOptionsArray.length+1 : nextOptionNumber = 1}
    
    let newOptionsObject = {
      id:shortid, 
      label:"", 
      value :"",
      order: 0,      
    }   
    
    qOptionsArray.push(newOptionsObject)
    console.log("add",qOptionsArray)
    this.props.onUpdateQuestion(currentQuestion.qId,{"qOptions":qOptionsArray})
}


render(){

  let { theme } = this.props;
  let { classes } = this.props;

  let currentQuestion = this.props.questions.filter(item => item.qId === this.props.editableQuestion.qId)[0]

  console.log(1,currentQuestion)

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


  let optionsData =  currentQuestion.qOptions
  let checkboxOptionsValues = optionsData.map((item) => {
    console.log(item);
    return(
      <div className="checkboxEditOptions">
              
        { /*
        {item.label}
        {item.value}
         */}
         
        <TextField
          id="outlined-name"
          label="Label"
          className={classes.textField}
          value={item.label}
          onChange={this.handleOptionLabelChange('name',`${item.id}`)}
          margin="normal"
          variant="outlined"
        />
        <TextField
          id="outlined-name"
          label="Value"
          className={classes.textField}
          value={item.value}
          onChange={this.handleOptionValueChange('value',`${item.id}`)}
          margin="normal"
          variant="outlined"
        />
        <DeleteForeverOutlined className={classes.deleteIcon} color="default" onClick={this.deleteOption.bind(this,item.id)}/>
        
      </div>
    )
  })
  
  
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
        <h2>Add/Delete options <Fab size="small" color="default" aria-label="Add" className={classes.addIcon} onClick={this.addOption.bind(this)}>
          <AddIcon />
        </Fab></h2>
        
        <Paper className={classes.root} elevation={1}>
        {checkboxOptionsValues}
        </Paper>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(MultipleChoiceRadioButtons)));
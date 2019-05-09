import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Select from '@material-ui/core/Select';
import Checkbox from '@material-ui/core/Checkbox';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import MenuItem from '@material-ui/core/MenuItem';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as questionActions from './../actions/question-actions'

let styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
  },
});

export class Dropdown extends React.Component{

FormulaParser = require('hot-formula-parser').Parser;
parser = new this.FormulaParser();

state = {
    select: '',
    labelWidth:10    
  };


handleChange = event => {
    this.setState({ [event.target.name]: event.target.value });
    let currentQuestion = this.props.data 
    let qAnswer =  Number(event.target.value)?Number(event.target.value):0
    this.props.onUpdateQuestion(currentQuestion.qId,{"qAnswer":qAnswer})
  };

showHideLogicCalculation()
{
  let current = this.props.data
  let currentFormula = current.qShowHide  
  if (!currentFormula || currentFormula.length===0)
  {
    return true
  }

  let allQuestions = this.props.questions
  allQuestions.map(question => {
      let qTempValue = question.qAnswer
      this.parser.setVariable(question.qName, qTempValue?qTempValue:0);
  })

  let calcValue = this.parser.parse(currentFormula)
  
  if (calcValue.result === 0 || calcValue.error || !calcValue.result){
     return false
  }
  else
  {
    return true
  }
}

render(){

  let { theme } = this.props;
  let { classes } = this.props;

  let current = this.props.data  
  let CustomtitleSizeTag = current.titleSize   

  let qName = current.qName
  let qValue = Number(this.state.select)?Number(this.state.select):0

  let optionsArray = current.qOptions
  let outputJSX = optionsArray.map((option) => {
    console.log(option)
    return (  
       <MenuItem value={option.value}>{option.label}</MenuItem> 
    )                 
  })

 return(
    <div className={"flex-container " + (!this.showHideLogicCalculation() ? 'disableFlexContainer' : 'dummy')}>
      <div class="qName">
        <div>
        {qName}
        </div>
        <div class="qValue">
        {qValue}
        </div>
      </div>
    <div>        
        <CustomtitleSizeTag>{current.qText}</CustomtitleSizeTag>
        <FormControl variant="outlined" className={classes.formControl}>
        
          <Select
            value={this.state.select}
            onChange={this.handleChange}
            input={
              <OutlinedInput
                labelWidth={this.state.labelWidth}
                name="select"
                id="outlined-select-simple"
              />
            }

          >
            <MenuItem value="">
              <em>None</em>
            </MenuItem>
          {outputJSX}
            </Select>
        </FormControl>        
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(Dropdown)));
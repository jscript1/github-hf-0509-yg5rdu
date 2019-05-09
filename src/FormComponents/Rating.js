import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import {connect} from 'react-redux';
import * as questionActions from './../actions/question-actions'

let styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    marginTop: theme.spacing.unit-20,
  },
  group: {
    margin: `${theme.spacing.unit}px 0`,
  },
});

export class Rating extends React.Component{

FormulaParser = require('hot-formula-parser').Parser;
parser = new this.FormulaParser();

state = {
    value : 0
};

handleChange = event => {
 //   alert(value)
   this.setState({ value: event.target.value });
   let currentQuestion = this.props.data 
   let qAnswer = Number(event.target.value)?Number(event.target.value):0 
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
  let qValue = Number(this.state.value)?Number(this.state.value):0
  let optionsArray = current.qOptions
  let outputJSX = optionsArray.map((option) => {
    console.log(option)
    return (  
        <FormControlLabel value={option.value} control={<Radio color="primary"/>} label={option.label} /> 
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
        <FormControl component="fieldset" className={classes.formControl}>
          <RadioGroup            
            name="radioName"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            {outputJSX}
          </RadioGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(Rating)));
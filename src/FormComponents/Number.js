import React from 'react';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import {connect} from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import * as questionActions from './../actions/question-actions'

let styles = theme => ({
});

export class Number extends React.Component{

FormulaParser = require('hot-formula-parser').Parser;
parser = new this.FormulaParser();

state = {
    value: 0,    
  };

handleChange = name => event => {
    this.setState({ [name]: event.target.value });
    let currentQuestion = this.props.data 
    let qAnswer =  event.target.value
    this.props.onUpdateQuestion(currentQuestion.qId,{"qAnswer":qAnswer})
}

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
  
  if(!this.showHideLogicCalculation()){
    return (
      <div>
        Show Hide Return is False
      </div>
    )
  }

  let current = this.props.data  
  let CustomtitleSizeTag = current.titleSize
  
  let qName = current.qName
  let qValue = this.state.value
  
  return(
    
    <div class="flex-container">
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
        <TextField
          id="outlined-bare"
          margin="normal"
          variant="outlined"   
          type="number"     
          onChange={this.handleChange('value')}  
          inputProps={{ min: `${current.qMin}`, max: `${current.qMax}`, step: `${current.qStep}` }} 
            InputProps={{
            startAdornment: <InputAdornment position="start">{current.qPrefix}</InputAdornment>,
          }}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(Number)));

import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import CheckboxNPM from '@material-ui/core/Checkbox';
import {connect} from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import * as questionActions from './../actions/question-actions'
import FormGroup from '@material-ui/core/FormGroup';

let styles = theme => ({
});

export class Checkbox extends React.Component{

FormulaParser = require('hot-formula-parser').Parser;
parser = new this.FormulaParser();

state = {
}

handleChange = name => event => {
    let totalCheckboxOptionsArray = {...this.state,[name]: event.target.checked}
    this.setState(totalCheckboxOptionsArray,this.reCalculateTotal);
};

reCalculateTotal = () =>
{
   let current = this.props.data 
    var qValue = current.qOptions.reduce((accumulator, currentOption) => {
    if(this.state[`${currentOption.label}`] && Number(currentOption.value))
     return accumulator + Number(currentOption.value);
    else
     return accumulator
  }, 0);
  console.log("qV",qValue)
  this.setState({qValue:qValue})
  let qAnswer = qValue
  this.props.onUpdateQuestion(current.qId,{"qAnswer":qAnswer})
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
  
  let current = this.props.data  
  let CustomtitleSizeTag = current.titleSize   
  
  let qName = current.qName
  var qValue = this.state.qValue
  let optionsArray = current.qOptions
  let outputJSX = optionsArray.map((option) => {
    console.log(option)
    return (  
       <div>    
        <FormControlLabel
          control={
            <CheckboxNPM
              value={option.value}
              color="primary"
              onChange={this.handleChange(option.label)}
            />
          }
          label={option.label}
        />
       </div> 
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
        {/*{qName}->{qValue}*/}
        <CustomtitleSizeTag>{current.qText}</CustomtitleSizeTag>
        <FormGroup row>
        {outputJSX}
        </FormGroup>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(Checkbox)));
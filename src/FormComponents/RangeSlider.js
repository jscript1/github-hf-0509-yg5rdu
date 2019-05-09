import React from 'react';
import Slider, { Range } from 'rc-slider';
import InputAdornment from '@material-ui/core/InputAdornment';
import 'rc-slider/assets/index.css';
import {connect} from 'react-redux';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import * as questionActions from './../actions/question-actions'

let styles = theme => ({
});

export class RangeSlider extends React.Component{

FormulaParser = require('hot-formula-parser').Parser;
parser = new this.FormulaParser();

state = {
  sliderValue : ""
}

handleChange = e => {
  console.log(1,e)
  this.setState({
    sliderValue : e
  })
  let currentQuestion = this.props.data 
  let qAnswer = Number(e)?Number(e):0 
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
  
  let current = this.props.data
  let CustomtitleSizeTag = current.titleSize
  let qName = current.qName
  let qValue = this.state?this.state.sliderValue:current.qDefault

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
          <b>{this.state?this.state.sliderValue:current.qDefault}</b>
          <p/>
          <Slider onChange={this.handleChange} min={current.qMin} max={current.qMax} step={current.qStep}
          defaultValue={current.qDefault}/>
          <p/>
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(RangeSlider)));

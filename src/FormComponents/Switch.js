import React from 'react';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import SwitchNPM from '@material-ui/core/Switch';
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

export class Switch extends React.Component{

FormulaParser = require('hot-formula-parser').Parser;
parser = new this.FormulaParser();

state = {    
  };

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
  
  if(!this.showHideLogicCalculation()){
    return (
      <div>
        Show Hide Return is False
      </div>
    )
  }

  let { theme } = this.props;
  let { classes } = this.props;

  let current = this.props.data  
  let CustomtitleSizeTag = current.titleSize   

  let qName = current.qName
  var qValue = this.state.qValue

  let optionsArray = current.qOptions
  let outputJSX = optionsArray.map((option) => {
    console.log(option)
    return (         
       <FormControlLabel
            control={
              <SwitchNPM
                checked={this.state.checkedA}
                onChange={this.handleChange(option.label)}
                value={option.value}
                color="default"
              />
            }
            label={option.label}
       />
    )                 
  })

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
        <FormControl variant="outlined" className={classes.formControl}>        
          {outputJSX}            
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

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(Switch)));
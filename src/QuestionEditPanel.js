import React from 'react';
import {connect} from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faWindowClose } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'
import * as editableQuestionActions from './actions/editableQuestion-actions'
import * as questionActions from './actions/question-actions'
import TextEdit from './FormComponentsEditMode/Text'
import DropdownEdit from './FormComponentsEditMode/Dropdown'
import CheckboxEdit from './FormComponentsEditMode/Checkbox'
import LabelEdit from './FormComponentsEditMode/Label'
import SwitchEdit from './FormComponentsEditMode/Switch'
import NumberEdit from './FormComponentsEditMode/Number'
import RangeSliderEdit from './FormComponentsEditMode/RangeSlider'
import RadioButtonEdit from './FormComponentsEditMode/RadioButton'
import RatingEdit from './FormComponentsEditMode/Rating'
import DateEdit from './FormComponentsEditMode/Date'
import EmailEdit from './FormComponentsEditMode/Email'
import FormulaTypeEdit from './FormComponentsEditMode/FormulaType'

library.add(faWindowClose)

export class QuestionEditPanel extends React.Component{
  constructor(props){
    super(props);   
  }  

  removeEditableQuestion = () => {
    this.props.removeEditableQuestion()
  };
 
  deleteQuestion = (qId) => {
    if (qId === this.props.editableQuestion.qId)
    {
      this.props.removeEditableQuestion()
    }
    this.props.onDeleteQuestion(qId)
  };

  render(){
  
  let currentQuestion = this.props.questions.filter(item => item.qId === this.props.editableQuestion.qId)[0]
  
  let editableComponent

  switch(currentQuestion.qType)
  {
     
     case 'TEXT':
       editableComponent = <TextEdit/>
       break;
     case 'NUMBER':
       editableComponent = <NumberEdit/>
       break;
     case 'DROPDOWN':
       editableComponent = <DropdownEdit/>
       break;  
     case 'CHECKBOX':
       editableComponent = <CheckboxEdit/>
       break;
     case 'LABEL':
       editableComponent = <LabelEdit/>
       break;
    case 'SWITCH':
       editableComponent = <SwitchEdit/>
       break;           
    case 'RADIOBUTTON':
       editableComponent = <RadioButtonEdit/>
       break;
    case 'RATING':
       editableComponent = <RatingEdit/>
       break;            
    case 'RANGESLIDER':
       editableComponent = <RangeSliderEdit/>
       break; 
    case 'DATE':
       editableComponent = <DateEdit/>
       break;        
    case 'EMAIL':
       editableComponent = <EmailEdit/>
       break;    
    case 'FORMULATYPE':
       editableComponent = <FormulaTypeEdit/>
       break;   
    default:
       editableComponent = <DefaultEdit/>  
       break;    
  }  

  return (
     <div>
        <div className="alignToRight">
          <FontAwesomeIcon icon="window-close" onClick={() => { this.removeEditableQuestion() }} />
        </div>
        <div className="alignToRight">
            <FontAwesomeIcon    
            className="alignToRight" icon="trash" onClick={() => { this.deleteQuestion(currentQuestion.qId) }} /> 
        </div>
       { /* <h1>HelloXYZ! </h1>
        <p>Now editing {this.props.editableQuestion.qId}</p> */}
        {editableComponent}        
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
    onDeleteQuestion: (qId) => {
      dispatch(questionActions.deleteQuestion(qId))
    },
 }    
};

export default connect(mapStateToProps, mapDispatchToProps)(QuestionEditPanel);
import React from 'react';
import Text from './FormComponents/Text'
import Email from './FormComponents/Email'
import Dropdown from './FormComponents/Dropdown'
import Checkbox from './FormComponents/Checkbox'
import Label from './FormComponents/Label'
import Switch from './FormComponents/Switch'
import Number from './FormComponents/Number'
import RangeSlider from './FormComponents/RangeSlider'
import RadioButton from './FormComponents/RadioButton'
import Rating from './FormComponents/Rating'
import Date from './FormComponents/Date'
import FormulaType from './FormComponents/FormulaType'
import { connect } from 'react-redux';
import * as questionActions from './actions/question-actions'
import * as editableQuestionActions from './actions/editableQuestion-actions'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';
import { withTheme } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/core/styles';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import { faHandRock} from '@fortawesome/free-solid-svg-icons'

let styles = theme => ({
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  button: {
    marginTop: theme.spacing.unit +20,
    marginBottom: theme.spacing.unit + 10,
    marginLeft: theme.spacing.unit,
  },
});

export class FormBuildPanel extends React.Component {

  constructor(props) {
    super(props);
    this.onDragEnd = this.onDragEnd.bind(this);
    this.reorder = this.reorder.bind(this)
    this.getListStyle = this.getListStyle.bind(this)
    this.getItemStyle = this.getItemStyle.bind(this)
    this.addManyQuestionsAndSaveState = this.addManyQuestionsAndSaveState.bind(this)
  }

  components = {
    TEXT: Text,    
    CHECKBOX : Checkbox,
    DATE : Date,
    NUMBER : Number,
    SWITCH : Switch,
    LABEL : Label,
    RANGESLIDER : RangeSlider,
    RADIOBUTTON : RadioButton,
    DROPDOWN : Dropdown,
    EMAIL : Email, 
    RATING : Rating,
    FORMULATYPE:FormulaType,
  };

getItemStyle = (isDragging, draggableStyle) => ({
  // some basic styles to make the items look a bit nicer
  userSelect: "none",
  padding: 1,
  margin: `0 0 0 0`,
  borderStyle: isDragging? "solid" :"",
  borderWidth: 2,
  // change background colour if dragging
  background: isDragging ? "white" : "white",

  // styles we need to apply on draggables
  ...draggableStyle
});

getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "white" : "white",
  padding: 1,
  width: 500,

});


  reorder = (list, startIndex, endIndex) => {
    let result = Array.from(list);
    let [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  onDragEnd = (result) => {
    // dropped outside the list
    if (!result.destination) {
      return;
    }
    
    let items = this.reorder(
      this.props.questions,
      result.source.index,
      result.destination.index
    );
         
    this.addManyQuestionsAndSaveState(items)
    console.log(this.props.questions)
  }

  deleteQuestion = (qId) => {
    if (qId === this.props.editableQuestion.qId)
    {
      this.props.removeEditableQuestion()
    }
    this.props.onDeleteQuestion(qId)
  };

  addManyQuestionsAndSaveState = (questions) => {
    this.props.addManyQuestionsAndSaveState(questions)
  };

  addEditableQuestion = (qId) => {
    this.props.addEditableQuestion(qId)
  };  

  removeEditableQuestion = () => {
    this.props.removeEditableQuestion()
  };

  render() {

    let { theme } = this.props;
    let { classes } = this.props;

    let questionsList = this.props.questions
    let CustomName 
    return (
      <div className="formBuildPanel">
        <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
          {(provided, snapshot) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}           
              style={this.getListStyle(snapshot.isDraggingOver)}   
            >
            {questionsList.map((item, index) => {
             
             let qType = item.qType
             let CustomName = this.components[qType];
             return(
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      style={this.getItemStyle(
                        snapshot.isDragging,
                        provided.draggableProps.style
                      )}
                    >  
                     <div className="boxed" onClick={() => { this.addEditableQuestion(item.qId) }}>
                        {/*<div {...provided.dragHandleProps}>
                        <FontAwesomeIcon
                        className="alignToRight" icon={faHandRock}/>
                        </div>*/}
                        {/*{item.qName}*/}
                        <CustomName data={item}/>                        
                      </div>              
                    </div>
                  )}
                </Draggable>
              )
            })}                   
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
         
         {/*} {questionsList.length !== 0 ? <Button size="medium" variant="contained" color="primary" className={classes.button}>Submit</Button> : ''} */}
      </div>       
    );
  }
}

let mapStateToProps = (state, props) => {
  return {
    questions: state.present.questions,
    formulas: state.formulas,
    editableQuestion : state.present.editableQuestion,
    extraProps: props.aRandomProps,
    totalState: state
  }

};

let mapDispatchToProps = (dispatch, props) => {
  return {
    onAddQuestion: (question) => {
      dispatch(addQuestion(question))
    },
    undoChanges: () => {
      dispatch(ActionCreators.undo())
    },
    redoChanges: () => {
      dispatch(ActionCreators.redo())
    },
    onDeleteQuestion: (qId) => {
      dispatch(questionActions.deleteQuestion(qId))
    },
    addEditableQuestion: (qId) => {
      dispatch(editableQuestionActions.addEditableQuestion(qId))
    },
    removeEditableQuestion: () => {
      dispatch(editableQuestionActions.removeEditableQuestion())
    },
    addManyQuestionsAndSaveState: (questions) => {
      dispatch(questionActions.addManyQuestionsAndSaveState(questions))
    }
  }

};

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(withTheme()(FormBuildPanel)));
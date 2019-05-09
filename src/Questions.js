import React from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import {connect} from 'react-redux';
import * as questionActions from './actions/question-actions'
import { ActionCreators } from 'redux-undo';
import Button from '@material-ui/core/Button';

export class Questions extends React.Component{

constructor(props){
    super(props);      
};

numberToTextValue = (num) => {
  var s = '', t;

  while (num > 0) {
    t = (num - 1) % 26;
    s = String.fromCharCode(65 + t) + s;
    num = (num - t)/26 | 0;
  }
  return "Q"+s || undefined;
}

onAddQuestion(questionNode){
  this.props.onAddQuestion(questionNode);  
};

//onUpdateQuestion(questionNode){
// this.props.onUpdateQuestion(qId,qPartial);
//};

//deleteQuestion(qId)
//{
//  this.props.onDeleteQuestion(qId)
//}

undoChanges = () => {
   this.props.undoChanges();
};

resetQuestions = () => {
   this.props.resetQuestions();
};


redoChanges = () => {
   this.props.redoChanges();
};
 
onClick = (id) =>{
   let shortid = require('shortid');

   let questionNode = {
       "qType" : "Default if no match",
       "titleSize" : "h2",
       "qText" : "Question Title",
       "qDescription" : "Question Description",
       "qOrder":3
     }
  
   switch(id) {
        case 'TEXT':
           questionNode = {
              "qType" : "TEXT",
              "titleSize" : "h2",
              "qText" : "Question Title",
              "qDescription" : "Question Description",
              "qOrder":3
            };
            break;
        case 'NUMBER':
           questionNode = {
              "qType" : "NUMBER",
              "titleSize" : "h2",
              "qText" : "Question Title",
              "qDescription" : "Question Description",
              "qPrefix" : "",
              "qSuffix" : "",
              "qMin":"",
              "qMax":"",
              "qStep":"",
              "qOrder":3
            };
            break;            
        case 'FORMULATYPE':
           questionNode = {
              "qType" : "FORMULATYPE",
              "titleSize" : "h2",
              "qText" : "Title",
              "qDescription" : "Question Description",
              "qPrefix" : "",
              "qSuffix" : "",
              "qMin":"",
              "qMax":"",
              "qStep":"",
              "qFormula":"",
              "qOrder":3
            };
            break;            
      case 'RANGESLIDER':
           questionNode = {
              "qType" : "RANGESLIDER",
              "titleSize" : "h2",
              "qText" : "Question Title",
              "qDescription" : "Question Description",
              "qPrefix" : "",
              "qSuffix" : "",
              "qMin":0,
              "qMax":100,
              "qStep":1,
              "qDefault":0,
              "qMode":"",
              "qOrder":3
            };
            break;
        case 'CHECKBOX':
           questionNode = {
              "qType" : "CHECKBOX",
              "titleSize" : "h2",
              "qText" : "Question Title",
              "qDescription" : "Question Description",
              "qOrder":3,
              "qOptions" :[
                { 
                  "id" : "1",
                  "label" : "Option1", 
                  "value" : 1, 
                  "order" : 1
                },
                { 
                  "id" : "2",
                  "label" : "Option2", 
                  "value" : 2, 
                  "order" : 2
                },
                { 
                  "id" : "3",
                  "label" : "Option3", 
                  "value" : 3, 
                  "order" : 3
                }
              ]
            };
            break;
        case 'RADIOBUTTON':
           questionNode = {
              "qType" : "RADIOBUTTON",
              "titleSize" : "h2",
              "qText" : "Question Title",
              "qDescription" : "Question Description",
              "qOrder":3,
              "qOptions" :[
                { 
                  "id" : "1",
                  "label" : "Option1", 
                  "value" : "1", 
                  "order" : 1
                },
                { 
                  "id" : "2",
                  "label" : "Option2", 
                  "value" : "2", 
                  "order" : 2
                },
                { 
                  "id" : "3",
                  "label" : "Option3", 
                  "value" : "3", 
                  "order" : 3
                }
              ]
            };
            break;
        case 'RATING':
           questionNode = {
              "qType" : "RATING",
              "titleSize" : "h2",
              "qText" : "Question Title",
              "qDescription" : "Question Description",
              "qOrder":3,
              "qOptions" :[
                { 
                  "id" : "1",
                  "label" : "❤️", 
                  "value" : "1", 
                  "order" : 1
                },
                { 
                  "id" : "2",
                  "label" : "❤️❤️", 
                  "value" : "2", 
                  "order" : 2
                },
                { 
                  "id" : "3",
                  "label" : "❤️❤️❤️", 
                  "value" : "3", 
                  "order" : 3
                },
                { 
                  "id" : "4",
                  "label" : "❤️❤️❤️️️️❤️", 
                  "value" : "4", 
                  "order" : 3
                },
              ]
            };
            break;
        case 'DROPDOWN':
           questionNode = {
              "qType" : "DROPDOWN",
              "titleSize" : "h2",
              "qText" : "Question Title",
              "qDescription" : "Question Description",
              "qOrder":3,
              "qOptions" :[
                { 
                  "id" : "1",
                  "label" : "Option1", 
                  "value" : 1, 
                  "order" : 1
                },
                { 
                  "id" : "2",
                  "label" : "Option2", 
                  "value" : 2, 
                  "order" : 2
                },
                { 
                  "id" : "3",
                  "label" : "Option3", 
                  "value" : 3, 
                  "order" : 3
                }
              ]
            };            
            break;
        case 'EMAIL':
           questionNode = {
              "qType" : "EMAIL",
              "titleSize" : "h2",
              "qText" : "Question Title",
              "qDescription" : "Question Description",
              "qOrder":3
            };
            break;
        case 'DATE':
           questionNode = {
              "qType" : "DATE",
              "titleSize" : "h2",
              "qText" : "Question Title",
              "qDescription" : "Question Description",
              "qOrder":3
            };
            break;
        case 'LABEL':
           questionNode = {
              "qType" : "LABEL",
              "titleSize" : "h2",
              "qText" : "Question Title",
              "qDescription" : "Question Description",
              "qOrder":3
            };
            break;
        case 'SWITCH':
           questionNode = {
              "qType" : "SWITCH",
              "titleSize" : "h2",
              "qText" : "Question Title",
              "qDescription" : "Question Description",
              "qOrder":3,
              "qOptions" :[
                { 
                  "id" : "1",
                  "label" : "Option1", 
                  "value" : "1", 
                  "order" : 1
                },
                { 
                  "id" : "2",
                  "label" : "Option2", 
                  "value" : "1", 
                  "order" : 2
                },
                { 
                  "id" : "3",
                  "label" : "Option3", 
                  "value" : "1", 
                  "order" : 3
                }
              ]
            };
            break;    
        default:
           questionNode = {
              "qType" : "Defaulted",
              "titleSize" : "h2",
              "qText" : "Question Title",
              "qDescription" : "Question Description",
              "qOrder":3
            };
            break;   
    }
   let someId =  shortid.generate()  
   questionNode.qId = someId
   questionNode.id = someId
   
  let superMax 
   if ( this.props.questions.length === 0)
   {
     superMax = 0
   }
   else
   {
    let data = this.props.questions
    superMax = data.reduce((max, p) => p.nextNum > max ? p.nextNum : max, data[0].nextNum); 
   }
   let qNameValue = superMax+1
   questionNode.nextNum = qNameValue
   questionNode.qName = this.numberToTextValue(qNameValue)
   this.onAddQuestion(questionNode)
  };
  
  onBeforeDragStart = () => {
    /*...*/
  };

  onDragStart = () => {
    /*...*/
  };
  onDragUpdate = () => {
    /*...*/
  };
  onDragEnd = () => {
    // the only one that is required
  };  
  render(){
     
      return(
      <div>
        <div className="left">
         <h3 className="addSomePadding">Question Types</h3>
         <Button
            type="button"
            fullWidth
            variant="outlined"
            color="inherit"
            className="question-text" ref= "question-text-ref" onClick={this.resetQuestions.bind(this)}
          >
            Reset Form
          </Button>
          <p/>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="default"
            className="question-text" ref= "question-text-ref" onClick={this.onClick.bind(this,"TEXT")}
          >
            TEXT
          </Button>
          <p/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="default"
            className="question-rangeslider" onClick={this.onClick.bind(this,"RANGESLIDER")}
          >
            RANGESLIDER
          </Button>
          <p/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="default"
            className="question-checkbox" onClick={this.onClick.bind(this,"CHECKBOX")} 
          >
            CHECKBOX
          </Button>
          <p/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="default"
            className="question-multiplechoice" onClick={this.onClick.bind(this,"RADIOBUTTON")}
          >
            RADIO BUTTON
          </Button>
          <p/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="default"
            className="question-number" onClick={this.onClick.bind(this,"NUMBER")}
          >
            NUMBER
          </Button>
          <p/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="default"
            className="question-dropdown" onClick={this.onClick.bind(this,"DROPDOWN")}
          >
            DROPDOWN
          </Button>
          <p/>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="default"
            className="question-email" onClick={this.onClick.bind(this,"EMAIL")}
          >
            EMAIL
          </Button>
          <p/>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="default"
            className="question-text" ref= "question-text-ref" onClick={this.onClick.bind(this,"LABEL")}
          >
            LABEL
          </Button>
          <p/>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="default"
            className="question-text" ref= "question-text-ref" onClick={this.onClick.bind(this,"SWITCH")}
          >
            SWITCH
          </Button>
          <p/>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="default"
            className="question-text" ref= "question-text-ref" onClick={this.onClick.bind(this,"DATE")}
          >
            DATE
          </Button>
          <p/>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="default"
            className="question-text" ref= "question-text-ref" onClick={this.onClick.bind(this,"RATING")}
          >
            RATINGS/REVIEWS
          </Button>
          <p/>                         
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="default"
            className="question-text" ref= "question-text-ref" onClick={this.onClick.bind(this,"FORMULATYPE")}
          >
            CALCULATED FIELD
          </Button>
          <p/>                         
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="default"
          >
            PLACEHOLDER
          </Button>
          <p/>
      </div>
    </div>
    );
    }      
 }

let mapStateToProps = (state,props) => {
 return {
   questions : state.present.questions,
   formulas : state.formulas,
   extraProps : props.aRandomProps,
   totalState : state
 }
 
};

let mapDispatchToProps = (dispatch,props) => {
 return{
        onAddQuestion: (question) => {
        dispatch(questionActions.addQuestion(question))
        },
        undoChanges : () => {
          dispatch(ActionCreators.undo())
        },
        redoChanges : () => {
          dispatch(ActionCreators.redo())
        },
        onUpdateQuestion : (qId,qPartial) => {
          dispatch(questionActions.updateQuestion(qId,qPartial))
        },
        onDeleteQuestion : (qId) => {
          dispatch(questionActions.deleteQuestion(qId))
        },
        resetQuestions : () => {
          dispatch(questionActions.resetQuestions())
        }
        
 }    
};

export default connect(mapStateToProps, mapDispatchToProps)(Questions);
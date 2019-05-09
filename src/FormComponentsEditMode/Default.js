import React from 'react';

export class Default extends React.Component{

handleChange = (value,qTag) => event => {
    let currentQuestion = this.props.questions.filter(item => item.qId === this.props.editableQuestion.qId)[0]    
    this.props.onUpdateQuestion(currentQuestion.qId,{[qTag]:event.target.value})
}

render(){

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

  return(
    <div>
      <div>
        <p>Default in Edit Mode</p>
      </div>
    </div>
  )
}
}
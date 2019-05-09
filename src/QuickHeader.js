import React from 'react';
import firebase from './firebase'
import history from "./history";

export class QuickHeader extends React.Component{
  
constructor(props){
    super(props);     
};

render(){
    return(
        <div className="header">
          <p>This is Quick Header Component</p>
        </div>
    );
    }      
}

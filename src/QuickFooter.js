import React from 'react';
import firebase from './firebase'
import history from "./history";

export class QuickFooter extends React.Component{
  
constructor(props){
    super(props);     
};

render(){
    return(
        <div className="footer">
          <p>This is Quick Footer Component</p>          
        </div>
    );
    }      
}

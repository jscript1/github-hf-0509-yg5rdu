import React from 'react';
import firebase from './firebase'
import history from "./history";

export default class NotFound extends React.Component{
  
constructor(props){
    super(props);     
};

render(){

    return(      
        <div className="notfound">
          <p align="center">Page not found!!</p>          
        </div>
    );
    }      
 }

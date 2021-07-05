import React from 'react';
import {getUser, removeUserSession } from './Common';
import './Dashboard.css';
import { BsFillPersonFill}  from "react-icons/bs";


const Dashboard =(props) => {


const user = getUser();

const handleLogout = () => {
  removeUserSession();
  props.history.push('/')

}


  return (
    <div>
          
          
    <div class ="navbar-dash" >
    <input  type='button' class="button-dash-logout" value="LogOut" onClick={handleLogout} />
    </div>
    
    
    <div class="brand-name">
      Restaurant Care
    </div>

    <div class="profileicon">
      <BsFillPersonFill /> 
      </div>

      <div class="username">
        {user.name}
      </div>
   
    <div  class="checkout-area">

      
    </div>
    
    </div>
  );
}

export default Dashboard;
import React, { useEffect, useState } from 'react';
import {BrowserRouter, Switch} from "react-router-dom";
import Login from './pages/login';
import Dashboard from './pages/Dashboard';
import PublicRoute from './pages/PublicRoutes';
import PrivateRoute from './pages/PrivateRoutes';
import { getToken, removeUserSession, setUserSession } from './pages/Common';
import axios from 'axios';

function App() {

  const [authLoading,setAuthLoading] = useState(true);



  
  useEffect(()=>{
    const token = getToken()
    if (!token){
      return;
    }
    axios.get(`http://localhost:4000/verifyToken?token=${token}`).then(
      response=>{
        setUserSession(response.data.token, response.data.user)
        setAuthLoading(false);
      }).catch(error=>{
        removeUserSession();
        setAuthLoading(false);
      })
    
  },[]);
  if(authLoading && getToken()){
    return <div className="content">Checking Authentication...</div>

  }

  return (
    <div className="App">
      <BrowserRouter>
        
        <div className="content">
          <Switch>
            <PublicRoute  exact path="/" component={Login}  />       
            <PrivateRoute  exact path="/dashboard" component={Dashboard}  />           
          </Switch>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
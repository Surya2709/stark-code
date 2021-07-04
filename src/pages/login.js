import React, {useState} from 'react';
import './login.css';
import kitchen from '../images/robo.gif';
import axios from 'axios';
import { setUserSession } from './Common';



const Login = (props) =>{

const [username, setUsername] = useState('');
const [password, setPassword] = useState('');

const [error,setError] = useState(null);
const [loading,setLoading] = useState(false);


const handleLogin =() => {

    setError(null);
    setLoading(true);

    axios.post('http://localhost:4000/users/signin',{
        username: username,
        password : password
    }).then(response=>{
        setLoading(false);
        setUserSession(response.data.token, response.data.user);
        props.history.push('/dashboard');
      
    }).catch(error=>{
        setLoading(false);
        if(error.response.status === 401 || error.response.status === 400){
            setError(error.response.data.message);
        }
        else{
            setError("something went wrong , pls try again.")
        }
    })

    //props.history.push('/dashboard')
}




    return(
        <div class="login-page">
           
            <div class = "form" >

                        <div class = 'logo'>

                        </div>

                        <form class= "login-form">
                           
                                <input type="text"  placeholder = " usernmae" value={username} onChange={ e => setUsername(e.target.value)}/>
                                
                            
                                <input type="password" placeholder = "passsword" data-type="password" value={password} onChange={ e => setPassword(e.target.value)}/>
                                
                               
                               
                                <div class="wrap">
                                        {error && <div className="error">{error}</div>}
                                </div>  

                                <input type="button" value={loading?"Loading..":"Login"} disabled = {loading} onClick={handleLogin} class="button"/>
                        
                        </form>
            </div>
        </div>
    

    );
}

export default Login;
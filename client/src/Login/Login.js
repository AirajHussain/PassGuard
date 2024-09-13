import { Link } from 'react-router-dom';
import React, { useState } from "react";
import "../Register/Register.css";
import logoImage from "./../Assets/logo1.png";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { signIn } from "../Actions/Actions";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [login, setLogin] = useState("");
  const [errorCheck, setErrorCheck]=useState("");


  const history = useHistory();
  const dispatch = useDispatch();

  const loginUser = () => {
          history.push("/dashboard/home");
 
    /*END OF ELSE*/
  };

  return (
    
    <div className="Register">
      <div className="logo">

      <a href="./login">
      <img src={logoImage} alt="Tiny Image" class="logo" ></img>
      </a>

      </div>
      <div className="header-class">
      <h3>Welcome to PassGuard</h3>
      <h4>A safe place to store your virtual credentials.</h4>

      </div>



      
        <div id="formContent">
          <h1> Sign in</h1>
          <form>
            {login !== "" && <h6>{login}</h6>}

            
            <input
              type="text"
              id="login"
              class="fadeIn first"
              name="login"
              placeholder="Enter email here"
              onChange={(e) => {
                setUsername(e.target.value);
              }}
              
            />
            
            
            <input
              type="password"
              id="login-password"
              class="fadeIn third"
              name="login"
              placeholder="Password"
              onChange={(e) => {
                setPassword(e.target.value);
                
              }}
              
            />

          <div>
          
          <a href="">Forgot your password?</a>
          </div>
           
            
            <input
              onClick={loginUser}
              type="button"
              class="fadeIn fourth"
              value="Log In"
            />
          
          </form>
        
          <div id="formFooter">
            <p class="accountreq">Need an account? &nbsp;</p>
            <Link to="/register" class="underlineHover">
              Register
            </Link> <br></br>


          </div>
        



        </div>
   
    </div>
  );
}

export default Login;

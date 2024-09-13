import { Link } from 'react-router-dom';
import "./Register.css";
import React, { useState } from "react";
import logoImage from "../Assets/logo1.png";
import Axios from "axios";
import { useHistory } from "react-router-dom";

function Register() {
  const [nameReg, setNameReg] = useState("");
  const [usernameReg, setUsernameReg] = useState("");
  const [passwordReg, setPasswordReg] = useState("");
  const [errorCheck, setErrorCheck]=useState("");

  //Stating variable to hold registration response message 
  const [register, setRegister] = useState("");
  const history = useHistory();

 

  const registerUser = () => {

    //Resetting the error message
    setErrorCheck("");
    
    //Assuring that the email must b
    const validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z]{2,})+$/;

    //variables for password checker 
    const hasCapital= /[A-Z]/.test(passwordReg);
    const hasLowerCase=/[a-z]/.test(passwordReg);
    const hasSymbol = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(passwordReg);
    const hasNumber = /\d/.test(passwordReg);
    const lengthValid= passwordReg.length >=10; 

    //Checking to see if follows the email format 
    const emailValid= validRegex.test(usernameReg);
    
    //Password strength setter
    if (!emailValid) {

      setErrorCheck(<h6>Invalid Email Format!</h6>);

    } else if (!hasCapital || !hasLowerCase || !hasSymbol || !hasNumber || !lengthValid) {

      setErrorCheck(<h6>Password does not meet the criteria</h6>);

    } else {

      Axios.post("http://localhost:3001/users/register", {
        name: nameReg,
        username: usernameReg,
        password: passwordReg,
        
      }).then((response) => {
        if (response.data.message) {

          setRegister(response.data.message);

        } else {

          history.push("/login");

        }
      });
    }
    
  };


  return (
    <div className="Register">

      <div className="logo">
      <a href="./login">
      <img src={logoImage} alt="Tiny Image" class="logo" ></img>
      </a>
      </div>

      <div className="header-class">
      <h3>Your security starts here</h3>
      <h4>Lets start with your email.</h4>
      

      </div>
      <div className="wrapper fadeInDown">
        
        <div id="formContent">
        <h1> Sign Up</h1>
        
        {errorCheck}
          <form>
            <input
              type="text"
              id="login"
              class="fadeIn first"
              name="name"
              placeholder="Name"
              onChange={(e) => {
                setNameReg(e.target.value);
              }}
            />
            <input
              type="text"
              id="login"
              class="fadeIn second"
              name="email"
        
              placeholder="Email"
              onChange={(e) => {
                setUsernameReg(e.target.value);
              }}
            />
            <input
              type="password"
              id="login-password"
              class="fadeIn third"
              name="password"
              placeholder="Password"
              onChange={(e) => {
                setPasswordReg(e.target.value);
              }}
            />

            <input
              onClick={registerUser}
              type="button"
              class="fadeIn fourth submit"
              value="Register"

              disabled={
                
                !nameReg || !usernameReg || !passwordReg 
                
              } 
              
            />
            

           
          
             <Link to="/login" class="preaccount">
              Already have an account? 
             </Link>

          </form>
            
              
            
        </div>
      </div>
    </div>
  );
}

export default Register;

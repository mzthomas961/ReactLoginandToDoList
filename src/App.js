import React, { useState } from "react";
import validator from 'validator'
  
const App = () => {
  
  const [emailError, setEmailError] = useState('')
  const [validationColor,setValidationColor] = useState('green')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const validateEmail = (e) => {
    // var email = e.target.value
    setEmail(e.target.value)

  
    if (validator.isEmail(email)) {
      setEmailError('Valid')
      setValidationColor('green')
    } else {
      setEmailError('Enter valid Email!')
      setValidationColor('red')
    }
   
  }

  function handleSubmit(e){
    e.preventDefault()
    console.log(email)
    console.log(password)

    fetch("http://dev.rapptrlabs.com/Tests/scripts/user-login.php", {
    method: "POST",
     headers: {
          "Content-Type" : "application/json",
      },
      body: JSON.stringify({
          email: email,
          password: password
          
      }),
  })
      .then((r) => r.json())
      .then((r) => console.log(r))
  }
  
  return (
    <div style={{
      margin: 'auto',
      marginLeft: '300px',
    }}>
      <pre>

        <form onSubmit={handleSubmit}> 
        <label> Email</label>
        <input 
        type="text" 
        className="userEmail" 
        id = "userEmail"
        placeholder="user@rapptrlabs.com"
        onChange={(e) => validateEmail(e)}/> 
        <span style={{
          fontWeight: 'bold',
          color: `${validationColor}`,
        }}>{emailError}</span>
        <label> Password</label>
          <input 
          className="password" 
          id="password" 
          type="password"
          onChange={(e) => setPassword(e.target.value)} 
          />
          <input type="Submit" />
        </form>
      </pre>
    </div>
  );
}
  
export default App

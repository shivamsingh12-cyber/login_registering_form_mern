import { useState } from 'react'
import './App.css'

function App() {
  const [login, setlogin]=useState(true);
  const [regEmail,setRegEmail]=useState('')
  const [regPass,setRegPass]=useState('')
  const [logEmail,setLogEmail]=useState('')
  const [logPass,setLogPass]=useState('')

  const handleLogin = async ()=>
    {
      if(logEmail.length==0 || logPass.length==0) alert('All fields are required')
        else{
      try {
        const response = await fetch('http://localhost:8000/login',{
          method:'POST',
          headers:{
            'Content-type':'application/json'
          },
          body: JSON.stringify({logEmail,logPass})
        })
        const res = await response.text();
        setLogEmail('');
        setLogPass('');
        alert(res)
      } catch (err) {
        alert(err)
        console.log(err)
      }
      }
    }

  //handleRegister
  const handleRegister = async ()=>{
    if (regEmail.length==0 || regPass.length==0) {
      alert('All fields are required')
    }
    else
    {
      try {
        const response = await fetch('http://localhost:8000/register',{
          method:'POST',
          headers:{
            'Content-type':'application/json'
          },
              body: JSON.stringify({
          regEmail: regEmail,  // Send as object, not array
          regPass: regPass
        })
        })
        const res = await response.text();
        setRegEmail('')
        setRegPass('')
        alert(res)
      } catch (err) {
        alert('We got an error');
        console.log(err)
      }
    }
  }
  return (
    <>
      <div className="container">
        <div className={`form_box ${login ? 'login_mode':'register_mode'}`}>
          <h2>{login?'Login':'Register'}</h2>
          {
            login ? 
            <>
                <input type="text" name="" placeholder='Email'  value={logEmail}  onChange={(e)=> setLogEmail(e.target.value)}/>
          <input type="password" name=""  placeholder='Password' value={logPass}  onChange={(e)=> setLogPass(e.target.value)}/>
          <button onClick={handleLogin}>
            Login</button>
          <p className="toggle_btn">
            Don't have Account <span onClick={()=>{setlogin(false)}}>Register</span>
          </p>
            </>:<>
                  <input type="text" name="" placeholder='Email' value={regEmail}  onChange={(e)=> setRegEmail(e.target.value)}/>
          <input type="password" name=""  placeholder='Password' 
           value={regPass}  onChange={(e)=> setRegPass(e.target.value)} />
          <button onClick={handleRegister}>Register</button>
          <p className="toggle_btn">
            Already have Account <span onClick={()=>{setlogin(true)}}>Login</span>
          </p>
            </>
          }
      
        </div>
      </div>
    </>
  )
}

export default App

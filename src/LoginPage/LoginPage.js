import React from 'react';
import axios from 'axios';



function LoginPage() {
  function login() {
    const data = {
      username: document.getElementById('username').value,
      password: document.getElementById('password').value
    }
    axios.post('/api/login', data)
      .then(res => {
        console.log(res);
      })
  }
  return (
    
    <div className="loginpage">
      <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css" integrity="sha384-BVYiiSIFeK1dGmJRAkycuHAHRg32OmUcww7on3RYdg4Va+PmSTsz/K68vbdEjh4u" crossOrigin="anonymous"></link>
      <script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.21.0/axios.min.js" integrity="sha512-DZqqY3PiOvTP9HkjIWgjO6ouCbq+dxqWoJZ/Q+zPYNHmlnI2dQnbJ5bxAHpAMw+LXRm4D72EIRXzvcHQtE8/VQ==" crossOrigin="anonymous"></script>
        <div className="container-fluid">
          <h1 className="row">Login</h1>

          <main>
            <div className="row">
              <label for="username">Username</label>
              <input type="text" name="username" id="username"/>
            </div>

            <div className="row">
              <label for="password">password</label>
              <input type="password" name="password" id="password"/>
            </div>

            <div>
              <button onClick={login()}>Login</button>
            </div>
          </main>

        </div>
    </div>
  );
}

export default LoginPage;
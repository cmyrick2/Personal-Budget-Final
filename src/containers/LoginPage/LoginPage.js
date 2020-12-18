import React from 'react';
import axios from 'axios';
import { reactLocalStorage } from "reactjs-localstorage";


function loginpage() {
  axios.post({method: 'POST', url: "http://localhost:3000/api/login", data: {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  }
}).then((res) => {
    document.getElementById("password").value = "";
    if (res && res.data) {
      if (res.data.ok === 1) {
        reactLocalStorage.set("jwt", res.data.token);
        reactLocalStorage.set("email", document.getElementById("email").value);
        window.location.assign("/homepage");
      } else {
        document.getElementById("errorMessage").innerText = res.data.error;
      }
    } else {
      document.getElementById("errorMessage").innerText = "Unknown";
      console.log(res);
    }
  });
}



function LoginPage() {
  return (
    
    <div className="loginpage">
      <form>
        <h2>Login</h2>
        <label>
            Email:
            <input type="text" name="email" id="email" placeholder="abc@gmail.com"/>
        </label>
        <label>
            Password:
            <input type="text" name="password" id="password" placeholder="123456"/>
        </label>
        <div>
            <button onClick={loginpage}>Login</button>
        </div>
      </form>
    </div>
  );
}
export default LoginPage;



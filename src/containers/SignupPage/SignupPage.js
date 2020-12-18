import React from 'react';
import axios from 'axios';
import { reactLocalStorage } from "reactjs-localstorage";


function signuppage() {
  axios.post({method: 'POST', url: "http://localhost:3000/api/signup", data: {
    email: document.getElementById("email").value,
    password: document.getElementById("password").value
  }
}).then((res) => {
    document.getElementById("password").value = "";
    if (res && res.data) {
      if (res.data === 'ok') {
        console.log('Got the token: ', res.data);
        reactLocalStorage.set("jwt", res.data.token);
        reactLocalStorage.set("email", document.getElementById("email").value);
        window.location.assign("/homepage");
      } else {
        alert(res.error)
      }
    } else {
      document.getElementById("errorMessage").innerText = "Unknown";
      console.log(res);
    }
  });
}



function SignupPage() {
  return (
    
    <div className="signuppage">
      <form>
        <h2>Sign Up</h2>
        <label>
            Email:
            <input type="text" name="email" id="email" placeholder="abc@gmail.com"/>
        </label>
        <label>
            Password:
            <input type="text" name="password" id="password" placeholder="123456"/>
        </label>
        <div>
            <button onClick={signuppage}>Sign Up</button>
        </div>
      </form>
    </div>
  );
}
export default SignupPage;

import React from "react";
import "./loginPage.css"
import axios from "axios";
import Cookies from "universal-cookie";

// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";

export default function LoginPage(props) {

  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  
  const handleChangeUsername = event => {
    setUsername(event.target.value);
  };
  const handleChangePassword = event => {
    setPassword(event.target.value);
  };
  const onSubmit =() =>{
      if (username === "" || password === ""){
        alert("Please fill in all fields...");
        return;
      }
        const cookies = new Cookies();
        axios
          .post("http://localhost:5000/api/login", {
            username: username,
            password: password
          })
          .then(res => {
            if (res.status === 200) {
              cookies.set("token", res.data.data.token);
              cookies.set("usertype", res.data.data.user.usertype);
              cookies.set("username",username)
              window.location.replace("/profile");
            }
          })
          .catch(error=>alert("Invalid username or password..."))
      
  }
  const cookies = new Cookies();
  const token = cookies.get("token");
  if (token === undefined || token === "undefined"){
    return (
      <div className="lpMain">
        <Header
        color="transparent"
        brand="Home"
        rightLinks={<HeaderLinks/>}
        fixed
        />
        <div className="lpContainer">
          <div className="lpText">
            <h1 className="head">Login</h1>
            <p>No Account? <a href="/register">Sign up</a></p>
          </div>
          <form className="lpForm">
            <input type="text" className="username" placeholder="Username" onChange={handleChangeUsername}/>
            <input type="password" className="password" placeholder="Password" onChange={handleChangePassword}/>
            <button type="button" onClick={onSubmit} className="a1">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Login
            </button>
          </form>
        </div>
        <div className="lpFooter">
          <Footer whiteFont/>
        </div>
      </div>
      
    )
  }
  else{
    window.location.replace("/");
  }
}

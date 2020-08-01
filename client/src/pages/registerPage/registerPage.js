import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "./registerPage.css"
// @material-ui/core components
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";

export default function RegisterPage(props) {
  const [userType, setType] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [firstName, setFirstName] = React.useState("");
  const [lastName, setLastName] = React.useState("");

  const handleChangeType = event => {
    setType(event.target.value);
  };
  const handleChangeUsername = event => {
    setUsername(event.target.value);
  };
  const handleChangePassword = event => {
    setPassword(event.target.value);
  };
  const handleChangeFirstName = event => {
    setFirstName(event.target.value.charAt(0).toUpperCase()+event.target.value.slice(1));
  };
  const handleChangeLastName = event => {
    setLastName(event.target.value.charAt(0).toUpperCase()+event.target.value.slice(1));
  };
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };
  const onSubmit =() =>{
    if (username === "" || password === "" || userType === ""|| firstName === ""|| lastName === ""){
      alert("Please fill-in all fields");
      return;
    }
      axios.post("http://localhost:5000/api/users/"+userType+"/register",{
      username: username,
      password: password,
      firstName: firstName,
      lastName: lastName
    }).then(res => {
      if (res.status === 200) {
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
          });
      }
    })
    .catch(e=>alert("Username already exists"));

}
  const cookies = new Cookies();
  const token = cookies.get("token");
  if (token === undefined || token === "undefined"){
  return (
    <div className="rpMain" >
      <Header
        color="transparent"
        brand="Home"
        rightLinks={<HeaderLinks/>}
        fixed
        changeColorOnScroll={{
          height: 1,
          color: "dark"
        }}
      />
      <div className="rpContainer">
        <div className="rpText">
          <h1 className="head">Register</h1>
          <p>Already Registered? <a href="/login">Sign In</a></p>
        </div>
        <form className="rpForm">
          <div className="rpnameContainer">
            <input type="text" className="rpname" placeholder="First Name" onChange={handleChangeFirstName}/>
            <input type="text" className="rpname" placeholder="Last Name"  onChange={handleChangeLastName}/>
          </div>
          <input type="text" className="rpusername" placeholder="Username" onChange={handleChangeUsername}/>
          <input type="password" className="rppassword" placeholder="Password" onChange={handleChangePassword}/>
          <Select
            labelId="userType"
            id="userType"
            open={open}
            onClose={handleClose}
            onOpen={handleOpen}
            value={userType}
            displayEmpty
            onChange={handleChangeType}
            style={{textAlign:"center",color:"#999"}}
          >
            <MenuItem value="" disabled>
              Please Select a Type
            </MenuItem>
            <MenuItem value='admin'>Admin</MenuItem>
            <MenuItem value='client'>Client</MenuItem>
            <MenuItem value='translator'>Translator</MenuItem>
          </Select>
          <button type="button" onClick={onSubmit} className="a1">
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              Register
          </button>
        </form>
      </div>
      <div className="rpFooter">
        <Footer whiteFont/>
      </div>
    </div>
  );
  }
  else{
    window.location.replace("/")
  }
}


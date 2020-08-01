import React from "react";
import axios from "axios";
import Cookies from "universal-cookie";
import "./profilePage.css"

// core components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
import profile from "../../images/profile.png";

import SectionAdmin from "./Sections/adminSection"
import SectionTranslator from "./Sections/translatorSection"
import SectionClient from "./Sections/clientSection"

export default function ProfilePage(props) {
  const [usertype, setUsertype] = React.useState("");
  const [firstName, setfirstName] = React.useState("");
  const [lastName, setlastName] = React.useState("");

  React.useEffect(() => {
    const cookies = new Cookies();
    const token = cookies.get("token");
    axios.get("http://localhost:5000/api/users", {
        headers: {
          Authorization: token
        }
      })
      .then(res => {
          setfirstName(res.data.data.firstName)
          setlastName(res.data.data.lastName)
          setUsertype(res.data.data.usertype)
      });
  },[]);
  const cookies = new Cookies();
  const token = cookies.get("token");
  if (token === undefined || token === "undefined"){
    window.location.replace("/");
  }
  else{
    return (
      <div className="ppMain">
        <Header
          color="transparent"
          brand="Home"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 50,
            color: "primary"
          }}
        />
        <div className="ppCover"/>
        <div className="ppSections">
          <div className="ppProfile">
            <img src={profile} alt="..." className="ppImg" />
            <h3 className="name">{firstName+" "+lastName}</h3>
            <h6 className="type">{usertype}</h6>            
          </div>
          <div className="ppTable">
            {usertype === "Admin" ? (
                <SectionAdmin />
              ) : usertype === "Translator" ? (
                <SectionTranslator />
              ) : usertype === "Client" ? (
                <SectionClient />
              ) : (
                <div/>
              )
            }
          </div>
        </div>
        <Footer />       
      </div>
    );
  }
}

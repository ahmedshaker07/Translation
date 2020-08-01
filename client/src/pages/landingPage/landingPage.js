import React from "react";
import "./landingPage.css"
//animations
import 'animate.css/animate.min.css' 
// made components
import Header from "../../components/Header/Header.js";
import Footer from "../../components/Footer/Footer.js";
import HeaderLinks from "../../components/Header/HeaderLinks.js";
// Sections for this page
import WelcomeSection from "./Sections/welcomeSection.js";
import RegisterSection from "./Sections/registerSection.js";
import WhyUsSection from "./Sections/whySection";
import ContactSection from "./Sections/contactSection.js";

export default function LandingPage(){
  return (  
    <div className="backDiv">
      <Header
        color="transparent"
        brand="Home"
        rightLinks={<HeaderLinks/>}
        fixed
        changeColorOnScroll={{
          height: 200,
          color: "primary"
        }}
      />
      <WelcomeSection/>
      <RegisterSection/>
      <WhyUsSection image={require("../../images/video-background.jpg")}/>
      <ContactSection image={require("../../images/contact-background.jpg")}/>
      <Footer color="#fff" bcolor="#262431"/>
    </div>
  );
}

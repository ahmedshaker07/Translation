import React from "react";

// @material-ui/icons
import ClientIcon from '@material-ui/icons/AccountBox';
import TranslatorIcon from '@material-ui/icons/Translate';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
// @material-ui/core
import { makeStyles } from "@material-ui/core/styles";
//animation
import ScrollAnimation from 'react-animate-on-scroll';

const styles={
  Icons: {
    color: "#09b7c9",
    width: "40px",
    height: "40px"
  }
}
const useStyles = makeStyles(styles);

export default function ProductSection() { 
  const classes = useStyles();

  return (
    <div className="mainDiv">
       <ScrollAnimation animateIn="fadeInUp">
        <div className="psTitleDiv">
          <h2 className="psTitle">REGISTER NOW</h2>
          <h5 className="psDescription">
            We provide a wide range of translation services to almost all worldwide languages.
          </h5>
        </div>
      </ScrollAnimation>
      <div className="psBoxesContainer">
        <ScrollAnimation animateIn="fadeInUp"  duration={1}>
          <div className="box">
            <div className="boxContent">
              <SupervisorAccountIcon className={classes.Icons}/>
              <h1 className="title">Admin</h1>
              <p className="desc">Admins can assign requests to available translators and help us keep things organized.</p>
              <a href="/register"> </a>
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp"  duration={.5}>
          <div className="box">
            <div className="boxContent">
              <ClientIcon className={classes.Icons} />
              <h1 className="title">Client</h1>
              <p className="desc">Clients can make requests to get a translator to serve all their translation needs.</p>
              <a href="/register"> </a>
            </div>
          </div>
        </ScrollAnimation>
        <ScrollAnimation animateIn="fadeInUp"  duration={1.5}>
          <div className="box">
            <div className="boxContent" >
              <TranslatorIcon className={classes.Icons} />
              <h1 className="title">Translator</h1>
              <p className="desc">Translators get requests if they are available to serve and help clients with all their translation needs.</p>
              <a href="/register"> </a>
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}

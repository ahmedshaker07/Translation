import React from "react";

//material ui
import MonetizationOnIcon from '@material-ui/icons/MonetizationOn';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { makeStyles } from "@material-ui/core/styles";

const styles={
  Icons: {
    color: "#09b7c9",
    width: "40px",
    height: "40px"
  }
}

const useStyles = makeStyles(styles);
export default function WhyusSection(props) {
  const img= props.image;
  const classes= useStyles();
  return (
    <div className="wuMain" style={{backgroundImage: "url(" + img + ")"}}>
      <div className="wuTitle">
        <h2 className="title">WHY WORK WITH US</h2>
        <h5 className="desc">
          We have been translating since 1994. Evolving our translation services for the digital world.
        </h5>
      </div>
      <div className="wuBoxesContainer">
        <div className="box">
         <div className="boxContent">
          <CheckCircleIcon className={classes.Icons}/>
          <h1 className="title">Qualified Translators</h1>
          <p className="desc">Certified translators of 100+ languages and experts of 40+ industries. We hire only the top talent.</p>
         </div>
        </div>
        <div className="box">
         <div className="boxContent">
          <MonetizationOnIcon className={classes.Icons}/>
          <h1 className="title">Budget Friendly</h1>
          <p className="desc">Get high quality translation within your budget. Choose from our packages or get a custom one made that works for you. We’re flexible.</p>
         </div>
        </div>
      </div>
    </div>
  );
}

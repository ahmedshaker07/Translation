/*eslint-disable*/
import React from "react";
// nodejs library to set properties for components
import PropTypes from "prop-types";
// nodejs library that concatenates classes
import classNames from "classnames";
// material-ui core components
import {makeStyles} from "@material-ui/core/styles";

// @material-ui/icons

const styles = {
  block: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "500",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    textDecoration: "none",
    position: "relative",
    display: "block"
  },
  left: {
    float: "left!important",
    display: "block"
  },
  right: {
    padding: "15px 0",
    margin: "0",
    // color: "#fff",
    float: "right!important"
  },
  footer: {
    padding: "0.9375rem 0",
    textAlign: "center",
    display: "flex",
    // backgroundColor: "#262431",
    zIndex: "2",
    position: "relative"
  },
  a: {
    color: "cornflowerblue",
    textDecoration: "none",
    backgroundColor: "transparent"
  },
  footerWhiteFont: {
    "&,&:hover,&:focus": {
      color: "#FFFFFF"
    }
  },
  container:{
    paddingRight: "15px",
    paddingLeft: "15px",
    marginRight: "auto",
    marginLeft: "auto",
    width: "100%",
    // "@media (min-width: 576px)": {
    //   maxWidth: "540px"
    // },
    // "@media (min-width: 768px)": {
    //   maxWidth: "720px"
    // },
    // "@media (min-width: 992px)": {
    //   maxWidth: "960px"
    // },
    // "@media (min-width: 1200px)": {
    //   maxWidth: "1140px"
    // }
  },
  list: {
    marginBottom: "0",
    padding: "0",
    marginTop: "0"
  },
  inlineBlock: {
    display: "inline-block",
    padding: "0px",
    width: "auto"
  },
  icon: {
    width: "18px",
    height: "18px",
    position: "relative",
    top: "3px"
  }
}
const useStyles = makeStyles(styles);

export default function Footer(props) {
  const classes = useStyles();
  const { whiteFont } = props;
  const footerClasses = classNames({
    [classes.footer]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  const aClasses = classNames({
    [classes.a]: true,
    [classes.footerWhiteFont]: whiteFont
  });
  return (
    <footer className={footerClasses} style={{backgroundColor: props.bcolor}}>
      <div className={classes.container} >
        <div className={classes.right} style={{color: props.color}}>
          &copy; {1900 + new Date().getYear()}, Made by{" "}
          <a
            href="/"
            className={aClasses}
            target="_blank"
          >
            Shaker
          </a>
        </div>
      </div>
    </footer>
  );
}

Footer.propTypes = {
  whiteFont: PropTypes.bool
};

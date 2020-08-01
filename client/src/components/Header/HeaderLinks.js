/*eslint-disable*/
import React from "react";
import Cookies from "universal-cookie";
// react components for routing our app without refresh
import { Link } from "react-router-dom";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
// @material-ui/icons
import { Apps } from "@material-ui/icons";
// core components
import CustomDropdown from "../../components/CustomDropdown/CustomDropdown.js";
import Button from '@material-ui/core/Button';

const styles = theme => ({
  list: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontWeight: "300",
    lineHeight: "1.5em",
    fontSize: "14px",
    margin: 0,
    paddingLeft: "0",
    listStyle: "none",
    paddingTop: "0",
    paddingBottom: "0",
    color: "inherit"
  },
  listItem: {
    float: "left",
    color: "inherit",
    position: "relative",
    display: "block", 
    width: "auto",
    margin: "0",
    padding: "0",
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      "&:after": {
        width: "calc(100% - 30px)",
        content: '""',
        display: "block",
        height: "1px",
        marginLeft: "15px",
        backgroundColor: "#e5e5e5"
      }
    }
  },
  listItemText: {
    padding: "0 !important"
  },
  navLink: {
    color: "inherit",
    position: "relative",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    borderRadius: "3px",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    "&:hover,&:focus": {
      color: "inherit",
      background: "rgba(200, 200, 200, 0.2)"
    },
    [theme.breakpoints.down("sm")]: {
      width: "calc(100% - 30px)",
      marginLeft: "15px",
      marginBottom: "8px",
      marginTop: "8px",
      textAlign: "left",
      "& > span:first-child": {
        justifyContent: "flex-start"
      }
    }
  },
  notificationNavLink: {
    color: "inherit",
    padding: "0.9375rem",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex",
    top: "4px"
  },
  registerNavLink: {
    top: "3px",
    position: "relative",
    fontWeight: "400",
    fontSize: "12px",
    textTransform: "uppercase",
    lineHeight: "20px",
    textDecoration: "none",
    margin: "0px",
    display: "inline-flex"
  },
  navLinkActive: {
    color: "inherit",
    backgroundColor: "rgba(255, 255, 255, 0.1)"
  },
  icons: {
    width: "20px",
    height: "20px",
    marginRight: "3px"
  },
  socialIcons: {
    position: "relative",
    fontSize: "20px !important",
    marginRight: "4px"
  },
  dropdownLink: {
    "&,&:hover,&:focus": {
      color: "inherit",
      textDecoration: "none",
      display: "block",
      padding: "10px 20px"
    }
  },
  marginRight5: {
    marginRight: "5px"
  }
})
const useStyles = makeStyles(styles);

export default function HeaderLinks(props) {
  const cookies = new Cookies();
  const token = cookies.get("token");
  const classes = useStyles();

  if (token === undefined || token === "undefined"){
    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
          <CustomDropdown
            noLiPadding
            buttonText="Register/Login"
            buttonProps={{
              className: classes.navLink
            }}
            buttonIcon={Apps}
            dropdownList={[
              <Link to="/login" className={classes.dropdownLink}>
                Login
              </Link>,
              <Link to="/register" className={classes.dropdownLink}>
                Register
              </Link>
            ]}
          />
        </ListItem>
      </List>
    );
  }
  else{
    return (
      <List className={classes.list}>
        <ListItem className={classes.listItem}>
        <Button
          color="primary"
          className={classes.navLink}
          onClick={() => {
            window.location.replace("/profile");
          }}
        >
          My Profile
        </Button>

        </ListItem>
        <ListItem className={classes.listItem}>
          <Button
              color="primary"
              className={classes.navLink}
              onClick={() => {
                const cookies = new Cookies();
                cookies.set("token", undefined);
                cookies.set("usertype", undefined);
                cookies.set("username", undefined);
                // alert("You have successfully logged out!");
                window.location.replace("/");
              }}
            >
              Logout
          </Button>
        </ListItem>
      </List>
    );
  }
}

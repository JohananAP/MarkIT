import React from "react";
import { Link } from "react-router-dom";
import {
  Grid,
  TextField,
  Card,
  Button,
  FormControlLabel,
  Checkbox,
} from "@material-ui/core";
import { Avatar } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import MuiAlert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import Box from '@material-ui/core/Box';
import Icon from '@material-ui/core/Icon';
import { useHistory } from 'react-router';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import { useState } from "react";
import axios from 'axios';
import markit_logo from "../images/markit_logo.png";


function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme) => ({
  margin: {
    margin: theme.spacing(1),
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7),
  },
}));

function Login() {
  const cardStyle = {
    padding: 50,
    height: "auto",
    width: 350,
    margin: "112px auto",
  };

  const avatarStyle = { backgroundColor: "#000000" };
  const classes = useStyles();

  // const [firstname, setfirstname] = useState("");
  // const [lastname, setlastname] = useState("");
  const [password, setpassword] = useState("");
  const [email, setemail] = useState("");
  //const [confirmPassword, setconfirmPassword] = useState("");

  //const [validPassword, setvalidPassword] = useState(true);
  //const [validUsername, setvalidUsername] = useState(true);
  // const [validFirstname, setvalidFirstname] = useState(true);
  // const [validLastname, setvalidLastname] = useState(true);
  //const [validConfPwd, setvalidConfPwd] = useState(true);
  const [validEmail, setvalidEmail] = useState(true);
  const [validTnC, setvalidTnC] = useState(true);
  const [tnc, settnc] = useState(false);
  //const [authStatus, setauthStatus] = useState(false);

  //const [isRegister, setisRegister] = useState(false);
  const [open, setOpen] = React.useState(false);

  const user_authentication_api = "/api/login/user-auth";

  const history = useHistory();

  const handleInput = (event) => {
    // if (event.target.name === "firstname") {
    //   setfirstname(event.target.value);
    //   handleUsername(event.target.id, event.target.value);
    // }
    // if (event.target.name === "lastname") {
    //   setlastname(event.target.value);
    //   handleUsername(event.target.id, event.target.value);
    // }
    if (event.target.name === "password") {
      setpassword(event.target.value);
      //handlePassword(event.target.value);
    }
    if (event.target.name === "email") {
      setemail(event.target.value);
      handleEmail(event.target.value);
    }
    // if (event.target.name === "confirmPassword") {
    //   setconfirmPassword(event.target.value);
    //   handleConfirmPassword(event.target.value);
    // }
    if (event.target.name === "tnc") {
      settnc(event.target.checked);
      handleTnC(event.target.checked);
    }
  };

  // const handleUsername = (nameValue, userName) => {
  //   let boolName = false;
  //   const regex = /^\w+$/;
  //   if (userName !== null && userName !== "") {
  //     boolName = regex.test(userName);
  //   }
  //   if (nameValue === "firstname") {
  //     setvalidFirstname(boolName);
  //   }
  //   if (nameValue === "lastname") {
  //     setvalidLastname(boolName);
  //   }
  // };

  // const handlePassword = (passWord) => {
  //   if (passWord !== null || passWord !== "") {
  //     const regex =
  //       /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[%$&!*@?])[A-Za-z\d@$!%*?&]{8,}$/;
  //     setvalidPassword(regex.test(passWord));
  //   }
  // };

  // const handleConfirmPassword = (passWord) => {
  //   if (passWord !== null && passWord !== "") {
  //     if (password === passWord) setvalidConfPwd(true);
  //     else setvalidConfPwd(false);
  //   } else {
  //     setvalidConfPwd(false);
  //   }
  // };

  const handleEmail = (emailID) => {
    if (emailID !== null || emailID !== "") {
      const regex = /^[\w-.]+@([\w-]+.)+[\w-]{2,4}$/;
      setvalidEmail(regex.test(emailID));
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // handleUsername("firstname", firstname);
    // handleUsername("lastname", lastname);
    //handlePassword(password);
    //handleConfirmPassword(confirmPassword);
    handleEmail(email);
    handleTnC(tnc);

    setOpen(false);

    if (tnc && email) {
      async function authenticateUser() {
        await axios.post(user_authentication_api,
          {}, { headers: { 'email': email, 'password': password } }).then((response) => {
            console.log(response);
            if (response.status === 200) {
              console.log('Login successful!');
              history.push('/home');
              //User session
              sessionStorage.setItem('markit-email', email);
              console.log(sessionStorage.getItem('markit-email'));
            }
          }).catch((error) => {
            console.log(error);
            setOpen(true);
            sessionStorage.setItem('markit-email', "");
          });
      }
      authenticateUser();
    }
  };

  // const handleRegistration = () => {
  //   setisRegister(true);
  // };

  const handleTnC = (tncValue) => {
    settnc(tncValue);
    setvalidTnC(tncValue);
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  return (
    <div className="App">
      <Grid container spacing={3}>
        <Grid item lg={3} md={3}></Grid>
        <Grid item xs={12} lg={6} md={6}>
          <Card style={cardStyle}>
            <Grid align="center">
              <Avatar alt="" src={markit_logo} style={avatarStyle} className={classes.large}></Avatar>
              <Typography variant="body1" gutterBottom >
                <Box fontFamily="Monospace" fontWeight="fontWeightBold" fontSize="h5.fontSize" m={1}>
                  LOGIN
                </Box>
              </Typography>
            </Grid>

            <form>
              <div>
                <TextField
                  label="Email"
                  placeholder="Email address"
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  name="email"
                  id="email"
                  error={!validEmail}
                  helperText={validEmail ? "" : "Enter a valid email address."}
                  onChange={handleInput}
                ></TextField>
              </div>
              <div>
                <TextField
                  label="Password"
                  type="password"
                  fullWidth
                  placeholder="Enter password"
                  name="password"
                  id="password"
                  variant="outlined"
                  margin="normal"
                  onChange={handleInput}
                ></TextField>
              </div>
              <div>
                <Grid align="left">
                  <Link to="/reset">
                    <Box fontSize={14} m={1}>
                      Forgot password?
                    </Box>
                  </Link>
                </Grid>
              </div>
              <div>
                <Grid align="center">
                  <Box fontSize={12} m={1}>
                    <Checkbox
                      name="tnc"
                      checked={tnc}
                      onChange={handleInput}
                      color="primary"
                    ></Checkbox>
                    <Link
                      variant="body1"
                      href="https://3912.cupe.ca/documents/collective-agreements/"
                    >
                      Agree to Terms and Conditions.
                    </Link>
                  </Box>
                </Grid>
              </div>
              <p
                className={validTnC ? "hidden" : "text-danger p-tag-alert"}
                style={{ color: "red", "font-size": "x-small" }}
              >
                {" "}
                Agree to the terms and conditions to login!
              </p>
              <div>
                <Grid align="center">
                  <Button
                    type="submit"
                    color="primary"
                    variant="contained"
                    onClick={handleSubmit}
                    className={classes.margin}
                    endIcon={<Icon>send</Icon>}
                  >
                    Sign in
                  </Button>
                  <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                      Invalid email or password!
                    </Alert>
                  </Snackbar>
                </Grid>
              </div>

              <div>
                New user?
                <Link to="/register">
                  <span> Sign up!</span>
                </Link>
              </div>
            </form>
          </Card>
        </Grid>

        <Grid item lg={3} md={3}></Grid>
      </Grid>
    </div>
  );
}

export default Login;

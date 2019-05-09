import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';
import firebase from './firebase'
import history from "./history";
import Link from '@material-ui/core/Link';

let styles = theme => ({
  main: {
    width: 'auto',
    display: 'block', // Fix IE 11 issue.
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing.unit * 8,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px ${theme.spacing.unit * 3}px`,
  },
  avatar: {
    margin: theme.spacing.unit,
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing.unit,
  },
  submit: {
    marginTop: theme.spacing.unit * 3,
  },
  signin: {
    marginTop: theme.spacing.unit * 2,
  },
});

let signup = (event) => {
  event.preventDefault();
  var db = firebase.firestore();
  let data = new FormData(event.target);
  let name =  data.get('name')
  let email = data.get('email')
  let password = data.get('password')
  firebase.auth().createUserWithEmailAndPassword(email, password)
  .then(function(user) {
    user = firebase.auth().currentUser;
    user.updateProfile({
        displayName: name
    }).then(function() {
        db.collection("users").doc(user.uid).set({
            uid: user.uid,
            uemail : user.email,
            uname:name,
            state: "CA",
            country: "USA"            
        })
        .then(function() {
            console.log("Document successfully written!");
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });

        history.replace("/dashboard")
    }, function(error) {
        // An error happened.
    });           
  })
  .catch(function(error) {
     var errorCode = error.code;
     var errorMessage = error.message;
     alert(error.message)
  });  
};

let signin = () => {
  history.push("/signin")  
};

let SignUp = (props) => {
  let { classes } = props;

  return (
    <main className={classes.main}>
      <CssBaseline />
      <Paper className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <form className={classes.form} onSubmit={signup}>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="name">Full Name</InputLabel>
            <Input id="name" name="name" autoComplete="name" autoFocus />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="email">Email Address</InputLabel>
            <Input id="email" name="email" autoComplete="email" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input name="password" type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign Up
          </Button>
          <Button
            fullWidth
            variant="text"
            color="primary"
            className={classes.signin}
            onClick={signin}
          >
          Sign In
          </Button>
        </form>
        
      </Paper>
    </main>
  );
}

SignUp.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SignUp);
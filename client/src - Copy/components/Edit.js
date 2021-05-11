import React, { useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Axios from 'axios';



//Importing Components
import Nav from './Nav';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

const Register = () => {
const classes  = useStyles();
    
    const [inputFields, setInputFields] = useState([
      {
        regNumber: "",
        firstName: "",
        lastName: "",
        email: "",
        course: "",
        dob: "",
      }
    ])
    // useEffect(() => {
    //     Axios.get(`http://localhost:3002/api/select/${id}`).then((response) => {
    //       setInputFields({...inputFields, })
    //     })
       
    //   }, []);
    // The state handler that is called when the value of text boxes change.
    const onChangeHandler = (event) => {
      const value = event.target.value;
      const name = event.target.name;
      setInputFields({...inputFields, [name]: value});
    };
    const submitHandler = (event) => {
      event.preventDefault();
      const uploadLink = "http://localhost:3002/api/insert";
      Axios.post(uploadLink, {
        regNumber: inputFields.regNumber,
        firstName: inputFields.firstName,
        lastName: inputFields.lastName,
        course: inputFields.course,
        email: inputFields.email,
        dob: inputFields.dob,
      });    
      setInputFields(
        {
          regNumber: "",
          firstName: "",
          lastName: "",
          course: "",
          email: "",
          dob: "",  
        });      
    }

        return (
            <div>
                <Nav />
                <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          New Student
        </Typography>
        <form className={classes.form} noValidate>
          <Grid container spacing={2}>
          <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="regNumber"
                label="Reg. Number"
                name="regNumber"
                value = {inputFields.regNumber}
                onChange = {onChangeHandler}
                autfocus
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                name="firstName"
                variant="outlined"
                required
                fullWidth
                id="firstName"
                label="First Name"
                value = {inputFields.firstName}
                onChange = {onChangeHandler}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="lastName"
                label="Last Name"
                name="lastName"
                autoComplete="lname"
                value = {inputFields.lastName}
                onChange = {onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value = {inputFields.email}
                onChange = {onChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="course"
                label="Course"
                name="course"
                autoComplete="course"
                value = {inputFields.course}
                onChange = {onChangeHandler}
              />
            </Grid>
            
            <Grid item xs={12}>
             <TextField
                
                id="date"
                label="Birthday"
                type="date"
                name = "dob"
                className={classes.textField}
                maxDate={new Date()}  //maxDate
                InputLabelProps={{
                  shrink: true,
                }}
                value = {inputFields.dob}
                onChange = {onChangeHandler}
              />
            </Grid>
        </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick = {submitHandler}
          >
              Register
          </Button>
          
        </form>
      </div>
      </Container>
            </div>
        )
}

export default Register





// import React, { useState } from 'react';

// //Importing Components
// import Nav from './Nav';

// const Edit = () => {
//     const initialState = {

//     }
//     const [state, setstate] = useState(initialState);
//         return (
//             <div>
//                 <Nav />
//             </div>
//         )
// }

// export default Edit;

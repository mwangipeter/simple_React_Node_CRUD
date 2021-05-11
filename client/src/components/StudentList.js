import React, { useState, useEffect} from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { fade, makeStyles, withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import SortIcon from '@material-ui/icons/Sort';
import Axios from 'axios';
import {Link} from 'react-router-dom';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';
import SortByAlphaIcon from '@material-ui/icons/SortByAlpha';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';

import '.././App.css';
//Importing Components
import Nav from './Nav';
import Edit from './Edit';
const BootstrapInput = withStyles((theme) => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    
    
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginRight: theme.spacing(2),
      marginLeft: 0,
      width: '100%',
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(3),
        width: '350px',
      },
    },
    searchIcon: {
      padding: theme.spacing(0, 2),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }));

const StudentList = () => {
  const classes = useStyles();

    //Managing State of the Student List
    const initialState = {
      studentList: [], filteredStudentList:[]
    };
    const [state, setState] = useState(initialState);
    const [open, setOpen] = React.useState(false);
    const [inputFields, setInputFields] = useState([
      {
        id: "",
        regNumber: "",
        firstName: "",
        lastName: "",
        email: "",
        course: "",
        dob: "",
      }
    ])

    const handleSearch = (e) => {
      const filteredStudentList = state.studentList;
        const results = filteredStudentList.filter(student =>
            student.firstName.toLowerCase().includes(e.target.value.toLowerCase()) ||
            student.lastName.toLowerCase().includes(e.target.value.toLowerCase()) ||
            student.course.toLowerCase().includes(e.target.value.toLowerCase()) ||
            student.email.toLowerCase().includes(e.target.value.toLowerCase()) ||
            student.dob.toLowerCase().includes(e.target.value.toLowerCase()) ||
            student.regNumber.toLowerCase().includes(e.target.value.toLowerCase())
            
            );

        setState(prevState => ({
            ...prevState,
            filteredStudentList: results,
        }));
    };
    const [sortText, setSortValue] = useState("");
    const handleSortChange = (event) => {
      setSortValue(event.target.value);
    }

    
    //API Call To Get Data From The Database and Display it on the Table.
    const onStart = () => {
      Axios.get("http://localhost:3002/api/select").then((response) => {
        setState(prevState => ({
          ...prevState,
          studentList: response.data,
          filteredStudentList: response.data 
        }));
      })
    }
    useEffect(() => {
      onStart();     
    }, []);
    
    const handleClickOpen = (student) => {
      setOpen(true);
      Axios.get(`http://localhost:3002/api/update/${student}`).then((response) => {
        // setState(prevState => ({
        //   ...prevState,
        //   studentList: response.data,
        //   filteredStudentList: response.data 
        // }));
        const stud = response.data;
        setInputFields({...inputFields, 
            id: stud[0].id,
            regNumber: stud[0].regNumber,
            firstName: stud[0].firstName,
            lastName: stud[0].lastName,
            email: stud[0].email,
            course: stud[0].course,
            dob: stud[0].dob,
          
        
        })
        //console.log(stud[0].id);
      })

      
    };
    
    //Function for Updating Status of Form Fields.
    const onChangeHandler = (event) => {
      const value = event.target.value;
      const name = event.target.name;
      setInputFields({...inputFields, [name]: value});
    };

    //Function for Updating Student Details.
    const studentUpdateHandler = () => {
      const uploadLink = "http://localhost:3002/api/student/update";
      Axios.put(uploadLink, {
        id: inputFields.id,
        regNumber: inputFields.regNumber,
        firstName: inputFields.firstName,
        lastName: inputFields.lastName,
        course: inputFields.course,
        email: inputFields.email,
        dob: inputFields.dob,
      }); 
      setOpen(false);
      onStart();
    } 
    const handleClose = () => {
      setOpen(false);
    };
    const deleteStudent = (student) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this student record?");
      if(confirmDelete) {
        Axios.delete(`http://localhost:3002/api/delete/${student}`);
      }
    };
    const createTable = () => {
      return (
        state.filteredStudentList.map((value, key) => {
          return(
            <>
            <tr key = {value.id} >
                <td>{value.id}</td>
                <td>{value.regNumber}</td>
                <td>{value.firstName} {value.lastName} </td>
                <td>{value.email}</td>
                <td>{value.course}</td>
                <td>{value.dob}</td>
                <td><Button
                  type="submit"
                  variant="contained"
                  color="secondary"
                  className="btn btn-danger"
                  onClick = {() => deleteStudent(value.id)}
                    >
                   <i class="fa fa-trash"></i> Delete
                  </Button>
                </td>
                <td>
                  <Button
                  //to = {"/edit/"+value.id}
                  className = "btn btn-primary"
                  variant="contained"
                  color="primary"
                  type = "button"
                  onClick={() => handleClickOpen(value.id)}
                  >
                  <i class="fa fa-edit"></i> Edit
                  </Button>
                </td>
                
        </tr>
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Edit Student Details</DialogTitle>
        <DialogContent>
          <DialogContentText>
           Edit Student Details
          </DialogContentText>
          {/* <TextField
          value = {value.id} /> */}
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
                required
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
                   
        </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClose}
            className = "btn btn-danger"
            variant="contained"
            color = "secondary"
            type = "button">
            Cancel
          </Button>
          <Button
            onClick={studentUpdateHandler}
            className = "btn btn-primary"
            variant="contained"
            color="primary"
            type = "button">
            Update
          </Button>
        </DialogActions>
      </Dialog>
            </>
            
          )
        })
      )
    }
        return (
            <div>
                <br /><form className = "searchsort">
                {/* The Search Bar Div */}
                <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>            
            <input
                        className = "search-bar"
                        id="outlined-search"
                        placeholder="Search..."
                        type="search"
                        variant="outlined"
                        onChange = {handleSearch}
                    />
            </div>
            <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SortByAlphaIcon />
            </div>            
            <Select
          labelId="demo-simple-select-autowidth-label"
          id="demo-simple-select-autowidth"
          className = "search-bar"
          //value={age}
          onChange={handleSortChange}
          autoWidth
        >
          <MenuItem value="Sort By...">
            <em>Default</em>
          </MenuItem>
          <MenuItem value="regNumber">Sort by Reg. Number: </MenuItem>
          <MenuItem value="name">Sort by Name: </MenuItem>
          <MenuItem value="course">Sort by Course: </MenuItem>
          <MenuItem value="email">Sort by Email: </MenuItem>
          <MenuItem value="dob">Sort by D.o.B: </MenuItem>
        </Select>
            </div>
             </form>
            
            <br />
            {/* Creating the Table that will hold the students information pulled from the database. */}
            <table>
                <thead>
                    <tr>
                        <th>Row id</th>
                        <th>Reg. Number</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>course</th>
                        <th>D. O. B.</th>
                        <th>Delete Action</th>
                        <th>Edit Action</th>               
                    </tr>
                </thead>
                <tbody>      
                {/*Mapping through the Student List Array and returning all students in our database.*/}
                {createTable()}
                
                </tbody>
            </table>
            </div>
        )
}

export default StudentList

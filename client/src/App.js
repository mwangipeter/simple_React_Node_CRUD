import React, {Fragment} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
//Importing Components.
import Nav from './components/Nav';
import Register from './components/Register';
import StudentList from './components/StudentList';
import Edit from './components/Edit';

function App() {
  return (
    <Router>
    <div className="App">
      <Route exact path = '/' render = {props => (
        <Fragment>
          <Nav />
          <StudentList />
      </Fragment>
      )} />
      <Route exact path = '/register' component = {Register} />
      <Route exact path = '/edit/:id' component = {Edit} />    </div>
    </Router>
  );
}

export default App;

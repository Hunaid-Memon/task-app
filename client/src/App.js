import './App.css';
import { Fragment } from 'react';
import Navbar from './components/layout/Navbar';
import Home from './components/pages/Home';
import About from './components/pages/About';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import TaskState from './components/context/task/TaskState';

const App = () => {
  return (
    <TaskState>
      <Router>
        <Fragment>
          <Navbar />
          <div className="container">
            <Switch>
              <Route exact path='/' component={Home} />
              <Route exact path='/about' component={About} />
            </Switch>
          </div>
        </Fragment>
      </Router>
    </TaskState>
  );
}

export default App;

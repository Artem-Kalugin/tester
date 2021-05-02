import './App.css';
import { Header } from './components';
import { AdminPanel, Welcoming, Tests, Login, Registration, Test } from './pages';
import {
  Switch,
  Route,
  HashRouter as Router,
} from "react-router-dom";

const Main = () => {
  return (
    <>
    <Header />    
    <Switch>
      <Route exact path="/">
        <Welcoming />
      </Route>
      <Route path="/tests">
        <Tests />
      </Route>
      <Route path="/test">
        <Test />
      </Route>
      <Route path="/admin">
        <AdminPanel />
      </Route>
    </Switch> 
    </>
  )
}
function App() {
  return (
    <Router>
    <div className="App">
      <Switch>
        <Route exact path="/login">
          <Login />
        </Route>
        <Route exact path="/registration">
          <Registration/>
        </Route>
        <Route path='/'>
          <Main />
        </Route>
      </Switch> 
    </div>
    </Router>
  );
}

export default App;

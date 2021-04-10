import './App.css';
import { Header } from './components';
import { AdminPanel, Welcoming, Tests } from './pages';
import {
  Switch,
  Route,
  BrowserRouter as Router,
} from "react-router-dom";

function App() {
  return (
    <Router>
    <div className="App">
      <Header />    
      <Switch>
          <Route exact path="/">
            <Welcoming />
          </Route>
          <Route path="/tests">
            <Tests />
          </Route>
          <Route path="/admin">
            <AdminPanel />
          </Route>
        </Switch>  
    </div>
    </Router>
  );
}

export default App;

import Home from '../src/Containers/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import CoinDetails from './Containers/CoinDetails/CoinDetails';

function App() {
  return (
    <div className="App">
      <Router>
      <Switch>
        <Route component={Home} path="/" exact />
        <Route component={CoinDetails} path="/details/:coinId" exact />
      </Switch>

      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Inscription from './components/Inscription';
import Merci from './components/Merci';
import Error from './components/Error';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Redirect to='/inscription' />
        </Route>

        <Route exact path='/inscription'>
          <Inscription />
        </Route>

        <Route exact path='/merci/:name'>
          <Merci />
        </Route>

        <Route path='*'>
          <Error />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;

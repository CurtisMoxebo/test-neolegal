import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Inscription from './components/Inscription';
import Merci from './components/Merci';
import Error from './components/Error';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          <Inscription />
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

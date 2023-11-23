import AppRoutes from './router/Route';
import { BrowserRouter as Router } from 'react-router-dom';
import './assets/style/reset.css';

function App() {

  return (
  <Router>
    <div className="App">
      <AppRoutes />
    </div>
  </Router>
  );
}

export default App;

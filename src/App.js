import AppRoutes from './router/Route';
import Header from './components/Header';
import './assets/style/reset.css';

function App() {
  return (
    <div className="App">
      <Header />
      <AppRoutes />
    </div>
  );
}

export default App;

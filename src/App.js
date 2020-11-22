import './styles/App.css';

import Dashboard from './components/Dashboard';
import APOD from './components/APOD';
import Footer from './components/Footer';



function App() {
  return (
    <div className="app-container">
      <Dashboard />
      <APOD />
      <Footer />
    </div>
  );
}

export default App;

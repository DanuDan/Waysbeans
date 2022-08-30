import "bootstrap/dist/css/bootstrap.min.css";
import logo from './assets/Logo.svg';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import './App.css';
import './assets/styles.css'
import LandingPage from './pages/LandingPage';

function App() {
  return (
    <div className="App">
   <Router>
          <Routes>
            <Route exact path="/" element={<LandingPage/>}/>
          </Routes>
        </Router>
    </div>
  );
}

export default App;

import Navbar from './components/Navbar';
import BuyToken from './components/BuyToken';
import MintNFT from './components/MintNft';
import {
  BrowserRouter as Router,
  Route,
  Routes
} from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<BuyToken />} />
          <Route exact path="/mint" element={<MintNFT />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

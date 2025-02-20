import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import Api from "./component/Api";

function App() {
  return (
    <div className="bg-blue-950 mx-auto lg:flex lg:justify-center lg:items-center">

    
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<LandingPage  />} />
        
        {/* Route for API page */}
        <Route path="/api" element={<Api />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;

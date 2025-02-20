import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./component/LandingPage";
import Api from "./component/Api";

function App() {
  return (
    <Router>
      <Routes>
        {/* Default route */}
        <Route path="/" element={<LandingPage  />} />
        
        {/* Route for API page */}
        <Route path="/api" element={<Api />} />
      </Routes>
    </Router>
  );
}

export default App;

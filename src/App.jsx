import "./assets/style/style.scss";
import "./assets/s2.png";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LayoutPage from "./Layout";


const App = () => {

  
  return (
    <Router basename="/">
        <Routes>
        <Route path="/*" element={<LayoutPage />} />
        </Routes>
    </Router>

    );
};
export default App;

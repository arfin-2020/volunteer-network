import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';
import AddEvent from "./components/AddEvent/AddEvent";
import Events from "./components/Events/Events";
import HomePage from './components/HomePage/HomePage';
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import VolunteerList from "./components/VolunteerList/VolunteerList";


function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/register/events" element={<Events/>}/>
          <Route path="/add-Event" element={<AddEvent/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/volunteerList" element={<VolunteerList/>}/>
        </Routes>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;

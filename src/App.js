import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';
import AddEvent from "./components/AddEvent/AddEvent";
import AuthProvider from "./components/Context/AuthProvider";
import Events from "./components/Events/Events";
import HomePage from './components/HomePage/HomePage';
import Login from "./components/Login/Login";
import PageNotFound from "./components/PageNotFound";
import PrivateRoute from "./components/PrivateRoute/PrivateRoute";
import Register from "./components/Register/Register";
import SignUp from "./components/SignUp/SignUp";
import VolunteerList from "./components/VolunteerList/VolunteerList";


function App() {
  return (
    <div className="App">
      <Router>
      <AuthProvider>
        <Routes>
          <Route exact path="/" element={<HomePage/>}/>
          <Route path="/signUp" element={<SignUp/>}/>
          <Route path="/login" element={<Login/>}/>

          <Route paht='*' element={<PrivateRoute/>}>
            <Route path="/register/:id" element={<Register/>}/>
            <Route path="/register/events" element={<Events/>}/>
            <Route path="/add-Event" element={<AddEvent/>}/>
            <Route path="/volunteerList" element={<VolunteerList/>}/>
          </Route>
          <Route exact path="/:pageName" element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
        <ToastContainer />
      </Router>
    </div>
  );
}

export default App;

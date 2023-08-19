import React, { createContext ,useReducer} from 'react'
import "./App.css";
import { Route, Routes } from "react-router-dom";
import ResponsiveAppBar from "./components/Navbar";
import About from "./components/About";
import Wellness from "./components/Wellness";
import Register from "./components/Register";
import Login from "./components/Login";
import Home from "./components/Home";
import NotFound from "./components/NotFound";
import Logout from "./components/Logout";
import reducer,{ initialState}  from './reducer/UseReducer';


export const UserContext = createContext();
const Routing = () => {
  return (
    <Routes>
      <Route exact path="/" Component={Home} />
      <Route path="/profile" Component={About} />
      <Route path="/wellness" Component={Wellness} />
      <Route path="/login" Component={Login} />
      <Route path="/register" Component={Register} />
      <Route path="/logout" Component={Logout} />
      <Route exact path="*" Component={NotFound} />
    </Routes>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <>
      <UserContext.Provider value={{state,dispatch}}>
        <ResponsiveAppBar />
        <Routing />
      </UserContext.Provider>
    </>
  );
}

export default App;

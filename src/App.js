import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import {baseTheme} from './assets/global/Theme-variable'
import Themeroutes from "./routes/Router";
import Login from "./pages/Login/Login";
import { useGetUser } from "./hooks";
import FullLayout from "./layouts/FullLayout/FullLayout";
const App = () => {
  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;
  const [{ user, isLoading, isError }, dispatch] = useGetUser();
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/dashboard">
          {user ? <FullLayout user={user} dispatch={dispatch} /> : <Navigate to="/login" />}
        </Route>
        <Route path="/login">
          {user ? <Navigate to="/dashboard" /> : <Login dispatch={dispatch}/>}
        </Route>
        <Route exact path="/">
          <Login/>
        </Route>
        
      </Routes>
    </BrowserRouter>
  );
};

export default App;

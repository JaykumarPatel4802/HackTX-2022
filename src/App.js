import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import {baseTheme} from './assets/global/Theme-variable'
import Themeroutes from "./routes/Router";

import { useGetUser } from "./hooks";
import FullLayout from "./layouts/FullLayout/FullLayout";
import { Dashboard } from "@material-ui/icons";
const App = () => {
  
  const [{ user, isLoading, isError }, dispatch] = useGetUser();
  return (
    <BrowserRouter>
      <Routes>
      <Route path="/dashboard" element={<FullLayout/>} />
      {/* <Route path="/" element={<Login/>} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;

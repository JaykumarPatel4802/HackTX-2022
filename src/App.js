import React from "react";
import { BrowserRouter, Navigate, Route, Routes, useRoutes } from "react-router-dom";
import { ThemeProvider } from "@material-ui/core";
import {baseTheme} from './assets/global/Theme-variable'
import Themeroutes from "./routes/Router";

import { useGetUser } from "./hooks";

const App = () => {
  
  const [{ user, isLoading, isError }, dispatch] = useGetUser();
  const routing = useRoutes(Themeroutes);
  const theme = baseTheme;
  return (
    <ThemeProvider theme={theme}>
    {routing}
  </ThemeProvider>
  );
};

export default App;

import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Application_input from "./pages/Application/Application_input";
import Login from "./pages/Login/Login";
import { useGetUser } from "./hooks";

function App() {
  // eslint-disable-next-line
  const [{ user, isLoading, isError }, dispatch] = useGetUser();

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Application_input">
          {user ? <Redirect to="/todos" /> : <Application_input dispatch={dispatch}/>}
        </Route>
        <Route path="/login">
          {user ? <Redirect to="/todos" /> : <Login dispatch={dispatch}/>}
        </Route>
        <Route exact path="/">
          <Login />
        </Route>
        <Redirect to="/" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;

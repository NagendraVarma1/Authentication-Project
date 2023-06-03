import { Switch, Route } from "react-router-dom";

import Layout from "./components/Layout/Layout";
import UserProfile from "./components/Profile/UserProfile";
import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import { useContext } from "react";
import AuthContext from "./Store/auth-context";

function App() {
  const authCtx = useContext(AuthContext);

  return (
    <Layout>
      <Switch>
        {authCtx.loggedIn && <Route path="/" exact>
          <HomePage />
        </Route>}
        {!authCtx.loggedIn && <Route path="/auth">
          <AuthPage />
        </Route>}
        {authCtx.loggedIn && (
          <Route path="/profile">
            <UserProfile />
          </Route>
        )}
      </Switch>
    </Layout>
  );
}

export default App;

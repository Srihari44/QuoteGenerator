import React from "react";
import Home from "./Home";
import Shared from "./Shared";

import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/share/:id" exact component={Shared} />
      <Route render={() => <h1>Not Found!</h1>} />
    </Switch>
  );
};

export default App;

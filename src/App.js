import React from "react";
import Home from "./Home";
import Shared from "./Shared";

import { Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <h2 className="mt-4 mb-3">Quote Generator</h2>
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/share/:id" exact component={Shared} />
        <Route render={() => <h1>Not Found!</h1>} />
      </Switch>
    </div>
  );
};

export default App;

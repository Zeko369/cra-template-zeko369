import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ThemeProvider, CSSReset } from "@chakra-ui/core";

import theme from "./theme";

import Home from "./pages/Home";
import Page from "./pages/Page";
import NotFound from "./pages/NotFound";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CSSReset />
      <BrowserRouter>
        <Switch>
          <Route path="/page" component={Page} exact />
          <Route path="/" component={Home} exact />
          <Route path="/" component={NotFound} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

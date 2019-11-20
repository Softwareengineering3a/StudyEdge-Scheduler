import React from 'react';
import { Route, Switch, Redirect  } from 'react-router-dom';
import 'typeface-roboto';
import Home from "./views/Home/Home"
import NotFound from "./views/NotFound"
import Header from "./components/Header/Header"
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import testID from "./views/TestID/testID"


const App = () => {
  const theme = createMuiTheme({
    palette: {
      primary: { main: '#039be5' }, 
      secondary: { main: '#689f38' },
    },
  });

  return (
  <ThemeProvider theme={theme}>
    <div>
      <Header />
      <Switch>
        <Route exact path="/Home" component={Home} />
        <Route exact path="/">
          <Redirect to="/Home" />
        </Route>
        <Route exact path="/test/:id" component={testID} />
        <Route component={NotFound}/>
      </Switch>
    </div>
    </ThemeProvider>
  );
}

export default App;

import React from 'react';
import { Route, Switch } from 'react-router-dom';
import 'typeface-roboto';
import admin from "./views/Admin/admin";
import adminlogin from "./views/Admin/adminlogin";
import NotFound from "./views/NotFound";
import Header from "./components/Header/Header";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';
import testID from "./views/TestID/testID";
import student from "./views/Student/student";
import loginfail from "./views/loginfail";

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
        <Route exact path="/login/admin" component={adminlogin} />
        <Route exact path="/admin" component={admin} />
        <Route exact path="/login/:id" component={testID}/>
        <Route exact path="/student" component={student}/>
        <Route exact path="/loginfail" component={loginfail}/>
        <Route component={NotFound}/>
      </Switch>
    </div>
  </ThemeProvider>
  );
}

export default App;

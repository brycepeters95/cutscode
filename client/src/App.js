import { BrowserRouter as Router, Route, Routes,Navigate} from 'react-router-dom';
import Landing from './components/layout/Landing';
import './App.css';
import Nav from './components/layout/Nav'
import Footer from './components/layout/Footer';
import Register from './components/auth/Register';
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import UserDashboard from './components/user/UserDashboard';
import Login from './components/auth/Login';
import React, { Fragment, useEffect } from 'react';
import { loadUser } from './actions/auth';
import PrivateRoute from './components/routing/PrivateRoutes';
import BarberDashboard from './components/barber/BarberDashboard';
import Alert from './components/layout/Alert';


const App = () => {
  useEffect(() => {
    if (localStorage.token) {
      setAuthToken(localStorage.token);
    }
     store.dispatch(loadUser());

  }, []);
  return (
    <Provider store={store}>
<Router>
    <Nav/>
    <Alert />
    <Routes>
   
     <Route exact path = '/' element={<Landing/>} />
     <Route exact path = '/register' element={<Register/>} />
     <Route exact path = '/login' element={<Login/>} />
     <Route
            path="userdashboard"
            element={<PrivateRoute component={UserDashboard} />}
          />
              <Route
            path="barberdashboard"
            element={<PrivateRoute component={BarberDashboard} />}
          />
     </Routes>
     <Footer/>
  </Router>
  </Provider>
  );
}

export default App;

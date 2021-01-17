import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect, useState } from 'react';
import $ from 'jquery';
import './App.css';
import Header from './parts/Header';
import Home from './pages/Home';
import Footer from './parts/Footer';
import BlankPage from './pages/BlankPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  const resizeInnerDiv = () => {
    var height = $(window).height();	
    var header_height = $(".header").height();
    var footer_height = $(".footer").height();
    var setheight = height - header_height;
    var trueheight = setheight - footer_height;
    $(".page-container").css("min-height", trueheight);
  }

  useEffect(() => {
      if($('.page-container').length > 0){
          resizeInnerDiv();
      }

      $(window).resize(function(){
          if($('.page-container').length > 0 ){
              resizeInnerDiv();
          }
      });
  })

  return (
    <div className="main-wrapper">
      <Router>
        <Header authenticated = {authenticated} setAuthenticated = {(e) => setAuthenticated(e)} />
        <div className="page-container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/blank">
              <BlankPage />
            </Route>
            <UnauthenticatedRoute path="/login">
              <Login setAuthenticated = {(e) => setAuthenticated(e)} />
            </UnauthenticatedRoute>
            <AuthenticatedRoute path="/dashboard">
              <Dashboard />
            </AuthenticatedRoute>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import './App.css';
import Header from './parts/Header';
import Home from './pages/Home';
import BlankPage from './pages/BlankPage';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AuthenticatedRoute from './components/AuthenticatedRoute';
import UnauthenticatedRoute from './components/UnauthenticatedRoute';
import { Main } from './assets/js/styles';
import MessageHub from './components/MessageHub';
import axios from 'axios';
import Modal from './components/Modal';

function App() {
  const ref = useRef(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [modal, setModal] = useState({
    id: "test",
    title: "test",
    body: <div></div>,
    footer: <div></div>
  })

  useEffect(() => {
    const jwtToken = localStorage.getItem("token") ?? "";
    axios.defaults.headers.common['Authorization'] = `Bearer ${jwtToken}`;
  }, [authenticated])

  return (
    <Main>
      <MessageHub children={add => (ref.current = add)} />
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
                <Login setAuthenticated = {(e) => setAuthenticated(e)} PushNotifRef={ref} />
              </UnauthenticatedRoute>
              <AuthenticatedRoute path="/dashboard">
                <Dashboard setAuthenticated={(e) => setAuthenticated(e)} PushNotifRef={ref} setModal={setModal} />
              </AuthenticatedRoute>
            </Switch>
          </div>
          {/*<Footer />*/}
        </Router>
      </div>
      <Modal content={modal} />
    </Main>
  );
}

export default App;



// const resizeInnerDiv = () => {
  //   var height = $(window).height();	
  //   var header_height = $(".header").height();
  //   var footer_height = $(".footer").height();
  //   var setheight = height - header_height;
  //   var trueheight = setheight - footer_height;
  //   $(".page-container").css("min-height", trueheight);
  // }

  // useEffect(() => {
  //     if($('.page-container').length > 0){
  //         resizeInnerDiv();
  //     }

  //     $(window).resize(function(){
  //         if($('.page-container').length > 0 ){
  //             resizeInnerDiv();
  //         }
  //     });
  // })
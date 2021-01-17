import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import './App.css';
import Header from './parts/Header';
import Home from './pages/Home';
import Footer from './parts/Footer';
import BlankPage from './pages/BlankPage';
import { useState, useEffect } from 'react';
import $ from 'jquery';

function App() {
  const [positioned, setPositioned] = useState(false);

  function resizeInnerDiv() {
    var height = $(window).height();	
    var header_height = $(".header").height();
    var footer_height = $(".footer").height();
    var setheight = height - header_height;
    var trueheight = setheight - footer_height;
    $(".page-container").css("min-height", trueheight);
  }
	
	useEffect(() => {
      if($('.page-container').length > 0 ){
          setPositioned(true);
          resizeInnerDiv();
      }
  
      $(window).resize(function(){
          if($('.page-container').length > 0 ){
              setPositioned(true);
              resizeInnerDiv();
          }
      });
  }, [positioned])

  return (
    <div className="main-wrapper">
      <Router>
        <Header />
        <div className="page-container">
          <Switch>
            <Route exact path="/">
              <Home />
            </Route>
            <Route path="/blank">
              <BlankPage />
            </Route>
          </Switch>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App;

import React, { Component } from "react";
import Directory from "./DirectoryComponent";
import CampsiteInfo from "./CampsiteInfoComponent";
import Header from "./HeaderComponent";
import Footer from "./FooterComponent";
import { Switch, Route, Redirect } from 'react-router-dom';
import { CAMPSITES } from "../shared/campsites";
import Home from "./HomeComponent";

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      campsites: CAMPSITES
    };
  }


  render() {

    const HomePage = () => {
      return (
        <Home />
      );
    };
    return (
      <div>
        <Header />
        <Switch>
          <Route path='/home' component={HomePage} />
          <Route exact='/directory' render={() => <Directory
          campsites={this.state.campsites}
        />} />
          <Redirect to="/home" />  
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default Main;

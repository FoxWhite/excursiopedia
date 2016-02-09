import React, { Component } from 'react';
import LogInForm from '../components/LogInForm'
import RegisterForm from '../components/RegisterForm'
// import ExampleForm from '../components/ExampleForm'

export default class App extends Component {

  ComponentDidMount() {
    const {store} = this.props;
    store.subscribe(render);
  }
  
  render() {
    return (
        <div>
          {/*<LogInForm onSubmit={this.handleLogInSubmit} />*/}
          <RegisterForm onSubmit={this.handleRegisterSubmit} />
        </div>
      );
  }

  handleRegisterSubmit = (data, dispatch) => {
    dispatch({
      type: 'ADD_USER',
      name: data.name,
      email: data.email,
      tel: data.tel,
      city: data.city,
      country: data.country,
      mobileOS: data.mobileOS
    });
    // console.log(store.getState());
  };

  handleLogInSubmit (data) {
    // const {store} = this.props;
    // store.dispatch({
    //   type: 'ADD_USER',
    //   name: "",
    //   email: "",
    //   tel: "",
    //   city: "",
    //   country: "",
    //   mobileOS: ""
    // });
    // console.log(store.getState());
  }

  
}


import React, { Component } from 'react';
import {connect} from 'react-redux';
import LogInForm from '../components/LogInForm'
import RegisterForm from '../components/RegisterForm'
// import ExampleForm from '../components/ExampleForm'

class App extends Component {  
  render() {
    const { activeView, handleChangeView } = this.props;
    return (
        <div>
          {activeView === 'FORM:LOGIN' &&
           <LogInForm onSubmit={this.handleLogInSubmit} onChangeView = {handleChangeView}/> 
          } 
          {activeView === 'FORM:REGISTER' && 
            <RegisterForm onSubmit={this.handleRegisterSubmit} onChangeView = {handleChangeView} /> 
          }
        </div>
      );
  }

  handleRegisterSubmit = (data, dispatch) => {
    // simulating server latency
    new Promise(resolve =>
        setTimeout(() => resolve(this.addUser(data,dispatch)), 500))
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
  
  handleChangeView () {

  }

  addUser (data,dispatch) {
    dispatch({
      type: 'ADD_USER',
      name: data.name,
      email: data.email,
      phone: data.phone.replace(/[^\d]/g, ''),
      city: data.city,
      country: data.country,
      mobileOS: data.mobileOS
    });
  }
}

//TODO: move to actions
const changeView = (newView) =>{
  switch (newView) {
    case 'FORM:LOGIN':
      return {type: 'SWITCH_TO_LOGIN'}
    case 'FORM:REGISTER':
      return {type: 'SWITCH_TO_REGISTER'}
    default:
      return {type: 'SWITCH_TO_LOGIN'}
  }
}


const mapStateToProps = (state) => {
    return {activeView: state.activeView};
}  
const mapDispatchToProps = (dispatch) => {
    return {
        handleChangeView: function(newView){ 
          dispatch(changeView(newView))},
    }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(App);
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
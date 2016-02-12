import React, { Component } from 'react';
import {connect} from 'react-redux';
import LogInForm from '../components/LogInForm'
import RegisterForm from '../components/RegisterForm'
import * as actions from '../actions/actions'

class App extends Component {  
  render() {
    const { activeView, handleChangeView } = this.props;
    return (
        <div>
          <div className = 'wrapper'>
            <div className = 'content-upper'>
              <div className = 'header-block'>
                <h3>PROTECT<span className='endline'>IM</span></h3>
              </div>
              <div className = {'desc' + (activeView === 'FORM:REGISTER' ? ' hidden' : '')}>
              Система СМС-авторизации это метод борьбы<br/> с попытками получения несанкционированного<br/> доступа к различным информационным системам.</div>
            
            </div>
            <div className = {'content-lower'  + (activeView === 'FORM:REGISTER' ? ' with-large-form' : '')}>
              <div className = {'content-lower-bg'}/>
              {activeView === 'FORM:LOGIN' &&
               <LogInForm onSubmit={this.handleLogInSubmit} onChangeView = {handleChangeView}/> 
              } 
              {activeView === 'FORM:REGISTER' && 
                <RegisterForm onSubmit={this.handleRegisterSubmit} onChangeView = {handleChangeView} /> 
              }
            </div>
          </div>
        </div>
      );
  }
}


const mapStateToProps = (state) => {
    return {activeView: state.activeView};
}  
const mapDispatchToProps = (dispatch) => {
    return {
        handleChangeView: function(newView){ 
          dispatch(actions.changeView(newView))},
    }
}

module.exports = connect(mapStateToProps,mapDispatchToProps)(App);
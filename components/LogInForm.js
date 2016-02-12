import React from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import _ from 'redux/node_modules/lodash';
import * as ls from '../helpers/localStorageHelpers'

class LogInForm extends React.Component {

  componentWillReceiveProps (nextProps) {    
    const {fields: {login}, generatePassword, psw, active} = this.props;
    if (login.touched && login.dirty && !psw && active !== 'login'){
      if(this.userFound()) {
        generatePassword();
      } else {
        nextProps.fields.login.error = 'Пользователь не найден';
      }
    }
  }

  render() {
    const {fields: {login, password}, handleSubmit, onChangeView, error, submitting} = this.props;
    console.log(login.error);
    return (
      <div className = 'form-login'>
        <div className = 'form-label'>Вход:</div>
        <div className = 'form-switch btn' onClick = {onChangeView.bind(null, 'FORM:REGISTER')}>Регистрация
          <span className = 'reg-arrow'/>
        </div>      
        <form onSubmit={handleSubmit(this.submit)}>
          <div className={'form-group' + (login.touched && login.error ? ' has-error' : '')}>
            <input 
              type="text" 
              placeholder="E-mail" 
              autoComplete={'off'}
              {...login}/>
            {login.touched && login.error && <div className = 'error-message'>{login.error}</div>}

          </div>
          <div className={'form-group' + (password.touched && password.error ? ' has-error' : '')}>
            <input 
              type="password" 
              placeholder="Пароль" 
              autoComplete={'new-password'}
              {...password}/>
            {password.touched && password.error && <div className = 'error-message'>{password.error}</div>}              
          </div>
          <div className = {"btn btn-send-pswd" + (login.error || !login.value ? " disabled" : "")} onClick = {this.handlePasswordSend}>Выслать пароль</div>
          <button type="submit" disabled = {submitting} className='btn btn-green submit'>Войти</button>
          <div className="checkbox-own-device">
            <input id="chbx-own" type="checkbox" name="check" value="chbx-own"/>
            <label htmlFor="chbx-own">чужой компьютер</label>
          </div>
        </form>
      </div>
    );
  }

  userFound = (login = this.props.fields.login.value) => {
    const emailList = ls.getUserEmails();
    return emailList.includes(login);
  };

  handlePasswordSend = () =>{
    const {fields: {login}, psw} = this.props;
    if (psw && this.userFound()){
      console.log('user found. sending pswd');
      alert(psw);
    }
    else {
      login.error = 'Пользователь не найден';
      this.forceUpdate();
    }
  };

  submit = (values, dispatch) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!(values.login)) {
          reject({login: 'Пожалуйста, введите e-mail', _error: 'Не удалось войти!'});
        } else if (!(values.password)) {
          reject({password: 'Пожалуйста, введите пароль', _error: 'Не удалось войти!'});
        } else if (!this.userFound(values.login)) {
          reject({login: 'Пользователь не найден', _error: 'Не удалось войти!'});
        } else if (values.password !== this.props.psw) {
          reject({password: 'Неверный пароль', _error: 'Не удалось войти!'});
        } else {
          // dispatch(actions.login(values.login)));
          alert('Успешный вход!')
          resolve();
        }
      }, 500); // simulate server latency
    });
  };
}

let loginForm =  reduxForm({ 
  form: 'login',                   
  fields: ['login', 'password']
})(LogInForm);

//TODO: move to actions
const ACTIONgeneratePassword = () =>{
  return {type: 'GENERATE_PSW'} 
}

const mapStateToProps = (state) => {
    return {
      userList: state.users,
      psw: state.currentPassword};
}  
const mapDispatchToProps = (dispatch) => {
    return {
        generatePassword: function(){ 
          dispatch(ACTIONgeneratePassword())
        }
    };
}
module.exports = connect(mapStateToProps, mapDispatchToProps)(loginForm);
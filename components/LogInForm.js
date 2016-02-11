import React from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import _ from 'redux/node_modules/lodash';

class LogInForm extends React.Component {

  componentWillReceiveProps (nextProps) {    
    const {fields: {login}, generatePassword, psw} = this.props;
    if (login.touched && login.dirty && !psw && this.loginIsCorrect()){
      generatePassword();
    }
  }

  render() {
    const {fields: {login, password}, handleSubmit, onChangeView, error, submitting} = this.props;
    return (
      <div className = 'form-login'>
        <div className = 'form-label'>Вход:</div>
        <div className = 'form-switch btn' onClick = {onChangeView.bind(null, 'FORM:REGISTER')}>Регистрация</div>      
        <form onSubmit={handleSubmit(this.submit)}>
          <div>
            <input 
              type="text" 
              placeholder="E-mail" 
              autoComplete={'off'}
              {...login}/>
            {login.touched && login.error && <div className = 'error-message'>{login.error}</div>}

          </div>
          <div>
            <input 
              type="password" 
              placeholder="Пароль" 
              autoComplete={'new-password'}
              {...password}/>
            {password.touched && password.error && <div className = 'error-message'>{password.error}</div>}              
          </div>
          <div className = "btn btn-send-pswd" onClick = {this.handlePasswordSend}>Выслать пароль</div>
          <button type="submit" disabled = {submitting} className='btn btn-green'>Войти</button>
          {error && <div className="login-error">{error}</div>}
        </form>
      </div>
    );
  }

  loginIsCorrect = () => {
    const {fields: {login}, userList} = this.props;

    const emailList = _.map(userList, 'email');
    return emailList.includes(login.value);
  };

  handlePasswordSend = () =>{
    const {fields: {login}, psw} = this.props;
    console.log('psw:', psw);
    if (psw && this.loginIsCorrect()){
      console.log('user found. sending pswd');
      alert(psw);
    }
    else {
      console.log('not in list!');
    }
  };

  submit = (values, dispatch) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (!(values.login)) {
          reject({login: 'Please enter e-mail!', _error: 'Login failed!'});
        } else if (!(values.password)) {
          reject({password: 'Please enter password!', _error: 'Login failed!'});
        } else if (!this.props.userList.includes(values.login)) {
          reject({login: 'User does not exist', _error: 'Login failed!'});
        } else if (values.password !== this.props.psw) {
          reject({password: 'Wrong password', _error: 'Login failed!'});
        } else {
          // dispatch(showResults(values));
          resolve();
        }
      }, 1000); // simulate server latency
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
import React from 'react';
import {reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import _ from 'redux/node_modules/lodash';

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

  userFound = (login = this.props.fields.login.value) => {
    const {userList} = this.props;
    
    const emailList = _.map(userList, 'email');
    return emailList.includes(login);
  };

  handlePasswordSend = () =>{
    const {fields: {login}, psw} = this.props;
    console.log('psw:', psw);
    if (psw && this.userFound()){
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
        console.log('SUBMITVALIDATING', this.userFound(values.login), values, this.props.psw);
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
          console.log('Успешный вход!')
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
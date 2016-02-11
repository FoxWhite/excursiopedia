import React from 'react';
import {reduxForm} from 'redux-form';

class LogInForm extends React.Component {
  render() {
    const {fields: {login, password}, handleSubmit, onChangeView} = this.props;
    console.log('liginForm.', onChangeView);
    return (
      <div className = 'form-login'>
        <div className = 'form-label'>Вход:</div>
        <div className = 'form-switch btn' onClick = {onChangeView.bind(null, 'FORM:REGISTER')}>Регистрация</div>      
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="First Name" {...login}/>
          </div>
          <div>
            <input type="password" placeholder="Password" {...password}/>
          </div>
          <div className = "send-pswd-btn"/>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }

  handlePasswordSend(){
    alert('!');
  }
}

export default reduxForm({ 
  form: 'login',                   
  fields: ['login', 'password']
})(LogInForm);

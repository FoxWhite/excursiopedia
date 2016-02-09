import React from 'react';
import {reduxForm} from 'redux-form';

class LogInForm extends React.Component {
  render() {
    const {fields: {login, password}, handleSubmit} = this.props;
    return (
      <div className = 'form-login'>
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

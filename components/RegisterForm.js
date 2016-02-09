import React from 'react';
import {reduxForm} from 'redux-form';

class RegisterForm extends React.Component {
  render() {
    const {fields: {name, email, tel, city, country, mobileOS}, handleSubmit} = this.props;
    return (
      <div className = 'form-register'>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="First Name" {...name}/>
          </div>
          <div>
            <input type="text" placeholder="email" {...email}/>
          </div>
          <div>
            <input type="text" placeholder="tel" {...tel}/>
          </div>
          <div>
            <input type="text" placeholder="city" {...city}/>
          </div>
          <div>
            <input type="text" placeholder="country" {...country}/>
          </div>
          <div>
            <input type="text" placeholder="mobileOS" {...mobileOS}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default reduxForm({ 
  form: 'register',                   
  fields: ['name', 'email', 'tel', 'city', 'country', 'mobileOS']
})(RegisterForm);

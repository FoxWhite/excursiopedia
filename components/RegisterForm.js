import React from 'react';
import {reduxForm} from 'redux-form';
// import './ObjectSelect';
import { findDOMNode } from 'react-dom';
import * as ac from '../helpers/Autocomplete.js';
import _ from 'redux/node_modules/lodash';

let allCountries = {};

class RegisterForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      matchingCountries: [],
    }   
  }

  componentDidMount() {  
    //fetching countries data from vk.api
    ac.getAllCountries(data => {
      allCountries = data;
    });
  }

  componentWillReceiveProps (nextProps) {
    let wasFocused = this.props.active,
        becameFocused = nextProps.active;

    if (wasFocused === 'country' && becameFocused !== wasFocused) {
      nextProps.fields.country.onChange(this.state.matchingCountries[0]);
    }
  }


  componentDidUpdate(nextProps, nextState) {
    let refs = this.refs,
        state = this.state;
        console.log (refs.countrySuggestor.value);
    refs.countrySuggestor.value = state.matchingCountries.length > 0 ? state.matchingCountries[0] : ''
  }



  render() {
    const {fields: {name, email, tel, city, country, mobileOS}, handleSubmit} = this.props;
    return (
      <div className = 'form-register'>
        <form onSubmit={handleSubmit}>
          <div>
            <input type="text" placeholder="ФИО" {...name}/>
          </div>
          <div>
            <input type="text" placeholder="E-mail" {...email}/>
          </div>
          <div>
            <input type="text" placeholder="Телефон" {...tel}/>
          </div>
          <div className='input-country'>
            <input 
              className = 'input-country-real'
              type="text" 
              placeholder="Страна" 
              autoComplete={'off'}
              onKeyUp = {this.handleCountriesInput} 
              {...country}
              />
            <input 
              className = 'input-country-fake'
              ref = 'countrySuggestor'
              type="text" 
              disabled = 'disabled' 
              />
          </div>
          <div>
            <input type="text" placeholder="Город" {...city}/>
          </div>          
          <div>
            <input type="text" placeholder="ОС" {...mobileOS}/>
          </div>
          <button type="submit">Регистрация</button>
        </form>
      </div>
    );
  }

  handleCountriesInput = (e) => {
    let input = e.target.value;
    let matchingCountries = _.map(_.filter(allCountries, (c) => {
      return _.startsWith(c.title.toUpperCase(), input.toUpperCase());
    }), 'title');

    this.setState({matchingCountries}); 

  };

}

export default reduxForm({ 
  form: 'register',                   
  fields: ['name', 'email', 'tel', 'city', 'country','mobileOS']
})(RegisterForm);

import React from 'react';
import {reduxForm} from 'redux-form';
// import './ObjectSelect';
import { findDOMNode } from 'react-dom';
import * as vk from '../helpers/VkQueries';
import * as ls from '../helpers/localStorageHelpers'
import _ from 'redux/node_modules/lodash';
let allCountries = {};
let allCities = {};
// name, email, phone, city, country, mobileOS
const validate = values => {
  const errors = {};
  if (!values.name) {
    errors.name = 'Поле обязательно для заполнения';
  }
  if (!values.email) {
    errors.email = 'Поле обязательно для заполнения';
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = 'Некорректный E-mail';
  }
  if (!values.phone) {
    errors.phone = 'Поле обязательно для заполнения';
  }
  else if (values.phone.length < 12 ){
    errors.phone = 'Номер введён некорректно';
  }
  if (!values.city) {
    errors.city = 'Поле обязательно для заполнения';
  }
  if (!values.country) {
    errors.country = 'Поле обязательно для заполнения';
  }
  if (!values.mobileOS) {
    errors.mobileOS = 'Поле обязательно для заполнения';
  }
  return errors;
};

const submit = (data, dispatch) => {
  return new Promise((resolve, reject) =>
      setTimeout(() => {
        if (ls.getUserEmails().includes(data.email)) {
          reject({email: 'Пользователь с таким e-mail уже существует'});
        }
        else {
          alert('User registered!');
          resolve(addUser(data,dispatch));
        }
        
      }, 500)) // simulate server latency
};

//TODO move to actions
const addUser = (data,dispatch) => {
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



class RegisterForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      matchingCountries: [],
      matchingCities: []
    }
  }

  componentDidMount() {  
    //fetching countries data from vk.api
    vk.getAllCountries(data => {
      allCountries = data;
    }); 

    this.updateMatchingCities();
    this.fixPlaceholders();   
  }

  componentWillReceiveProps (nextProps) {    
    let wasFocused    = this.props.active,
        becameFocused = nextProps.active,

        countryField  = nextProps.fields.country,
        cityField  = nextProps.fields.city,
        countriesArr  = _.map(this.state.matchingCountries, 'title'),
        citiesArr     = this.state.matchingCities;


    // handle country input losing focus:
    if (wasFocused === 'country' && becameFocused !== wasFocused) {
      if (countriesArr[0])  {
        countryField.onChange(countriesArr[0]);  
        this.updateMatchingCities(); 
      }   
      else {
         console.warn('NO COUNTRY MATCH');
        countryField.onChange(undefined);
      }
    }
    // handle city input losing focus:
    else if (wasFocused === 'city' && becameFocused !== wasFocused) {
      if (citiesArr[0])  {
        cityField.onChange(citiesArr[0]);  
      }   
    }          
  }


  componentDidUpdate(nextProps, nextState) {
    let refs  = this.refs,
        state = this.state,
        countriesArr = _.map(state.matchingCountries, 'title'),
        citiesArr    = state.matchingCities;

    refs.countrySuggestor.value = countriesArr.length > 0 ? countriesArr[0] : ''
    refs.citySuggestor.value = citiesArr.length > 0 ? citiesArr[0] : ''
  }

  /* Removing input placeholders on focus */
  fixPlaceholders = () => {
    _.forOwn(this.props.fields, (field, key) => {
      let _onFocus = field.onFocus;
      field.onFocus = (event) => {
        _onFocus(event);
        if (event) event.target.placeholder = '';
      }
    });
  };


  handleCountriesInput = (e) => {
    let input = e.target.value;
    let matchingCountries = _.filter(allCountries, (c) => {
      return _.startsWith(c.title.toUpperCase(), input.toUpperCase());
    });
    
    this.setState({matchingCountries}); 
  };
  
  handleCitiesInput = (e) => {
    let input = e.target.value;
    let matchingCities = allCities.filter((c) => {
      return _.startsWith(c.toUpperCase(), input.toUpperCase());
    });

    this.setState({matchingCities}); 

    if (matchingCities.length === 0) {this.updateMatchingCities(input)}
  };

  //fetching cities data from vk.api and updating allCities[] based on country and city input fields
  updateMatchingCities = (cityInput = this.props.fields.city.value) => {
    let countryId = (this.state.matchingCountries.length > 0) ? this.state.matchingCountries[0].cid : 1; // Pick Russian cities if no country selected
    console.log('cityInput', cityInput);

    vk.getAllCities(data => {
      allCities = _.map(data, 'title');
    },
    countryId, cityInput); 
  };


  render() {
    // console.log(allCountries);
    const {fields: {name, email, phone, city, country, mobileOS}, handleSubmit, submitting, onChangeView, error} = this.props;
    return (
      <div className = 'form-register'>
        <div className = 'form-label'>Регистрация:</div>
        <div className = 'form-switch btn' onClick = {onChangeView.bind(null,'FORM:LOGIN')}>Вход</div>
        <form onSubmit={handleSubmit(submit)}>
          <div className={'form-group' + (name.touched && name.error ? ' has-error' : '')}>
            <input type="text" placeholder="ФИО" {...name}/>
            {name.touched && name.error && <div className = 'error-message'>{name.error}</div>}
          </div>
          <div className={'form-group' + (email.touched && email.error ? ' has-error' : '')}>
            <input type="text" placeholder="E-mail" {...email}/>
            {email.touched && email.error && <div className = 'error-message'>{email.error}</div>}
          </div>
          <div className={'form-group input-phone' + (phone.touched && phone.error ? ' has-error' : '')}>
            <input type="text" placeholder="999)999-9999" {...phone}/>
            {phone.touched && phone.error && <div className = 'error-message'>{phone.error}</div>}
          </div>
          <div className={'input-country form-group' + (country.touched && country.error ? ' has-error' : '')}>
            <div className = 'input-country-wrapper'>
              <input
                ref = 'countryInput' 
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
            {country.touched && country.error && <div className = 'error-message'>{country.error}</div>}
          </div>
          <div className={'input-city form-group' + (city.touched && city.error ? ' has-error' : '')}>
            <div className = 'input-city-wrapper'>
              <input 
                onKeyUp = {this.handleCitiesInput}
                className = 'input-city-real'
                type="text" 
                placeholder="Город" 
                {...city}
              />
              <input 
                className = 'input-city-fake'
                ref = 'citySuggestor'
                type="text" 
                disabled = 'disabled' 
                />    
              </div>
              {city.touched && city.error && <div className = 'error-message'>{city.error}</div>}          
          </div>          
          <div className={'form-group' + (mobileOS.touched && mobileOS.error ? ' has-error' : '')}>
            <select {...mobileOS} value={mobileOS.value || ''}>
              <option value='' disabled = {true}>мобильная ОС</option>
              <option value='Android'>Android</option>
              <option value='Apple iOS‎'>Apple iOS‎</option>
              <option value='Windows Mobile'>Windows Mobile</option>
              <option value='BlackBerry‎'>BlackBerry‎</option>
              <option value='Symbian'>Symbian</option>
              <option value='other'>Другое</option>
            </select>
            {mobileOS.touched && mobileOS.error && <div className = 'error-message'>{mobileOS.error}</div>}
          </div>
          <button className = 'submit btn btn-green' type="submit" disabled={submitting}>Регистрация</button>
        </form>
      </div>
    );
  }

}

export default reduxForm({ 
  form: 'register',                   
  fields: ['name', 'email', 'phone', 'city', 'country','mobileOS'],
  validate
})(RegisterForm);

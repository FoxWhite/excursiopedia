import React from 'react';
import {reduxForm} from 'redux-form';
// import './ObjectSelect';
import { findDOMNode } from 'react-dom';
import * as vk from '../helpers/VkQueries';
import _ from 'redux/node_modules/lodash';

let allCountries = {};
let allCities = {};

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
         console.warn('PARSING ERROR NO COUNTRY MATCH');
        countryField.onChange('');
        countryField.onFocus();
        this.refs.countryInput.focus();

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
          <div className='input-city'>
            <input 
              onKeyUp = {this.handleCitiesInput}
              className = 'input-city-real'
              type="text" 
              placeholder="Город" 
              {...city}
            />
            <input 
              className = 'input-country-fake'
              ref = 'citySuggestor'
              type="text" 
              disabled = 'disabled' 
              />              
          </div>          
          <div>
            <select {...mobileOS} value={mobileOS.value || ''}>
              <option value='' disabled = {true}>ОС мобильного</option>
              <option value='Android'>Android</option>
              <option value='Apple iOS‎'>Apple iOS‎</option>
              <option value='Windows Mobile'>Windows Mobile</option>
              <option value='BlackBerry‎'>BlackBerry‎</option>
              <option value='Symbian'>Symbian</option>
              <option value='other'>Другое</option>
            </select>
          </div>
          <button type="submit">Регистрация</button>
        </form>
      </div>
    );
  }

}

export default reduxForm({ 
  form: 'register',                   
  fields: ['name', 'email', 'tel', 'city', 'country','mobileOS']
})(RegisterForm);

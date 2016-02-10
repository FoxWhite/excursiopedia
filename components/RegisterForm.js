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
      suggestedCountry: null
    }   
  }

  componentDidMount() {  
    ac.getAllCountries(data => {
      allCountries = data;
    });
  }

  render() {
    const {fields: {name, email, tel, city, country, mobileOS}, handleSubmit} = this.props;
    console.log('state: ',this.state);
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
          <div className='input-country'>
            <input 
              type="text" 
              placeholder="country" 
              onKeyUp = {this.handleCountriesInput} 
              onBlur = {this.handleCountriesBlur}
              {...country}
              />

            <input 
              type="text" 
              disabled = 'disabled' 
              value = {this.state.suggestedCountry} 
              />
            {this.state.matchingCountries.length > 0 && 
              <select 
                onChange = {this.handleCountriesSelect} 
                value = {this.state.suggestedCountry} 
                >
                  {
                    this.state.matchingCountries.map(function(option,index) {
                      return (
                        <option key={index} value={option}>
                          {option}
                        </option>
                      );
                    })
                  }
              </select>
            }
          </div>
          <div>
            <input type="text" placeholder="mobileOS" {...mobileOS}/>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }


  handleCountriesBlur = (e) => {
    console.log('handleBlur');
    let chosenCountry = this.state.suggestedCountry;

    this.props.fields.country.onChange(chosenCountry);
    e.target.value = chosenCountry;
  };

  handleCountriesSelect = (e) => {
    console.log('==SELECT CHANGE==');
    // console.log(e);
    this.setState({suggestedCountry: e.target.value});
    console.log(this.state);
  };

  handleCountriesInput = (e) => {
    let input = e.target.value;

    let matchingCountries = _.map(_.filter(allCountries, (c) => {
      return _.startsWith(c.title.toUpperCase(), input.toUpperCase());
    }), 'title');

    this.setState({matchingCountries, suggestedCountry: matchingCountries[0]});
  };

}

export default reduxForm({ 
  form: 'register',                   
  fields: ['name', 'email', 'tel', 'city', 'country', 'mobileOS']
})(RegisterForm);

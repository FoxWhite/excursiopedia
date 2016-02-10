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
    ac.getAllCountries(data => {
      allCountries = data;
    });
  }

  componentWillReceiveProps (nextProps) {
    let wasFocused = this.props.active,
        becameFocused = nextProps.active;
        console.log('wasFocused',wasFocused,'becameFocused', becameFocused );
    // handle Country selector losing focus
    if (wasFocused === 'suggestedCountry' && becameFocused !== wasFocused) {
      //remove selector after it losing focus
      this.setState({matchingCountries: []});
    }
    else if (wasFocused === 'country' && becameFocused !== wasFocused) {
      nextProps.fields.country.onChange(this.refs.countrySelector[0].value);
    }
  }


  componentDidUpdate(nextProps, nextState) {
    let refs = this.refs;
    // filling fake country input with value from country selector
    refs.countrySuggestor.value = refs.countrySelector ? refs.countrySelector[0].value : ''
  }



  render() {
    const {fields: {name, email, tel, city, country, suggestedCountry, mobileOS}, handleSubmit} = this.props;
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
              autoComplete={'off'}
              onKeyUp = {this.handleCountriesInput} 
              {...country}
              />

            <input 
              ref = 'countrySuggestor'
              type="text" 
              disabled = 'disabled' 
              />
            {this.state.matchingCountries.length > 0  && 
              <select 
                ref = 'countrySelector'
                {...suggestedCountry}
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

  handleCountriesInput = (e) => {
    let input = e.target.value;
    let matchingCountries = _.map(_.filter(allCountries, (c) => {
      return _.startsWith(c.title.toUpperCase(), input.toUpperCase());
    }), 'title');

    this.setState({matchingCountries}); 

    // handle Arrow down case
    if (e.keyCode === 40) {
      console.log('arrow hit');
      // this.props.handleFocus('suggestedCountry');
      this.props.fields.suggestedCountry.onFocus();
      this.refs.countrySelector[0].selected = 'true';
    }
  };

}

export default reduxForm({ 
  form: 'register',                   
  fields: ['name', 'email', 'tel', 'city', 'country', 'suggestedCountry','mobileOS']
})(RegisterForm);

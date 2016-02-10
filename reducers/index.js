import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import users from './users';
import { normalizeCountry,  normalizeSuggestedCountry } from './normalizers/registerFormNormalizers'

const rootReducer = combineReducers({
  users,
  form: formReducer.normalize({
    register: {
    }
  })
});

export default rootReducer



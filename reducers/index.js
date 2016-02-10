import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import users from './users';
import { normalizePhone} from './normalizers/registerFormNormalizers'

const rootReducer = combineReducers({
  users,
  form: formReducer.normalize({
    register: {
      phone: normalizePhone
    }
  })
});

export default rootReducer



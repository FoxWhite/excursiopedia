import { combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import users from './users';
import activeView from './activeView';
import currPassword from './currPassword';
import { normalizePhone} from './normalizers/registerFormNormalizers'

const rootReducer = combineReducers({
  users,
  form: formReducer.normalize({
    register: {
      phone: normalizePhone
    }
  }),
  activeView: activeView,
  currentPassword: currPassword
});

export default rootReducer



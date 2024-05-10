import { combineReducers } from 'redux';
import newImpressionReducer from './new_impression_reducer';
import sessionReducer from './session_reducer';
import testeReducer from './teste_reducer';


const rootReducer = combineReducers({
  newImpression: newImpressionReducer,
  session: sessionReducer,
  teste: testeReducer
});

export default rootReducer;
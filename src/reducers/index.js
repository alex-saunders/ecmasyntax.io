import { combineReducers } from 'redux';
import UtilReducer from './utils';
import SearchReducer from './search';
import ActivePageReducer from './active-page';

const allReducers = combineReducers(
  {
    utils: UtilReducer,
    pageList: SearchReducer,
    activePage: ActivePageReducer
  }
);

export default allReducers;

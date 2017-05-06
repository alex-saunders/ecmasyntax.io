import { combineReducers } from 'redux';
import UtilReducer from './utils';
import PageListReducer from './page-list';
import ActivePageReducer from './active-page';

const allReducers = combineReducers(
  {
    utils: UtilReducer,
    pageList: PageListReducer,
    activePage: ActivePageReducer,
  }
);

export default allReducers;

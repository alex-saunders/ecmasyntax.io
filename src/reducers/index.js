import { combineReducers } from 'redux';
import PageListReducer from './page-list';
import ActivePageReducer from './active-page';

const allReducers = combineReducers(
  {
    pageList: PageListReducer,
    activePage: ActivePageReducer
  }
);

export default allReducers;

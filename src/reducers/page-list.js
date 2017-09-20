import { TAGGED_IN } from '../utils/constants';

const initialState = {
  entries: [],
  isLoading: false,
  hasErrored: false,
  activePages: [],
  filters: [],
  query: '',
};

const filterPages = (filters, pages) => {
  let filteredPages = pages;
  if (filters.length > 0) {
    filteredPages = pages.filter((page) => {
      return filters.includes(page.fields.category.fields.specification.fields.name);
    });
  }
  return filteredPages;
};

const queryPages = (query, pages) => {
  const syntaxEntries = pages;
  let matchedEntries = syntaxEntries;
  if (query.length > 0) {
    const formattedQuery = query.toLowerCase();
    const regex = `^${TAGGED_IN}:([^ ]*)`;
    const regexp = new RegExp(regex, 'g');
    const match = regexp.exec(formattedQuery);
    if (match && match[1]) {
      matchedEntries = syntaxEntries.filter((entry) => {
        if (!entry.fields.tags) {
          return false;
        }
        return (entry.fields.tags.filter((tag) => {
          return tag.fields.name.trim().toLowerCase().match(match[1]);
        }).length > 0);
      });
      return matchedEntries;
    } else {
      matchedEntries = syntaxEntries.filter((entry) => {
        return ((entry.fields.name.trim().toLowerCase().match(formattedQuery.toLowerCase()))); // ||
      });
      return matchedEntries;
    }
  }
  return [];
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'PAGELIST_ERROR': {
      return Object.assign({}, state,
        {
          hasErrored: action.payload,
        },
      );
    }
    case 'PAGELIST_LOADING': {
      return Object.assign({}, state,
        {
          isLoading: action.payload,
        },
      );
    }
    case 'PAGELIST_FETCH_SUCCESS': {
      return Object.assign({}, state,
        {
          entries: Object.values(action.payload)
        },
      );
    }
    case 'SEARCH_QUERY': {
      const activePages = filterPages(state.filters, state.entries);
      return Object.assign({}, state,
        {
          query: action.payload,
          activePages: queryPages(action.payload, activePages),
        },
      );
    }
    case 'ADD_FILTER': {
      const activePages = queryPages(state.query, state.entries);
      const newFilters = state.filters;
      newFilters.push(action.payload);

      return Object.assign({}, state,
        {
          activePages: filterPages(newFilters, activePages),
          filters: newFilters,
        },
      );
    }
    case 'REMOVE_FILTER': {
      const filter = action.payload;
      const newFilters = state.filters;
      const activePages = queryPages(state.query, state.entries);
      newFilters.splice(newFilters.indexOf(filter), 1);

      return Object.assign({}, state,
        {
          activePages: filterPages(newFilters, activePages),
          filters: newFilters,
        },
      );
    }
    default: {
      return state;
    }
  }
}

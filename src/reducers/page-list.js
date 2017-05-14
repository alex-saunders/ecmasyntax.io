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
      return filters.includes(page.fields.category.fields.specification[0].fields.name);
    });
  }
  return filteredPages;
};

const queryPages = (query, pages) => {
  const syntaxEntries = pages;
  let matchedEntries = syntaxEntries;
  if (query.length > 0) {
    matchedEntries = syntaxEntries.filter((entry) => {
      return ((entry.fields.name.trim().toLowerCase().match(query.toLowerCase()))); // ||
        // (entry.fields.category.fields.name.trim().toLowerCase().match(query)));
    });
  }
  return matchedEntries;
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
          entries: action.payload,
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

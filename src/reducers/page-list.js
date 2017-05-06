const initialState = {
  entries: [],
  activePages: [],
  filters: [],
  query: '',
};

export default function (state = initialState, action) {
  switch (action.type) {
    case 'SEARCH_QUERY': {
      let activePages = filterPages(state.filters, state.entries);
      return Object.assign({}, state,
        {
          query: action.payload,
          activePages: queryPages(action.payload, activePages),
        }
      );
    }
    case 'ADD_FILTER': {
      let activePages = queryPages(state.query, state.entries);
      let newFilters = state.filters;
      newFilters.push(action.payload);      

      return Object.assign({}, state,
        {
          activePages: filterPages(newFilters, activePages),
          filters: newFilters
        }
      )

    }
    case 'REMOVE_FILTER': {
      let filter = action.payload;
      let newFilters = state.filters;
      let activePages = queryPages(state.query, state.entries);
      newFilters.splice(newFilters.indexOf(filter), 1);

      return Object.assign({}, state, 
        {
          activePages: filterPages(newFilters, activePages),
          filters: newFilters
        }
      )
    }
    default: {
      return state;
    }
  }
}

function queryPages(query, pages) {
  const syntaxEntries = pages;
  let matchedEntries = syntaxEntries;
  if (query.length > 0) {
    matchedEntries = syntaxEntries.filter((entry) => {
      return ((entry.fields.name.trim().toLowerCase().match(query))) // ||
        // (entry.fields.category.fields.name.trim().toLowerCase().match(query)));
    });
  }
  return matchedEntries;
}

function filterPages(filters, pages) {
  let filteredPages = pages;
  if (filters.length > 0) {
    filteredPages = pages.filter((page) => {
      return filters.includes(page.fields.category.fields.specification[0].fields.name);
    });
  }
  return filteredPages;
}

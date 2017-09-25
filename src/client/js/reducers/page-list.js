import { TAGGED_IN, CATEGORY_SEARCH, SPECIFICATION_SEARCH } from '../utils/constants';

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
    const formattedQuery = query.trim().toLowerCase().replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');;

    let regexp
    const taggedIn = `^${TAGGED_IN}:([^ ]*)`;
    regexp = new RegExp(taggedIn, 'g');
    const taggedInMatch = regexp.exec(formattedQuery);

    const category = `^${CATEGORY_SEARCH}:([^ ]*)`;
    regexp = new RegExp(category, 'g');
    const categoryMatch = regexp.exec(formattedQuery);

    const specification = `^${SPECIFICATION_SEARCH}:([^ ]*)`;
    regexp = new RegExp(specification, 'g');
    const specificationMatch = regexp.exec(formattedQuery);



    if (taggedInMatch && taggedInMatch[1]) {
      matchedEntries = syntaxEntries.filter((entry) => {
        if (!entry.fields.tags) {
          return false;
        }
        return (entry.fields.tags.filter((tag) => {
          return tag.fields.name.trim().toLowerCase().match(taggedInMatch[1]);
        }).length > 0);
      });
      return matchedEntries;
    } 
    
    else if (categoryMatch && categoryMatch[1]) {
      matchedEntries = syntaxEntries.filter((entry) => {
        return (entry.fields.category.fields.name.trim().toLowerCase().match(categoryMatch[1]))
      });
      return matchedEntries;
    }

    else if (specificationMatch && specificationMatch[1]) {
      matchedEntries = syntaxEntries.filter((entry) => {
        return (entry.fields.category.fields.specification.fields.name.trim().toLowerCase().match(specificationMatch[1]))
      });
      return matchedEntries;
    }

    else {
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
      // while (state.entries.length < 1) { }
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

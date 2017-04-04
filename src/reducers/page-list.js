const initialState = {
  pageListError: false,
  pageListLoading: false,
};
let activePages;

export default function (state = initialState, action) {
  switch (action.type) {
    case 'PAGELIST_ERROR': {
      return Object.assign({}, state,
        {
          pageListError: action.payload
        }
      );
    }
    case 'PAGELIST_LOADING': {
      return Object.assign({}, state,
        {
          pageListLoading: action.payload
        }
      );
    }
    case 'PAGELIST_FETCH_SUCCESS': {
      return Object.assign({}, state,
        {
          pages: action.payload
        }
      );
    }
    case 'PAGELIST_QUERY': {
      const query = action.payload.trim().toLowerCase();
      const syntaxEntries = state.entries.items;
      let matchedEntries = syntaxEntries;
      if (query.length > 0) {
        matchedEntries = syntaxEntries.filter((entry) => {
          return ((entry.fields.name.trim().toLowerCase().match(query)) ||
            (entry.fields.category.fields.name.trim().toLowerCase().match(query)));
        });
      }
      storeEntries(matchedEntries);
      console.log(matchedEntries);

      return Object.assign({}, state,
        {
          activePages: activePages,
        }
      );
    }

    case 'ADD_FILTER': {

    }
    case 'REMOVE_FILTER': {

    }
    default: {
      return state;
    }
  }
}

function getCategoryIndex(category) {
  let matchedCat = activePages.findIndex((cat) => {
    return (cat.sys.id === category.sys.id);
  });
  if (matchedCat < 0) {
    activePages.push(Object.assign({}, category, { entries: [] }));
    matchedCat = activePages.length - 1;
  }
  return matchedCat;
}

// function getCategoryIndex(specificationIndex, category) {
//   let matchedCat = specifications[specificationIndex].categories.findIndex((cat) => {
//     return (cat.sys.id === category.sys.id);
//   });
//   console.log('MATCHED CAT', matchedCat);
//   if (matchedCat < 0) {
//     specifications[specificationIndex]
//       .categories.push(Object.assign({}, category, { entries: [] }));
//     matchedCat = specifications[specificationIndex].categories.length - 1;
//   }
//   return matchedCat;
// }

function addEntryToCategory(categoryIndex, entry) {
  activePages[categoryIndex].entries.push(entry.fields);
}

function storeEntries(entries) {
  activePages = [];
  entries.forEach((entry) => {
    const category = entry.fields.category;
    // const specification = category.fields.specification[0];

    // const specificationIndex = getSpecificationIndex(specification);
    const categoryIndex = getCategoryIndex(category);

    addEntryToCategory(categoryIndex, entry);
  });
}

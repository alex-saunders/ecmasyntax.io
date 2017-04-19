export const search = (query) => {
  return {
    type: "SEARCH_QUERY",
    payload: query,
  };
};

export const addFilter = (filter) => {
	return {
		type: "ADD_FILTER",
		payload: filter,
	}
}

export const removeFilter = (filter) => {
	return {
		type: "REMOVE_FILTER",
		payload: filter,
	}
}
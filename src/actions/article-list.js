export const pageListQuery = (query) => {
  return {
    type: "PAGELIST_QUERY",
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
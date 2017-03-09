export const pageListLoading = (bool) => {
	return {
		type: "PAGELIST_LOADING",
		payload: bool
	};
}

export const pageListFetchError = (bool) => {
	return {
		type: "PAGELIST_ERROR",
		payload: bool
	};
}

export const pageListFetchSuccess = (pageList) => {
	return {
		type: "PAGELIST_FETCH_SUCCESS",
		payload: pageList
	};
}

export const fetchPageList = () => {
	return (dispatch) => {
		dispatch(pageListLoading(true));
		setTimeout(() => {

			fetch(`/api/articles/`)
			.then((response) => {
				dispatch(pageListLoading(false));
				return response;
			})
			.then((response) => response.json())
			.then((pageList) => { dispatch(pageListFetchSuccess(pageList)); Promise.resolve(true) })
			.catch(() => dispatch(pageListFetchError(true)));

		}, 0);
	};
}

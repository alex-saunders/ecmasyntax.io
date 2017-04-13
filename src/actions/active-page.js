export const pageFetchError = (bool) => {
	return {
		type: "PAGE_ERROR",
		payload: bool
	};
}

export const pageIsLoading = (bool) => {
	return {
		type: "PAGE_LOADING",
		payload: bool
	};
}

export const pageFetchSuccess = (page) => {
	return {
		type: "PAGE_FETCH_SUCCESS",
		payload: page
	};
}

export const setActiveRoute  = (page) => {
	return {
		type: "ACTIVE_ROUTE",
		payload: page
	};
}

export const setActivePage = (page) => {
	return {
		type: "ACTIVE_PAGE",
		payload: page
	}
}

export const fetchPage = (route) => {
	return (dispatch) => {
		dispatch(pageIsLoading(true));
		dispatch(pageFetchError(false));
		setTimeout(() => {
			fetch(`/api/articles${route}`)
			.then((response) => {
				if (!response.ok) {
					throw Error(response.statusText);
				}
				dispatch(pageIsLoading(false));
				return response;
			})
			.then((response) => response.json())
			.then((response) => {
				dispatch(pageFetchSuccess(response));
				dispatch(setActiveRoute(route));
				document.title = `ECMASyntax - ${response.fields.name}`;
			})
			.catch((err) => {
				console.log('ERROR', err);
				dispatch(pageFetchError(true));
				document.title = 'nope fail';
			});

		}, 100);
	};
}

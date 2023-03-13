import { createContext, useReducer } from 'react';
import { createRenderer } from 'react-dom/test-utils';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
	const initialState = {
		users: [],
		user: {},
		repos: [],
		loading: false
	};

	const [state, dispatch] = useReducer(githubReducer, initialState);

	// Get search results
	const searchUsers = async text => {
		setLoading();

		const params = new URLSearchParams({ q: text });

		const res = await fetch(`${GITHUB_URL}/search/users?${params}`);
		const { items } = await res.json();

		dispatch({
			type: 'GET_USERS',
			payload: items
		});
	};

	// Get a single user
	const getUser = async login => {
		setLoading();

		const res = await fetch(`${GITHUB_URL}/users/${login}`);

		if (res.status === 404) {
			window.location = '/notfound';
		} else {
			const data = await res.json();

			dispatch({
				type: 'GET_USER',
				payload: data
			});
		}
	};

	// Get user repos
	const getUserRepos = async login => {
		setLoading();

		const params = new URLSearchParams({ sort: 'created', per_page: 10 });

		const res = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`);
		const data = await res.json();

		dispatch({
			type: 'GET_REPOS',
			payload: data
		});
	};

	// Clear users
	const clearUsers = () => dispatch({ type: 'CLEAR_USERS' });

	// Set loading
	const setLoading = () => dispatch({ type: 'SET_LOADING' });

	return (
		<GithubContext.Provider
			value={{
				users: state.users,
				loading: state.loading,
				user: state.user,
				repos: state.repos,
				searchUsers,
				clearUsers,
				getUser,
				getUserRepos
			}}
		>
			{children}
		</GithubContext.Provider>
	);
};

export default GithubContext;

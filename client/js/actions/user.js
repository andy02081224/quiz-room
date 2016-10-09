import { createAsyncActionObject } from './actionHelpers.js';
import { browserHistory } from 'react-router';
import {
	registerUser as registerUserRequest,
	loginUser as loginUserRequest,
	logoutUser as logoutUserRequest
} from '../utils/apiManager.js';

export const LOGIN_USER = createAsyncActionObject('LOGIN_USER');

function actionLoginUser(credentials) {
	return {
		type: LOGIN_USER.NAME,
		payload: loginUserRequest(credentials)
	};
}

/* Thunks */
export function loginUser(credentials) {
	return (dispatch) => {
		return dispatch(actionLoginUser(credentials))
			.then(({value, action}) => {
				browserHistory.push({
					path: '/',
					state: {
						userID: value.id,
						username: value.username,
						image: value.image
					}
				});
			})
			.catch(() => {});
	};
}

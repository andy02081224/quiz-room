import { createAsyncActionObject } from './actionHelpers.js';
import { browserHistory } from 'react-router';
import {
	registerUser as registerUserRequest,
	loginUser as loginUserRequest,
	logoutUser as logoutUserRequest,
	checkUserStatus as checkUserStatusRequest 
} from '../utils/apiManager.js';

export const LOGIN_USER = createAsyncActionObject('LOGIN_USER');
export const CHECK_USER_STATUS = createAsyncActionObject('CHECK_USER_STATUS');

function actionLoginUser(credentials) {
	return {
		type: LOGIN_USER.NAME,
		payload: loginUserRequest(credentials)
	};
}

function actionCheckUserStatus() {
	return {
		type: CHECK_USER_STATUS.NAME,
		payload: checkUserStatusRequest()
	};
}

/* Thunks */
export function loginUser(credentials) {
	return (dispatch) => {
		return dispatch(actionLoginUser(credentials))
			.then(({value, action}) => {
				localStorage.setItem('token', value.token);
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

export function checkUserStatus() {
	return (dispatch) => {
		console.log('dispatch actionCheckUserStatus');
		return dispatch(actionCheckUserStatus());
	};
}

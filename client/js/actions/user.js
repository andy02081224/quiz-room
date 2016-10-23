import { createAsyncActionObject } from './actionHelpers.js';
import { browserHistory } from 'react-router';
import {
	registerUser as registerUserRequest,
	loginUser as loginUserRequest,
	logoutUser as logoutUserRequest,
	checkUserStatus as checkUserStatusRequest 
} from '../utils/apiManager.js';

/* Async Actions */
export const LOGIN_USER = createAsyncActionObject('LOGIN_USER');
export const CHECK_USER_STATUS = createAsyncActionObject('CHECK_USER_STATUS');
export const LOGOUT_USER = createAsyncActionObject('LOGOUT_USER');

/* Sync Actions */

function actionLoginUser(credentials) {
	return {
		type: LOGIN_USER.NAME,
		payload: loginUserRequest(credentials),
		meta: {
			reducer: 'loginUser'
		}
	};
}

function actionCheckUserStatus() {
	return {
		type: CHECK_USER_STATUS.NAME,
		payload: checkUserStatusRequest(),
		meta: {
			reducer: 'checkUserStatus'
		}
	};
}

function actionLogoutUser() {
	return {
		type: LOGOUT_USER.NAME,
		payload: Promise.resolve(true),
		meta: {
			reducer: 'logoutUser'
		}
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
		return dispatch(actionCheckUserStatus());
	};
}

export function logoutUser() {
	return (dispatch) => {
		return dispatch(actionLogoutUser())
			.then((response) => {
				if (response) {
					localStorage.removeItem('token');
					browserHistory.push('/');
				}
			});
	};
}

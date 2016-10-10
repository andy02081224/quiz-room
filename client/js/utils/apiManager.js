import 'whatwg-fetch';
import API from './api.js';


function createJSONConfig(data, method='POST', headers) {
	return {
		method: method,
		headers: Object.assign({
			'Content-Type': 'application/json'
		}, headers),
		body: JSON.stringify(data)
	};
}

function makeRequest(url, config={}) {
	return fetch(url, config)
		.then((response) => {
			return response.json();		
		})
		.then((json) => {
			if (!json.error) {
				return json;
			}
			else {
				return Promise.reject(json);
			}
		})
		.catch((err) => {
			return Promise.reject(err);
		});
}

function registerUser(userInfo) {
	return makeRequest(API.REGISTER_USER, createJSONConfig(userInfo));
}

function loginUser(userCredentials) {
	return makeRequest(API.LOGIN_USER, createJSONConfig(userCredentials));
}

function logoutUser() {
	return makeRequest(API.LOGOUT_USER);
}

function checkUserStatus() {
	return makeRequest(API.CHECK_USER_STATUS, {
		headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
	});
}

function getQuestionSetList() {
	return makeRequest(API.GET_QUESTION_SET_LIST);
}

function getQuestionSet(questionsetID) {
	return makeRequest(API.GET_QUESTION_SET(questionsetID));
}

export {
	registerUser,
	loginUser,
	logoutUser,
	checkUserStatus,
	getQuestionSetList,
	getQuestionSet
};
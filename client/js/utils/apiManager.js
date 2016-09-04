import 'whatwg-fetch';
import API from './api.js';

function getQuestionSetList() {
	return fetch(API.GET_QUESTION_SET_LIST)
		.then((response) => {
			if (response.status == 200) {
				return response.json();
			}
			else {
				throw response.json();
			}
			
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			throw err;
		});
}

function getQuestionSet(questionsetID) {
	return fetch(`${API.GET_QUESTION_SET}${questionsetID}`)
		.then((response) => {
			if (response.status == 200) {
				return response.json();
			}
			else {
				throw response.json();
			}
		})
		.then((json) => {
			return json;
		})
		.catch((err) => {
			throw err;
		});
}

export {
	getQuestionSetList,
	getQuestionSet
};
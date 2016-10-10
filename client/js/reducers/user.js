import {
	LOGIN_USER,
	CHECK_USER_STATUS
} from '../actions/user.js';

const initialState = {
	ui: {
		isProcessing: false,
		authMessage: ''
	},
	isLoggedIn: false,
	id: '',
	username: '',
	image: ''
};

export default function user(state=initialState, action) {
	if (LOGIN_USER.TYPES.indexOf(action.type) > -1) {
		return loginUser(state, action);
	}
	if (CHECK_USER_STATUS.TYPES.indexOf(action.type) > -1) {
		return checkUserStatus(state, action);
	}
	else {
		return state;
	}
}

function loginUser(state, action) {
	let [PENDING, FULFILLED, REJECTED] = LOGIN_USER.TYPES;

	switch (action.type) {
		case PENDING:
			return Object.assign({}, state, {
				ui: { isProcessing: true }
			});
		case FULFILLED:
			return Object.assign({}, state, {
				ui: { 
					isProcessing: false,
					authMessage: ''
				 },
				isLoggedIn: true,
				id: action.payload.id,
				username: action.payload.username,
				image: action.payload.image
			});
		case REJECTED:
			return Object.assign({}, state, {
				ui: { 
					isProcessing: false,
					authMessage: (action.payload.statusCode == 401 || action.payload.statusCode == 404) ? 'Invalid username or password' : 'System error, please try again later'
				}
			});
	}
}

function checkUserStatus(state, action) {
	let [PENDING, FULFILLED, REJECTED] = CHECK_USER_STATUS.TYPES;

	switch (action.type) {
		case PENDING:
			return Object.assign({}, state, {
				ui: { isProcessing: true }
			});
		case FULFILLED:
			return Object.assign({}, state, {
				ui: { isProcessing: false },
				id: action.payload.id,
				username: action.payload.username
			});
		case REJECTED:
			return Object.assign({}, state, {
					ui: { 
						isProcessing: false
					}
				});
	}
}
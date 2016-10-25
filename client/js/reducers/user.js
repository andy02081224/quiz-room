import {
	LOGIN_USER,
	CHECK_USER_STATUS,
	LOGOUT_USER
} from '../actions/user.js';

const initialState = {
	ui: {
		isProcessing: false,
		authMessage: ''
	},
	isLoggedIn: false,
	id: '',
	username: '',
	name: '',
	image: ''
};

const UserReducers = {
	loginUser,
	checkUserStatus,
	logoutUser
};

export default function user(state=initialState, action) {
	if (action.meta && action.meta.reducer && typeof UserReducers[action.meta.reducer] == 'function') {
			return UserReducers[action.meta.reducer](state, action);
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
				name: action.payload.name
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
				isLoggedIn: true,
				id: action.payload.id,
				username: action.payload.username,
				name: action.payload.name
			});
		case REJECTED:
			return Object.assign({}, state, {
					ui: { 
						isProcessing: false
					}
				});
	}
}

function logoutUser(state, action) {
	let [PENDING, FULFILLED, REJECTED] = LOGOUT_USER.TYPES;
	
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
				isLoggedIn: false,
				id: '',
				username: '',
				image: ''
			});
		case REJECTED:
			return Object.assign({}, state, {
				ui: { 
					isProcessing: false
				}
			});
	}

}
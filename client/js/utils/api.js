const API = {
	REGISTER_USER: '/api/user/register',
	LOGIN_USER: '/api/user/login',
	LOGOUT_USER: '/api/user/logout',
	CHECK_USER_STATUS: '/api/user/status',
	GET_QUESTION_SET_LIST: '/api/questionset',
	GET_QUESTION_SET: (questionsetID) => `/api/questionset/${questionsetID}`
};

export default API;
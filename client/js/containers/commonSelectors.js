import { createSelector } from 'reselect';


const userSelector = function(state) {
	return state.user;
}

const userProfileSelector = createSelector(userSelector, (user) => {
	return {
		id: user.id,
		name: user.name,
		username: user.username,
		image: user.image
	};
});

export {
	userSelector,
	userProfileSelector
};
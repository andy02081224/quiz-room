export function createAsyncActionObject(actionName) {
	return {
		NAME: actionName,
		TYPES: [
			`${actionName}_PENDING`,
			`${actionName}_FULFILLED`,
			`${actionName}_REJECTED`
		]
	};
}
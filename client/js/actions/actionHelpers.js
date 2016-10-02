export function createActionObject(actionName) {
	return {
		NAME: actionName,
		TYPES: [
			`${actionName}_PENDING`,
			`${actionName}_FULFILLED`,
			`${actionName}_REJECTED`
		]
	};
}
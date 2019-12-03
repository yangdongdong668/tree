export const set_school_info = 'set_school_info';
export function _setSchoolInfo (data) {
	return {
		type: set_school_info,
		payload: data
	};
}

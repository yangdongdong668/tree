import { set_school_info } from '../action/setSchoolInfo';

const initialState = {
	schoolInfo: {},
	testInfo: 'this is test info '
};

export default function (state = initialState, action) {
	switch (action.type) {
	case set_school_info:
		return {
			// ...state,
			schoolInfo: action.payload
		};
	default:
		return state;
	}
}

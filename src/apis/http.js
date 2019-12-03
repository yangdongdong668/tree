import axios from 'axios';

let baseUrl = '';
// 请求拦截
axios.interceptors.request.use(
	config => {
		// loading
		return config;
	},
	error => {
		return Promise.reject(error);
	}
);
// 响应拦截
axios.interceptors.response.use(
	response => {
		return response;
	},
	error => {
		return Promise.resolve(error.response);
	}
);
// 检查 http 状态码
function checkStatus (response) {
	// 如果http状态码不正常，提示错误信息
	if (response && response.status !== 200) {
		console.log(
			'code is ' + response.status,
			',text is ' + response.statusText
		);
		return;
	}
	// 状态码正常，数据返回不正常，自己手动提示错误

	return response.data;
}

async function commonAxios (params) {
	const response = await axios(
		Object.assign({ baseUrl, timeout: 10000 }, params)
	);
	return checkStatus(response);
}

export default {
	get (url) {
		return commonAxios({ method: 'GET', url });
	},
	post (url, data) {
		return commonAxios({ method: 'POST', url, data });
	}
};

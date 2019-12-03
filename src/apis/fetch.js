import axios from 'axios';
import { isProductEnv } from '../utils/common';

// 根据不同环境访问不同接口
let baseUrl = isProductEnv() === 1
	? 'https://zh.7kid.com/app'
	: isProductEnv() === 2
	?'http://zh-ts.7kid.com/app'
	:'http://zh-dev.7kid.com/app';

let fetch = axios.create({
	baseURL: baseUrl, //正式
	timeout: 30000
});

export default fetch;

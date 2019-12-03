import wxShare from './wxShare';
// 设置 title
export const setTitle = title => {
	if (title.trim().length > 0)
		document.getElementsByTagName('title')[0].innerText = title;
	// 在这里更新微信分享的 title
	wxShare.share();
};

// 改变背景颜色
export const changeColor = pageColor => {
	document.getElementById('pageContentWrapper').style.background = pageColor
		? '#f1f7fe'
		: '#ffffff';
};

// 隐藏加载框
export const hideLoading = () => {
	this.setState(
		{
			showLoading: false
		},
		() => {
			console.log('set showLoading false');
		}
	);
};

// 判断是否是正式环境
export const isProductEnv = () => {
	if(process.env.NODE_ENV === 'production'){
		return 1;
	}else if(process.env.NODE_ENV === 'ts'){
		return 2;
	}else{
		return 3;
	}
	// return process.env.NODE_ENV === 'production';

};

// 是否需要显示手风琴效果
export const showAccordion = id => {
	// 中文版 dev=673 && prod=248
	if (lang() === 'cn') {
		return (
			(isProductEnv() && id === ['248'].find(item => item === id)) ||
			(!isProductEnv() && id === ['673'].find(item => item === id)) ===
				true
		);
	}
	// 英文版 prod=711
	return (
		(isProductEnv() && id === ['711'].find(item => item === id)) === true
	);
};

// 要跳转显示图片列表的 id 判断
export const showPicLists = id => {
	return ['653', '654', '655', '656'].find(item => {
		return item === id;
	});
};
// 显示默认图片
export const showDefaultImg = event => {
	event.target.src = require('../assets/imgs/default_jpg.jpg');
};
// 设置语言
export const setLang = lang => {
	localStorage.setItem('lang', lang);
};

const lang = () => {
	// console.log(process.env);
	return process.env.lang || 'cn';
};
// 获取当前语言
export const getLang = () => {
	// 英文版，默认为 en
	return lang();
};

export const urlHost1 = () => {
	// return 'http://e.au-fthenakis.com/';
	return 'http://wap.au-fthenakis.com/';
};

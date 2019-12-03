import axios from 'axios';
import wx from 'weixin-js-sdk';

let wxDomain =
	process.env.NODE_ENV === 'production'
		? 'https://zh.7kid.com/'
		: 'http://dev.7kid.com/';

const setConfigParams = () => {
	return {
		pageId: window.location.href.split('#')[1],
		shareParams: {
			title: document.getElementsByTagName('title')[0].innerText, // 分享标题
			desc:
				'菲纳克思国际幼儿园由菲纳克思教授与阿优文化公司独家合作创办，杭州园区位于钱江世纪城。',
			link:
				wxDomain +
				'fnks?from=singlemessage&uri=' +
				window.location.href.split('#')[0] +
				'&page=' +
				window.location.href.split('#')[1], //"&page=/htmlcontentpage/279"
			imgUrl: 'https://zh.7kid.com/Consoltation/img/imgs/logo2.png', // 分享图标
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: () => {
				// 用户点击了分享后执行的回调函数
				console.log(
					wxDomain +
						'fnks?from=singlemessage&uri=' +
						window.location.href.split('#')[1]
				);
			}
		}
	};
};

const isWechat = () => {
	let ua = window.navigator.userAgent.toLowerCase();

	return ua.match(/MicroMessenger/i) === 'micromessenger' ? true : false;
};

const share = () => {
	// 不是微信浏览器，直接退出
	if (!isWechat()) return false;
	wx.ready(() => {
		//需在用户可能点击分享按钮前就先调用
		wx.onMenuShareAppMessage(setConfigParams());
	});
};
export default {
	config () {
		// 不是微信浏览器，直接退出
		if (!isWechat()) return false;
		axios({
			method: 'get',
			url:
				wxDomain +
				'app/indexApi2.php?c=consult&a=consult&do=Getticket&url=' +
				encodeURIComponent(window.location.href)
		}).then(function (data) {
			let param = data.data.param;

			wx.config({
				debug: false,
				appId: param.appId, // 必填，公众号的唯一标识
				timestamp: param.timestamp, // 必填，生成签名的时间戳
				nonceStr: param.nonceStr, // 必填，生成签名的随机串
				signature: encodeURIComponent(param.signature), // 必填，签名
				jsApiList: ['onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
			});
		});
	},

	share: share
};

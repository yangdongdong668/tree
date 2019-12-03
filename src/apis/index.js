import fetch from './fetch';

import { getLang } from '../utils/common';

let schoolid = window.getschoolid, 
	lang = getLang() === 'en' ? `&lang=${getLang()}` : '';

// 通用 fetch 获取信息
function getFetch (doInfo, id = '',cateid) {
	return fetch({
		url:
			id === ''
				? `indexApi2.php?c=website&a=wap&do=${doInfo}&schoolid=${schoolid}${lang}&cateid=${cateid}`
				: `indexApi2.php?c=website&a=wap&do=${doInfo}&schoolid=${schoolid}&id=${id}${lang}`,
		method: 'get'
	});
}
function getFetch2 (doInfo, id = '') {
	return fetch({
		url:
			id === ''
				? `indexApi2.php?c=website&a=mobile&do=${doInfo}&schoolid=${schoolid}${lang}`
				: `indexApi2.php?c=website&a=mobile&do=${doInfo}&schoolid=${schoolid}&id=${id}${lang}`,
		method: 'get'
	});
}

//获取学校信息
export function getShoolInfo () {
	return getFetch('SchoolInfo');
}

//获取首页banner图片地址
export function getBannerInfo () {
	return getFetch2('Getbanner');
}

//获取导航菜单
export function getMenu () {
	return getFetch('SchoolNewItem','','11');
}

//获取导航菜单
export function getMiddle () {
	return getFetch('SchoolNewItem','','11');
}
//获取通知公告栏
export function getTongzhi () {
	return getFetch('SchoolNewItem','','12');
}
//获取视频信息头图
export function getVideo () {
	return getFetch('SchoolNewItem','','13');
}

// 手风琴效果获取页面
export function getAccordion (id) {
	//return getFetch('Getlistinfo', id);
}

// 获取创办人页面
export function founderData (id) {
	//return getFetch('GetFounder', id);
}

//获取菲园动态 --->全部
// export function getFeiYuanDongTai () {
// 	//return getFetch('Getmovement');
// }

//获取菲园动态 --->首页展示4条和全部
export function getFeiYuanDongTai () {
	return getFetch('SchoolNewItem','','14');
}

//获取详情
export function getItemDetail (id) {
	return getFetch2('Getdetail', id);
}

// 获取列表
export function getList (id) {
	return getFetch2('Getlist', id);
}

// 获取幻灯片图片列表
export function getPicLists (id) {
	return getFetch2('Getdetail2', id);
}

// //获取列表接口
// export function routerToItem(id) {

//     return ((process.env.NODE_ENV === 'production' && id == 248) || (process.env.NODE_ENV === 'development' && id == 673)) ? fetch({
//         url: 'indexApi2.php?c=website&a=mobile&do=Getlistinfo&schoolid=69&id=' + id,
//         method: 'get'
//     }) : fetch({
//         url: 'indexApi2.php?c=website&a=mobile&do=Getlist&schoolid=69&id=' + id,
//         method: 'get'
//     });
// }

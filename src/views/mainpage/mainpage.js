import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Swiper from '../../components/swiper/swiper';
import VideoSwiper from '../../components/videoswiper/videoswiper';
import { getMiddle, getFeiYuanDongTai,getTongzhi } from '../../apis';

import {
	setTitle,
	changeColor,
	showDefaultImg,
	getLang,
	urlHost1
} from '../../utils/common';
import lang from '../../utils/lang';

import './mainpage.scss';

class MainPage extends Component { 	
	state = {
		newsList: [],
		menuList: [],
		middlePicList: [
			{ imgsrc: 'icon_divide_cbr' },
			{ imgsrc: 'icon_divide_kcts' },
			{ imgsrc: 'icon_divide_fyhj' },
			{ imgsrc: 'icon_divide_szdw' }
		],
		pageColor: true,
		...lang.mainPage[getLang()],
		noticelist:[],
		tongzhi:[],
	};

	//跳转到详情页面
	routerTo = item => {
		console.log(item);
		if (item.linkurl.length > 0) {
			//如果存在外部链接则调到外部链接
			window.location.href = item.linkurl;
			return;
		}

		if (item.title === lang.title[getLang()]['founderText']) {
			this.props.history.push('/founder/' + item.id);
			return;
		}
		this.props.history.push('/htmlcontentpage/' + item.id);
	};
	// 跳转
	routerTorecruit = index => {
		//跳转到详情页面
		let url =
			index === 1
				? 'https://mp.weixin.qq.com/s/Mi70JWqwF3Xb2BNopuGs_g'
				: index === 2
					? urlHost1() + 'phoneappoint/index.html'
					: urlHost1() + 'Consoltation/index.html';

		window.location.href = url;
	};
	// 全部
	getAllDongTaiData = (id) => {
		if(Number(id)>0){
			this.props.history.push('/tongzhi');
		}else{
			this.props.history.push('/newslist');
		}
		
	};

	// 获取 middle 数据
	getMiddleData () {
		getMiddle().then(data => {
			let _data = data.data.data;
			
			this.state.middlePicList.forEach((item, i) => {
				if (_data[i] !== undefined) Object.assign(_data[i], item);
			});

			this.setState({
				menuList: _data.slice(0,4)
			});
			console.log(this.state.menuList);
		});
	}

	//获取通知公告数据
	getTongzhiData () {
		getTongzhi().then(data => {
			let _data = data.data.data;
			console.log(_data);
			if (_data.length) {
				let _tongzhi = _data.map((item, i) => {
					if (i < 2) return item;
				});
				this.setState({
					tongzhi: _tongzhi.slice(0,2)
				});
			}
		});
	}

	//获取菲园动态数据最多4调数据
	getFeiYuan () {
		getFeiYuanDongTai().then(res => {
			let _data = res.data.data;
			console.log(_data);
			if (_data.length) {
				let _newList = _data.map((item, i) => {
					if (i < 4) return item;
				});
				console.log(_newList,1111111);
				this.setState({
					newsList: _newList.slice(0,4)
				});
			}
		});
	}

	componentDidMount () {
		console.log(window.getschoolid);
		this.getTongzhiData();
		 this.getMiddleData();
		 this.getFeiYuan();
		setTitle(this.state.pageTitleText);
		changeColor(this.state.pageColor);
		// localStorage.setItem('lang', '');
	}

	render () {
		return (
			<div className="mainpage_con">
				<Swiper />

				{/* <div>广告位开始</div> */}
				{/* <div className="recruit_students">
					<dl
						className="recruit_item"
						onClick={this.routerTorecruit.bind(this, 1)}
					>
						<dt>
							<img
								src={require('../../assets/imgs/icon_home_zsjx.png')}
								alt=""
							/>
						</dt>
						<dd>{this.state.zsjx}</dd>
					</dl>
					<dl
						className="recruit_item"
						onClick={this.routerTorecruit.bind(this, 2)}
					>
						<dt>
							<img
								src={require('../../assets/imgs/icon_home_yyty.png')}
								alt=""
							/>
						</dt>
						<dd>{this.state.experienceText}</dd>
					</dl>
					<dl
						className="recruit_item"
						onClick={this.routerTorecruit.bind(this, 3)}
					>
						<dt>
							<img
								src={require('../../assets/imgs/icon_home_wyry.png')}
								alt=""
							/>
						</dt>
						<dd>{this.state.wantText}</dd>
					</dl>
				</div> */}
				{/* <div>广告位结束</div> */}

				{this.state.tongzhi.length > 0?
				<div className="notice">
					<div className="notice_top" id="tongzhi_top">
						<span className="notice_top_l"><img
								src={require('../../assets/imgs/icon_note@2x.png')}
								alt=""
								className="notice_top_l_img"
							/></span> 
						<span className="notice_top_l">通知公告</span>            
						<span className="notice_top_r" onClick={this.getAllDongTaiData.bind(this,1)}>全部></span>
					</div>
						{
						this.state.tongzhi.map((item,index)=>{
							return (
								<div
									className={`tongzhiItemWrapper ${index===0?"line":null} ${index===1?"bRadius":null}`}
									key={item.title + index}
									onClick={this.routerTo.bind(this, item)}
								>
									<div className="textWrapper">
										<p className="newsTitle">
											{item.title}
										</p>
										<p className="newsTime">
											<img src={require("../../assets/imgs/icon_fabuzhe.png")} alt="" /><span>{item.author}</span>
										<img src={require("../../assets/imgs/icon_date.png")} alt="" />
										<span>{item.createtime}</span></p>
									</div>
								</div>
							)
						})
					}
				</div>:''}

				

				<div className="college_details">
					{this.state.menuList.length > 0
						? this.state.menuList.map((item, index) => {
							let imgsrc = item.imgsrc;
							console.log(imgsrc);
							return (
								<dl
									className="college_details_item"
									key={'menuList' + index}
									onClick={this.routerTo.bind(this, item)}
								>
									<dt>
										<img
											src={require(`../../assets/imgs/${item.imgsrc}.png`)}
											alt=""
											onError={showDefaultImg}
										/>
									</dt>
									<dd>{item.title}</dd>
									{/* <dd className="en_dd">
										{item.title_en}
									</dd> */}
								</dl>
							);
						  })
						: ''}
				</div>
				<div id="layout">
					
					</div>
				{this.state.menuList.length > 0?
				<div className="notice sendWord">
					<div className="notice_top">
						<span className="notice_top_l"><img
								src={require('../../assets/imgs/icon_say@2x.png')}
								alt=""
								className="notice_top_l_img"
							/></span> 
					<span className="notice_top_l">园长寄语</span> 
					</div>
					
					<VideoSwiper
					/>
						{
						this.state.noticelist.map((item,index)=>{
							return (
								<dl
									className="notice_details_item"
									key={'menuList' + index}
									onClick={this.routerTo.bind(this, item)}
								>
									{/* <dt>
										<img
											src={require('../../assets/imgs/' +
													item.imgsrc +
													'.png')}
											alt=""
										/>
									</dt> */}
									<dd>{item.title}</dd>
									<dd className="en_dd">
										{item.title_en}
									</dd>
								</dl>
							)
						})
					}
				</div>:''}
				{
					<div className="newsListWrapper">
						<div className="trends_top">
						<span className="notice_top_l"><img
								src={require('../../assets/imgs/icon_school@2x.png')}
								alt=""
							/></span> 
					<span className="notice_top_l">校园动态</span> 
					</div>
						<div className="listWrapper">
							{this.state.newsList.map((item, index) => (
								<div
									className="singleItemWrapper"
									key={item.title + index}
									onClick={this.routerTo.bind(this, item)}
								>
									<div className="imgWrapper">
										<img
											alt=""
											src={item.thumbs}
											onError={showDefaultImg}
										/>
									</div>
									<div className="textWrapper">
										<p className="newsTitle">
											{item.title}
										</p>
										<p className="newsTime">{item.createtime}</p>
									</div>
								</div>
							))}
							{this.state.newsList.length ? (
								<div className="getMore">
									<span onClick={this.getAllDongTaiData.bind(this,0)}>
										{this.state.showAllText}>>
									</span>
								</div>
							) : (
								''
							)}
						</div>
					</div>
				}
			</div>
		);
	}
}

export default withRouter(MainPage);

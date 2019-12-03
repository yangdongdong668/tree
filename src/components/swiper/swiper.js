import React, { Component } from 'react';


import { getBannerInfo } from '../../apis';
import { showDefaultImg } from '../../utils/common';
import { Carousel } from 'antd';
import 'antd/es/carousel/style/index.css'

import './swiper.scss';

export default class Swiper extends Component { 
	state = {
		imgs: [
			
		],
	};

	getImgList = () => {
		getBannerInfo().then(data => {
			console.log(data);
			let _data = data.data.banners;
			let imgs = [];
			if (_data.length > 0) {
				_data.forEach(item => {
					if (item.type !== undefined) {
						if (item.type === 'url') {
							//banner 外站跳转
							imgs.push({
								image: item.old_thumb,
								link: item.url
							});
						} else if (item.type === 'article') {
							//banner本站跳转
							let url =
								window.location.href.split('#')[0] +
								'#/itemdetailpage/' +
								item.id;
							imgs.push({
								image: item.old_thumb,
								link: url
							});
						}
					} else {
						//banner 无跳转
						imgs.push({
							image: item.old_thumb
						});
					}
				});
				this.setState(
					{
						imgs: imgs
					}
				);
			}
		});
	};

	

	imgClickEvent = item => {
		if (item.link) {
			window.location.href = item.link;
		}
		return;
	};


	componentDidMount () {
		this.getImgList();
	}

	render () {
		return (
			<Carousel autoplay>
				{this.state.imgs.map((item, index) => (
						<div
							className="swiperScrollItem"
							key={index}
							onClick={this.imgClickEvent.bind(this, item)}
						>
							<img
								src={item.image}
								alt=""
								onError={showDefaultImg}
							/>
						</div>
					))}
			</Carousel>
		);
	}
}

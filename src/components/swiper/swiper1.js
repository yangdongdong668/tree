import React, { Component } from 'react';

import { getBannerInfo } from '../../apis';
import { showDefaultImg } from '../../utils/common';

import './swiper.scss';

export default class Swiper extends Component {
	state = {
		imgs: [
			
		],
		swiperOptions: {
			preloadImages: true,
			autoplay: 10000,
			autoplayDisableOnInteraction: false, //滑动一次后就不再自动轮播配置
			auto: true
		},
		swiperScrollWrapperWidth: 0,
		screenWidth: window.screen.width,
		autoTime: 4000,
		transitionTime: 500,
		transitionTiemSet: 500,
		translateDistance: 0,
		auto: true,
		timer: null,
		stopx: null,
		gap: null,
		indicatorIndex: 0,
		showTemplate: false
	};

	getImgList = () => {
		getBannerInfo().then(data => {
			let _data = data.data.banners;
			let imgs = [];
			if (_data.length > 0) {
				_data.forEach(item => {
					if (item.type !== undefined) {
						if (item.type === 'url') {
							//banner 外站跳转
							imgs.push({
								image: item.thumb,
								link: item.url
							});
						} else if (item.type === 'article') {
							//banner本站跳转
							let url =
								window.location.href.split('#')[0] +
								'#/itemdetailpage/' +
								item.id;
							imgs.push({
								image: item.thumb,
								link: url
							});
						}
					} else {
						//banner 无跳转
						imgs.push({
							image: item.thumb
						});
					}
				});
				this.setState(
					{
						imgs: imgs
					},
					() => {
						this.setWrapperWidth();
					}
				);
			}
		});
	};

	setWrapperWidth = () => {
		let len = this.state.imgs.length;
		if (len <= 0) return;
		this.setState(
			{
				swiperScrollWrapperWidth: len * window.screen.width
			},
			() => {
				this.setState({
					showTemplate: true
				});
				this.setAutoScroll();
			}
		);
	};

	setAutoScroll = () => {
		if (this.state.auto) {
			let swiperScrollWrapperWidth = this.state.swiperScrollWrapperWidth;
			this.setState({
				timer: setInterval(() => {
					let newDistance =
						this.state.translateDistance - this.state.screenWidth;
					//    console.log(newDistance+"/"+( -1*swiperScrollWrapperWidth+this.state.screenWidth ))
					if (
						newDistance <
						-1 * swiperScrollWrapperWidth + this.state.screenWidth
					) {
						newDistance = 0;
					}
					this.setState(
						{
							translateDistance: newDistance,
							indicatorIndex:
								this.state.indicatorIndex + 1 >
								this.state.imgs.length - 1
									? 0
									: this.state.indicatorIndex + 1
						},
						() => {}
					);
				}, this.state.autoTime)
			});
		}
	};

	cancleAutoScroll = e => {
		//touchStart
		clearInterval(this.state.timer);
		this.setState({
			transitionTime: 0,
			stopx: e.targetTouches[0].clientX
		});
	};
	moveScroll = e => {
		//console.log(e.targetTouches[0].clientX)
		if (!this.state.stopx) return;
		let gap = e.targetTouches[0].clientX - this.state.stopx;
		if (this.state.translateDistance + gap > 0) return;
		if (
			(this.state.translateDistance + gap) * -1 >
			this.state.swiperScrollWrapperWidth - this.state.screenWidth
		) {
			console.log('太左边了');
			return;
		}
		this.refs.scroller.style.transform =
			'translate3d(' + (this.state.translateDistance + gap) + 'px,0,0)';
	};

	validateScroll = distance => {
		if (distance >= 0) {
			return 0;
		} else if (
			distance <=
			-1 * (this.state.swiperScrollWrapperWidth - this.state.screenWidth)
		) {
			return (
				-1 *
				(this.state.swiperScrollWrapperWidth - this.state.screenWidth)
			);
		} else {
			return distance;
		}
	};

	cancelTouchMove = () => {
		this.setState(
			{
				transitionTime: this.state.transitionTiemSet
			},
			() => {
				let endDistance = parseInt(
					this.refs.scroller.style.transform
						.split('px')[0]
						.split('(')[1],
					10
				);
				if (endDistance === 0) return;

				let abs = parseInt(endDistance / this.state.screenWidth, 10);

				let leave =
					this.state.screenWidth +
					(endDistance % this.state.screenWidth);

				if (endDistance > this.state.translateDistance) {
					//往右滑动了
					console.log('往右花了');

					if (leave > this.state.screenWidth / 1.2) {
						// if( leave  > this.state.screenWidth/2){

						this.setState(
							{
								translateDistance: this.validateScroll(
									abs * this.state.screenWidth
								),
								indicatorIndex: Math.abs(abs)
							},
							() => {
								this.setAutoScroll();
							}
						);
					} else {
						this.setState(
							{
								translateDistance: this.validateScroll(
									abs * this.state.screenWidth
								),
								indicatorIndex: Math.abs(abs)
							},
							() => {
								this.setAutoScroll();
							}
						);
					}
				} else {
					console.log('往左花了');
					if (leave > this.state.screenWidth / 1.2) {
						//if( leave  > this.state.screenWidth/2){
						console.log('大于 === ' + abs * this.state.screenWidth);
						this.refs.scroller.style.transform =
							'translate3d(' +
							this.validateScroll(abs * this.state.screenWidth) +
							'px,0,0)';
						this.setState(
							{
								translateDistance: this.validateScroll(
									abs * this.state.screenWidth
								),
								indicatorIndex: Math.abs(abs)
							},
							() => {
								this.setAutoScroll();
							}
						);
					} else {
						console.log('小于 === ' + abs * this.state.screenWidth);
						this.setState(
							{
								translateDistance: this.validateScroll(
									(abs - 1) * this.state.screenWidth
								),
								indicatorIndex: Math.abs(abs - 1)
							},
							() => {
								this.setAutoScroll();
							}
						);
					}
				}
			}
		);
	};

	imgClickEvent = item => {
		if (item.link) {
			window.location.href = item.link;
		}
		return;
	};

	indicators = imgs => {
		let list = imgs.map((item, index) => (
			<li
				key={index}
				className={this.state.indicatorIndex === index ? 'focus' : ''}
			/>
		));
		return list;
	};

	componentDidMount () {
		this.getImgList();
		/*  window.onresize=()=>{
              console.log("resizeddd")
              this.forceUpdate();
          }*/
		window.addEventListener('resize', this.setWrapperWidth, false);
	}

	render () {
		return (
			<div
				className="swiperWrapper"
				style={{ display: this.state.showTemplate ? 'block' : 'none' }}
				onTouchStart={this.cancleAutoScroll}
				onTouchMove={this.moveScroll}
				onTouchEnd={this.cancelTouchMove}
			>
				{' '}
				{/** onTouchEnd={this.setAutoScroll} */}
				<div
					className="swiperScrollWrapper"
					ref="scroller"
					style={{
						width: this.state.swiperScrollWrapperWidth + 'px',
						transition: this.state.transitionTime + 'ms',
						WebkitTransition: this.state.transitionTime + 'ms',
						transform:
							'translate3d(' +
							this.state.translateDistance +
							'px,0,0)',
						WebkitTransform:
							'translate3d(' +
							this.state.translateDistance +
							'px,0,0)'
					}}
				>
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
				</div>
				<div className="indicatorWrapper">
					<ul>{this.indicators(this.state.imgs)}</ul>
				</div>
			</div>
		);
	}
}

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { PhotoSwipe } from 'react-photoswipe';

import { showDefaultImg } from '../../utils/common';
import { getPicLists } from '../../apis';

import 'react-photoswipe/lib/photoswipe.css';
import './itemWithPic.scss';

class ItemWithPic extends Component {
	constructor (props) {
		super(props);

		this.state = {
			isOpen: false,
			items: [],
			options: {
				shareEl: false,
				history: false,
				focus: false
			}
		};
	}

	handleClose = () => {
		this.setState({
			isOpen: false
		});
	};

	handleOpen = (id, title) => {
		getPicLists(id).then(res => {
			// console.log(res);
			// 根据返回图片，封装数据，再显示幻灯片
			if (Array.isArray(res.data.list)) {
				let _picLists = res.data.list.map(item => {
					return {
						src: item.image,
						w: 1200,
						h: 900,
						title: title
					};
				});
				this.setState(
					{
						items: _picLists
					},
					() => {
						this.setState({
							isOpen: true
						});
					}
				);
			}
		});
	};

	render () {
		return (
			<div>
				<div
					className="item"
					key={this.props.data.id}
					data-id={this.props.data.id}
					onClick={this.handleOpen.bind(
						this,
						this.props.data.id,
						this.props.data.title
					)}
				>
					<div className="title"> {this.props.data.title}</div>
					<div className="img">
						{' '}
						<img
							src={this.props.data.thumb}
							alt=""
							onError={showDefaultImg}
						/>
					</div>
					<div className="about-info">
						{' '}
						{decodeURIComponent(this.props.data.about)}{' '}
					</div>
				</div>
				{/* 图片幻灯片 */}
				<PhotoSwipe
					isOpen={this.state.isOpen}
					items={this.state.items}
					options={this.state.options}
					onClose={this.handleClose}
				/>
			</div>
		);
	}
}

export default withRouter(ItemWithPic);

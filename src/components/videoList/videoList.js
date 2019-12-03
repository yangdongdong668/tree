import React from 'react';
import './videoList.scss';

export default class VideoList extends React.Component {
	state = {
		imgs: [
			{
				image:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539925510345&di=3844e5020c4daf9786c514861a89a323&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201410%2F25%2F20141025221057_zf2Fc.thumb.700_0.jpeg',
				title: '图片1',
				link: 'http://jd.com'
			},
			{
				image:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539925510345&di=3844e5020c4daf9786c514861a89a323&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201410%2F25%2F20141025221057_zf2Fc.thumb.700_0.jpeg',
				title: '图片1',
				link: 'http://jd.com'
			},
			{
				image:
					'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1539925510345&di=3844e5020c4daf9786c514861a89a323&imgtype=0&src=http%3A%2F%2Fimg4.duitang.com%2Fuploads%2Fitem%2F201410%2F25%2F20141025221057_zf2Fc.thumb.700_0.jpeg',
				title: '图片1',
				link: 'http://jd.com'
			}
		],
		showTemplete: false,
		imgWrapperWidth: window.screen.width
	};

	setImgList = () => {
		let len = this.state.imgs.length;
		if (len <= 0) return;
		if (len <= 1) {
			this.setState({
				showTemplete: true
			});
		} else {
			this.setState({
				showTemplete: true
			});
		}
	};

	componentDidMount () {
		this.setImgList();
	}

	render () {
		return (
			<div style={{ display: this.state.showTemplete ? 'block' : 'none' }}>
				<div className="videoTitle">孩子们在幼儿园学习画画</div>
				<div className="videoImgListWrapper">
					<div
						className="videoImgListScrollWrapper"
						style={{ width: this.state.imgWrapperWidth + 'px' }}
					>
						{this.state.imgs.map((item, index) => (
							<div className="itemWrapper" key={index}>
								<img src={item.image} />
							</div>
						))}
					</div>
				</div>
			</div>
		);
	}
}

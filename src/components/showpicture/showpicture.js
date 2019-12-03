import React from 'react';

import './showpicture.scss';

export default class ShowPicture extends React.Component {
	state = {
		src: null,
		showThisPage: false,
		imgMarginTop: 0
	};

	setImgSrc = src => {
		this.setState({
			src: src
		});
	};

	show = imgSrc => {
		this.setState(
			{
				showThisPage: true,
				src: imgSrc
			},
			() => {
				let height = this.refs.img.offsetHeight;
				this.setState({
					imgMarginTop: (-1 * height) / 2 + 'px'
				});
			}
		);
	};

	hide = e => {
		if (e.target === this.refs.img) {
			return;
		}
		this.setState({
			showThisPage: false
		});
	};

	componentWillReceiveProps(nextProps) {
		if (this.props.imgSrc !== nextProps.imgSrc) {
			this.setImgSrc(nextProps.imgSrc);
		}
	}

	render() {
		return this.state.showThisPage ? (
			<div className="pictureWrapper" onClick={this.hide}>
				<img
					alt=""
					src={this.state.src}
					style={{ marginTop: this.state.imgMarginTop }}
					ref="img"
				/>
			</div>
		) : (
			''
		);
	}
}

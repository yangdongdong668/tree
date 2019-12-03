import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import NoContentTip from '../nocontentpage/nocontentpage';
import './tongzhi.scss';

import {
	showDefaultImg,
	getLang,
	setTitle,
	changeColor
} from '../../utils/common';
import lang from '../../utils/lang';

import {getTongzhi } from '../../apis';

class Tongzhi extends Component {
	state = {
		allListData: [],
		pageColor: false,
		...lang.news[getLang()]
	};

	getPageData = () => {
			getTongzhi().then(res => {
				//储存所有数据
				let data = res.data.data;
				console.log(data);
				if (data.length > 0) {
					let dataArr = data.map(item => {
						return {
							imgsrc: item.thumbs,
							title: item.title,
							time: item.createtime,
							id: item.id,
							url: item.linkurl,
							
						};
					});
					this.setState({
						allListData: dataArr
					});
				}
			});
	};

	routerTo = item => {
		//跳转到详情页面
		if (item.url.length > 0) {
			window.location.href = item.url;
			return;
		}
		this.props.history.push('/htmlcontentpage/' + item.id);
	};

	componentDidMount () {
		changeColor(this.state.pageColor);
		setTitle(this.state.newListText);
		this.getPageData();
	}

	render () {
		return (
			<div className="newsWrapper">
				{this.state.allListData.length ? (
					this.state.allListData.map((item, index) => {
						if (item.imgsrc) {
							return (
								<div
									className="singleItemWrapper"
									key={item.title + index}
									onClick={this.routerTo.bind(this, item)}
								>
									<div className="imgWrapper">
										<img alt="" src={item.imgsrc} onError={showDefaultImg} />
									</div>
									<div className="textWrapper">
										<p className="newsTitle">{item.title}</p>
										<p className="newsTime">{item.time}</p>
									</div>
								</div>
							);
						} else {
							return (
								<div className="singleItemWrapper_2" key={item.title + index}>
									<p className="newsTitle">{item.title}</p>
									<p className="newsTime">{item.time}</p>
								</div>
							);
						}
					})
				) : (
					<NoContentTip />
				)}
			</div>
		);
	}
}

export default withRouter(Tongzhi);

import React, { Component } from 'react';
import './listPage.scss';
import ItemWithPic from './itemWithPic';
import ItemWithoutPic from './itemWithoutPic';
import NoContentTip from '../nocontentpage/nocontentpage';

import { changeColor } from '../../utils/common';

export default class listPage extends Component {
	constructor (props) {
		super(props);

		this.state = {
			// showLoading: true,
			// hasGetAll: false,
			// pageSize: 10,
			// pageIndex: 0,
			// loadButtonText: "+点击获取更多",
			select: ''
		};
	}
	// 设置选中展开的值
	setSelect (select) {
		this.setState({
			select: select
		});
	}

	componentDidMount () {
		changeColor(this.state.pageColor);
	}

	render () {
		return (
			<div className="aboutUsWrapper_page">
				{this.props.list.length ? (
					this.props.list.map((item, index) => {
						return item.thumb ? (
							<ItemWithPic data={item} key={index} />
						) : (
							<ItemWithoutPic
								func={this.props.func}
								data={item}
								setSelect={select => {
									this.setSelect(select);
								}}
								key={index}
								select={this.state.select}
							/>
						);
					})
				) : (
					<NoContentTip />
				)}
			</div>
		);
	}
}

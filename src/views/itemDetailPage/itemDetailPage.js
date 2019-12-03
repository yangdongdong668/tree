import React, { Component } from 'react';

import ArticlePage from '../articlePage/articlePage';
import NoContentTip from '../nocontentpage/nocontentpage';

import { getItemDetail } from '../../apis';
import { setTitle, changeColor } from '../../utils/common';

import './itemDetailPage.scss';

export default class ItemDetailPage extends Component {
	state = {
		type: null,
		info: { content: '' },
		pageColor: false
	};

	renderPage = id => {
		getItemDetail(id).then(res => {
			let data = res.data;

			this.setState(
				{
					type: data.type,
					info: data.info
				},
				() => {
					if (this.state.info.title !== undefined)
						setTitle(this.state.info.title);
				}
			);
		});
	};

	componentDidMount () {
		this.renderPage(this.props.match.params.id);
		changeColor(this.state.pageColor);
	}
	componentWillReceiveProps (nextProps) {
		if (nextProps.location.pathname !== this.props.location.pathname) {
			// console.log("this is itemdetailpage recive")
			this.renderPage(nextProps.match.params.id);
		}
	}

	render () {
		return (
			<div>
				{this.state.info.content.length > 0 ? (
					<ArticlePage info={this.state.info} />
				) : (
					<NoContentTip />
				)}
			</div>
		);
	}
}

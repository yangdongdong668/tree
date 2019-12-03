import React, { Component } from 'react';
import ArticlePage from '../articlePage/articlePage';
import ListPage from '../listPage/listPage';
import NoContentTip from '../nocontentpage/nocontentpage';
import './htmlcontentpage.scss';

import { getList, getAccordion } from '../../apis'; 

import { setTitle, changeColor, showAccordion } from '../../utils/common';
export default class HtmlContentPage extends Component {
	constructor (props) {
		super(props);

		this.state = {
			type: null,
			article: null,
			dataList: [],
			pageColor: false,
			func: 'normal'
		};
	}

	renderPage = id => {
		// 手风琴效果页面请求
		if (showAccordion(id)) {
			getAccordion(id).then(res => {
				let _data = res.data;

				this.setState(
					{
						type: _data.type,
						dataList: _data.list,
						func: 'accordion'
					},
					() => {
						setTitle(_data.title);
					}
				);
			});
			return;
		}
		// 正常列表页面请求
		getList(id).then(res => {
			let _data = res.data;
			console.log(_data);
			this.setState(
				{
					type: _data.type,
					article: _data.info || null,
					dataList: _data.list || [],
					title:
						(_data.info && _data.info.title
							? _data.info.title
							: null) || (_data.title ? _data.title : null),
					func: 'normal'
				},
				() => {
					if (this.state.title) setTitle(this.state.title);
				}
			);
		});
	};

	componentDidMount () {
		changeColor();
		this.renderPage(this.props.match.params.id);
		// console.log(this);
	}
	componentWillReceiveProps (nextProps) {
		if (nextProps.location.pathname !== this.props.location.pathname) {
			// console.log("htmlcontentpage recive props")
			// console.log("nextProps.match.params.id = " + nextProps.match.params.id)
			this.renderPage(nextProps.match.params.id);
		}
	}

	render () {
		return (
			<div>
				{this.state.type === 'article' ? (
					<ArticlePage info={this.state.article} />
				) : this.state.type === 'cate' ? (
					<ListPage
						func={this.state.func}
						list={this.state.dataList}
					/>
				) : (
					<NoContentTip />
				)}
			</div>
		);
	}
}

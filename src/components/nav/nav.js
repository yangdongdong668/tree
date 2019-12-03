import React, { Component } from 'react';
import { NavLink, HashRouter } from 'react-router-dom';

import { getMenu } from '../../apis';
import lang from '../../utils/lang';

import './nav.scss';
import { getLang } from '../../utils/common';

class Nav extends Component {
	constructor () {
		super();
		this.state = {
			choosedIndex: -1,
			navList: [
				{
					title: lang.nav[getLang()]['homeText'],
					to: '/'
				},
				{
					title: lang.nav[getLang()]['newListText'],
					to: '/newslist'
				}
			],
			showList: false,
			showPageMask: false
		};
	}

	// 打开菜单
	navOpen = () => {
		this.setState(
			{
				showPageMask: true
			},
			() => {
				setTimeout(() => {
					this.setState(
						{
							showList: true
						},
						() => {
							this.toggleMenuBotton(false);
						}
					);
				}, 0);
			}
		);
	};
	// 关闭菜单
	navClose = () => {
		this.setState(
			{
				showList: false
			},
			() => {
				setTimeout(() => {
					this.setState(
						{
							showPageMask: false
						},
						() => {
							this.toggleMenuBotton(true);
						}
					);
				}, 500);
			}
		);
	};

	openList = () => {
		this.state.showList ? this.navClose() : this.navOpen();
	};

	//改变父级按钮的样式
	toggleMenuBotton = ifShow => {
		this.props.toggleMenuBotton(ifShow);
	};

	componentWillReceiveProps (nextprops) {
		if (this.props.showNav !== nextprops.showNav) {
			this.openList();
		}
	}

	componentDidMount () {
		getMenu().then(data => {
			
			let _data = data.data.data;
			console.log(_data);

			if (_data.length > 0) {
				let navList = _data.map(item => {
					// 创办人
					if (item.title === lang.title[getLang()]['founderText'])
						return {
							title: item.title,
							id: item.id,
							to: '/founder/' + item.id
						};

					// return item.type === 'article' ?
					//     { title: item.title, id: item.id, to: '/article/' + item.id } :
					//     { title: item.title, id: item.id, to: '/cate-list/' + item.id };

					return {
						title: item.title,
						id: item.id,
						to: '/htmlcontentpage/' + item.id
					};
				});

				this.setState({
					navList: this.state.navList.concat(navList)
				});
			}
		});
	}

	render () {
		return (
			<div>
				<div
					className="wrapper2"
					onClick={this.openList}
					style={{
						display: this.state.showPageMask ? 'block' : 'none'
					}}
				>
					<div className="listWrapper">
						<HashRouter>
							<ul
								className={
									this.state.showList ? 'show' : 'hide'
								}
							>
								{this.state.navList.map((item, index) => (
									<li key={index}>
										<NavLink
											to={item.to}
											activeClassName="focus"
											exact
										>
											{item.title}
										</NavLink>
									</li>
								))}
							</ul>
						</HashRouter>
					</div>
				</div>
			</div>
		);
	}
}

export default Nav;

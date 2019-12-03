import React, { Component } from 'react';
import { HashRouter, Link } from 'react-router-dom';

import { getLang, setLang } from '../../utils/common';

import './header.scss';
import Nav from '../nav/nav';

class Header extends Component {
	state = {
		showOpenListButton: true,
		lock: false, //点击弹出菜单后，500ms内禁止重复点击
		showNav: false,
		lang: '',
		langPic: ''
	};

	toggleMenuListShow = () => {
		//控制菜单显示与否
		if (!this.state.lock) {
			//父组件调用子组件的方法
			this.refs.menuList.openList();
			this.setState(
				{
					lock: true,
					showOpenListButton: !this.state.showOpenListButton,
					showNav: !this.state.showNav
				},
				() => {
					setTimeout(() => {
						this.setState({
							lock: false
						});
					}, 600);
				}
			);
		}
	};

	toggleMenuBotton = ifShow => {
		this.setState({
			showOpenListButton: ifShow
		});
	};

	// 改变语言
	changeLang = () => {
		// 修改语言
		setLang(this.showNextLang());

		this.setState(
			{
				lang: getLang()
			},
			() => {
				// 更改语言后，可能要重新跳转到首页
				console.log('更改后语言', this.state.lang, getLang());
				window.location.href = '/';
			}
		);
	};

	showNextLang () {
		return this.state.lang === 'en' ? 'cn' : 'en';
	}

	componentDidMount () {
		// 获取语言
		this.setState(
			{
				lang: getLang()
			},
			() => {
				console.log('当前语言', this.state.lang);
			}
		);
	}

	render () {
		return (
			<div className="wrapper">
				<div className="logoWrapper" onClick={this.goToMainPage}>
					<HashRouter>
						<Link to="/">
							<img 
								className="logoImg"
								src={require('../../assets/imgs/logo_guide_483.png')}
								alt=""
							/>
						</Link>
					</HashRouter>
				</div>

				<div className="iconWrapper">
					{/* {this.state.lang ? (
						<img
							src={require('../../assets/imgs/' +
								this.showNextLang() +
								'.png')}
							alt=""
							className="icon_list"
							onClick={this.changeLang}
						/>
					) : (
						''
					)} */}
					<img
						src={require('../../assets/imgs/icon_list.png')}
						alt=""
						style={{
							display: this.state.showOpenListButton
								? 'inline-block'
								: 'none'
						}}
						className="icon_list"
						onClick={this.toggleMenuListShow}
					/>
					<img
						src={require('../../assets/imgs/icon_clode.png')}
						alt=""
						style={{
							display: this.state.showOpenListButton
								? 'none'
								: 'inline-block'
						}}
						className="icon_list"
						onClick={this.toggleMenuListShow}
					/>
				</div>
				<Nav ref="menuList" toggleMenuBotton={this.toggleMenuBotton} />
			</div>
		);
	}
}
export default Header;

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ItemWithoutPic extends Component {
	constructor (props) {
		super(props);

		this.state = {
			isShow: false,
			arr: false
		};
	}

	// 手风琴点击
	show (id) {
		this.props.setSelect(id !== this.props.select ? id : '');
	}

	// 页面跳转
	gotoPage (id) {
		this.props.history.push('/itemdetailpage/' + id);
	}
	// 格式化 HTML 代码不显示问题  如果内容大于 65535 个字节，显示不全
	htmlDecode (input) {
		let e = document.createElement('div');
		e.innerHTML = input;
		return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
	}

	componentWillReceiveProps (nextProps) {
		if (
			nextProps.select !== '' &&
			this.refs.info.getAttribute('data-id') === nextProps.select
		) {
			this.setState({
				isShow: true,
				arr: true
			});
		} else {
			this.setState({
				isShow: false,
				arr: false
			});
		}
	}
	shouldComponentUpdate (nextProps, nextState) {
		// console.log(nextProps.select, nextState.isShow, this.state.isShow);

		// if (nextProps.select === this.p)
		// this.state.isShow ? this.setState({ arr: true }) : this.setState({ arr: false });

		if (this.refs.info !== undefined) {
			// 设置动画  下一个 isShow === true && 选中的 id === 当前元素的 id && 目前 isShow === false，打开手风琴
			if (
				nextState.isShow &&
				nextProps.select === this.refs.info.getAttribute('data-id') &&
				!this.state.isShow
			) {
				this.refs.info.style.height = 'auto';
				let eleHeight = window.getComputedStyle(this.refs.info).height;
				this.refs.info.style.height = '0';

				window.requestAnimationFrame(() => {
					this.refs.info.style.height =
						eleHeight.slice(0, -2) === '0' ? '10px' : eleHeight;
				});

				return true;
			}

			// 下一个 isShow === false && 选中的 id !== 当前元素的 id && 目前 isShow === true
			if (
				!nextState.isShow &&
				nextProps.select !== this.refs.info.getAttribute('data-id') &&
				this.state.isShow
			) {
				this.refs.info.style.height = '0';
				return true;
			}
		}

		return true;
	}
	render () {
		return this.props.func === 'normal' ? (
			<div
				className="item"
				key={this.props.data.id}
				data-id={this.props.data.id}
				onClick={this.gotoPage.bind(this, this.props.data.id)}
			>
				<div className="title"> {this.props.data.title} </div>
				<div className="about-info" data-id={this.props.data.id}>
					{decodeURIComponent(this.props.data.about)}
				</div>
			</div>
		) : (
			<div
				className="item"
				key={this.props.data.id}
				data-id={this.props.data.id}
				onClick={this.show.bind(this, this.props.data.id)}
			>
				<div className="title accordion"> {this.props.data.title} </div>
				<div
					className="item-info"
					data-id={this.props.data.id}
					ref="info"
					dangerouslySetInnerHTML={{
						__html: this.htmlDecode(this.props.data.content)
					}}
				/>
				<i className={this.state.arr ? 'arrow arr-open' : 'arrow arr-close'} />
			</div>
		);
	}
}
export default withRouter(ItemWithoutPic);

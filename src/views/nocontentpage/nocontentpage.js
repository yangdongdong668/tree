import React, { Component } from 'react';
import './nocontentpage.scss';
import Loading from '../../components/loading/loading';
import lang from '../../utils/lang';
import { getLang } from '../../utils/common';
class NoContentPage extends Component {
	state = {
		showLoading: true,
		pageColor: false,
		remove: null,
		...lang.noContent[getLang()]
	};
	changeColor = () => {
		if (this.state.pageColor) {
			document.getElementById('pageContentWrapper').style.background =
				'#f1f7fe';
		} else {
			document.getElementById('pageContentWrapper').style.background =
				'#ffffff';
		}
	};
	componentDidMount () {
		this.changeColor();
		this.timer = setTimeout(() => {
			this.setState({
				showLoading: false
			});
		}, 4000);
	}

	componentWillUnmount () {
		clearTimeout(this.timer);
	}

	render () {
		return (
			<div>
				<div className="noContentPage">
					{!this.state.showLoading ? (
						<div>
							<div className="imgWrapper">
								<img
									alt=""
									src={require('../../assets/imgs/noContent.png')}
								/>
							</div>
							<div className="tipWrapper">
								<p className="tipMessage">
									{this.state.msgText01}
								</p>
								<p className="tipMessage">
									{this.state.msgText02}
								</p>
							</div>
						</div>
					) : (
						<div>
							<Loading />
						</div>
					)}
				</div>
			</div>
		);
	}
}

export default NoContentPage;

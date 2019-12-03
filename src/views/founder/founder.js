import React from 'react';

import NoContentTip from '../nocontentpage/nocontentpage';

import { founderData } from '../../apis';
import { setTitle, changeColor } from '../../utils/common';

import './founder.scss';

export default class founder extends React.Component {
	state = {
		title: '创办人',
		content: '',
		planList: [],
		cateId: '',
		pageColor: false
	};

	renderPage = id => {
		founderData(id).then(res => {
			let data = res.data;
			console.log(data);
			this.setState(
				{
					content: data.founderinfo.info.content,
					planList: this.state.planList.concat(data.list),
					cateId: data.cateid
					// title: data.founderinfo.info.title
				},
				() => {
					setTitle(this.state.title);
				}
			);
		});
	};
	routerTo = item => {
		if (item.url.trim().length > 0) {
			window.location.href = item.url;
			return;
		}
		this.props.history.push('/itemdetailpage/' + item.id);
	};

	getAllPlanData = () => {
		this.props.history.push('/htmlcontentpage/&cateid=' + this.state.cateId); //获取详情
	};

	componentDidMount () {
		this.renderPage(this.props.match.params.id);
		changeColor(this.state.pageColor);
	}
	componentWillReceiveProps (nextProps) {
		if (nextProps.location.pathname !== this.props.location.pathname) {
			this.renderPage(nextProps.match.params.id);
		}
	}

	render () {
		return this.state.content !== '' ? (
			<div className="founder_wrapper">
				<div className="founder_person">
					<div>
						<span>
							<img src={require('../../assets/imgs/founder_pic.png')} alt="" />
						</span>
					</div>
					<div
						className="founder_person_con"
						dangerouslySetInnerHTML={{
							__html: decodeURIComponent(this.state.content)
						}}
					/>
				</div>

				<div className="programme">
					<div className="programme_title">
						<span>菲纳克思方案</span>
					</div>
					<div className="programme_title_pic">
						<img src={require('../../assets/imgs/pic_lan.png')} alt="" />
					</div>
					{this.state.planList.map((item, index) => (
						<div
							className="programme_con"
							key={'planList' + index}
							onClick={this.routerTo.bind(this, item)}
						>
							<div className="programme_con_title">
								<span className="spot1">{item.title}</span>
							</div>
							<p className="programme_con_time">
								<span>{item.createtime}</span>
							</p>
						</div>
					))}
					<div className="programme_getmore">
						<span onClick={this.getAllPlanData}>更多方案>></span>
					</div>
				</div>
			</div>
		) : (
			<NoContentTip />
		);
	}
}

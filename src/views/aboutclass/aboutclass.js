import React from 'react';

import { showDefaultImg } from '../../utils/common';

import './aboutclass.scss';
export default class AboutClass extends React.Component {
	state = {
		newsList: [
			{
				imgsrc: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci4.jpg',
				title: '故人西辞黄鹤楼,烟花下了扬州',
				info: '简介信息简介信息简介信息简介信息简介信息简介信息',
				time: '2018-05-16'
			},
			{
				imgsrc: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci4.jpg',
				title: '故人西辞黄鹤楼,烟花下了扬州',
				info: '简介信息简介信息简介信息简介信息简介信息简介信息',
				time: '2018-05-16'
			},
			{
				imgsrc: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci4.jpg',
				title: '故人西辞黄鹤楼,烟花下了扬州',
				info: '简介信息简介信息简介信息简介信息简介信息简介信息',
				time: '2018-05-16'
			},
			{
				imgsrc: 'http://alloyteam.github.io/AlloyTouch/example/asset/ci4.jpg',
				title: '故人西辞黄鹤楼,烟花下了扬州',
				info: '简介信息简介信息简介信息简介信息简介信息简介信息',
				time: '2018-05-16'
			}
		]
	};
	render () {
		return (
			<div className="aboutClassWrapper">
				{this.state.newsList.map((item, index) => {
					if (item.imgsrc) {
						return (
							<div className="singleItemWrapper" key={item.title + index}>
								<div className="imgWrapper">
									<img alt="" src={item.imgsrc} onError={showDefaultImg} />
								</div>
								<div className="textWrapper">
									<p className="newsTitle">{item.title}</p>
									<p className="newsBrefInfo">{item.info}</p>
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
				})}
				<div className="getMore">
					<div>+点击获取更多</div>
				</div>
			</div>
		);
	}
}

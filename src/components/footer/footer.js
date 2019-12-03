import React, { Component } from 'react';

import { getShoolInfo } from '../../apis';
import ShowPicture from '../showpicture/showpicture';
import { getLang } from '../../utils/common';

import lang from '../../utils/lang';

import './footer.scss';

export default class Footer extends Component {
	constructor (props) {
		super(props);

		this.state = {
			address: '',
			email: '',
			tel_phone: '',
			qr_img:'',
			...lang.footer[getLang()]
		};
	}

	showBigPicture = e => {
		this.refs.showPicture.show(e.target.getAttribute('src'));
	};

	componentDidMount () {
		getShoolInfo().then(data => {
			let _data = data.data.data;
			console.log(_data);
			this.setState({
				address: _data.address,
				email: _data.email,
				tel_phone: _data.tel,
				qr_img:_data.qr_img,
				familymemberimg:_data.familymemberimg

			});
		});
	}
	render () {
		return (
			<div className="footer_bg">
				<div className="public_address">
					<div className="public_address_title">
						{/* <span>{this.state.wechatText}</span> */}
					</div>
					<div className="public_address_con">
						<dl>
						<dt>
							<img
								alt=""
								src={this.state.familymemberimg}
								onClick={this.showBigPicture}
							/>
						</dt>
						<dd>{this.state.qrcodeText}</dd>
					</dl>
					<dl>
							<dt>
								<img
									alt=""
									src={this.state.qr_img}
									onClick={this.showBigPicture}
								/>
							</dt>
							<dd>{this.state.wechatText}</dd>
						</dl>
					</div>
				</div>
				<div className="footerWrapper">
					<p className="contactTitle">{this.state.contactUsText}</p>
					<div className="gapWrapper">
						<img
							src={require('../../assets/imgs/pic_lan_white.png')}
							alt=""
						/>
					</div>
					<div className="contactUsWrapper">
						<table>
							<tbody>
								<tr>
									<td>
										<img
											alt=""
											className="infoLogo"
											src={require('../../assets/imgs/icon_bot_phone.png')}
										/>
									</td>
									<td className="infoTitle">
										{this.state.telText}：
									</td>
									<td className="phone_num">
										{/* <a href="tel:13588366505">
											13588366505{' '}
											{this.state.teacherChenText}
										</a>
										<br /> */}
										<a href="tel:0510-87063405">
											0510-87063405
										</a>
										<br />
									</td>
								</tr>
								<tr>
									<td>
										<img
											alt=""
											className="infoLogo"
											src={require('../../assets/imgs/icon_bot_email.png')}
										/>
									</td>
									<td className="infoTitle">
										{this.state.emailText}：
									</td>
									<td>{this.state.email}</td>
								</tr>
								<tr>
									<td>
										<img
											alt=""
											className="infoLogo"
											src={require('../../assets/imgs/icon_bot_location.png')}
										/>
									</td>
									<td className="infoTitle">
										{this.state.addressText}：
									</td>
									<td className="addressText">
										<p>{this.state.address}</p>
										{/* <p>{this.state.addressText01}</p>
										<p>{this.state.addressText02}</p> */}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
					<div className="foot_btm">
						<p>{this.state.copyRightText}</p>
						<p>{this.state.securityText}</p>
						<p>{this.state.icpText}</p>
					</div>
					<ShowPicture ref="showPicture" />
				</div>
			</div>
		);
	}
}

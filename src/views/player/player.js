import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Player } from 'video-react';
import "../../../node_modules/video-react/dist/video-react.css"; 
import { getItemDetail } from '../../apis';
import './player.scss';

class PlayerVideo extends Component { 
    
	state = {
		url:''
	};
	getVideoList = (id) =>{
		console.log(id);
		getItemDetail(id).then(data => {
			 let _data = data.data.info;
			console.log(_data);
			this.setState(
					{
						url: _data.video
					}
				);
			// let videos = [];
			// if(_data.length > 0){
			// 	_data.forEach(item =>{
			// 		videos.push({
			// 			link:item.thumbs
			// 		})
			// 	})
			// 	this.setState(
			// 		{
			// 			videos: videos
			// 		}
			// 	);
			// }

		})
	}

	
	componentDidMount () {
		this.getVideoList(this.props.match.params.id);
	}

	render () {
		const props = {
			autoPlay: true,
			shouldObserveResize: true,
			isFullscreen:true
		  }

		return (
				// {
				// 	this.state.videos.map((item,index) =>(
				// 		<div
				// 			className="videoImg"
				// 			key={index}
				// 			onClick={this.imgClickEvent.bind(this, item)}
				// 		>
				// 			<img
				// 				src={item.link}
				// 				alt=""
				// 				onError={showDefaultImg}
				// 				className="indexImg"
				// 			/>
				// 			<img
				// 				src={require('../../assets/imgs/icon_play1@2x.png')}
				// 				alt=""
				// 				onError={showDefaultImg}
				// 				className="indexBtn"
				// 			/>
				// 		</div>
				// 	))
				// }
           <Player
					playsInline
					{...props}
					poster="/assets/poster.png"
					src={this.state.url}
					className="palyerItem"
					ref="auto"
					/>
		);
	}
}
export default withRouter(PlayerVideo);
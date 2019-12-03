import React, { Component } from 'react';
import { withRouter } from 'react-router';
import { Carousel } from 'antd';
import 'antd/es/carousel/style/index.css'
import './videoswiper.scss';
import { getVideo } from '../../apis';
import {
	showDefaultImg,
} from '../../utils/common';

 class Swiper extends Component { 

	state = {
		videos: [
			
		],
	};
	getVideoList = () =>{
		getVideo().then(data => {
			let _data = data.data.data;
			console.log(_data);
			let videos = [];
			if(_data.length > 0){
				_data.forEach(item =>{
					videos.push({
						link:item.thumbs,
						id:item.relationID
					})
				})
				this.setState(
					{
						videos: videos
					}
				);
			}

		})
	}

	

	imgClickEvent = item => {
		console.log(item.id);
		this.props.history.push('/player/'+item.id); 	
		// if (item.link) {
		// 	window.location.href = item.link;
		// }
		return;
    };
	componentDidMount () {
		this.getVideoList();
	}

	render () {
        const settings = {
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            // beforeChange: (current, next) => {
            //     console.log(this.refs.auto.pause)
            //     this.refs.auto.pause()
            // }
          };

		return (
			<Carousel className="videoList" {...settings} autoplay>
				{
					this.state.videos.map((item,index) =>(
						<div
							className="videoImg"
							key={index}
							onClick={this.imgClickEvent.bind(this, item)}
						>
							<img
								src={item.link}
								alt=""
								onError={showDefaultImg}
								className="indexImg"
							/>
							<img
								src={require('../../assets/imgs/icon_play1@2x.png')}
								alt=""
								onError={showDefaultImg}
								className="indexBtn"
							/>
						</div>
					))
				}
                {/* <Player
					playsInline
					poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    className="palyerItem"
                    ref="auto"
					/>
                    <Player
					playsInline
					poster="/assets/poster.png"
                    src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
                    className="palyerItem"
					/> */}
				{/* {this.state.imgs.map((item, index) => (
						<div
							className="swiperScrollItem"
							key={index}
							onClick={this.imgClickEvent.bind(this, item)}
						>
							<img
								src={item.image}
								alt=""
								onError=''
							/>
						</div>
					))} */}
			</Carousel>
		);
	}
}
export default withRouter(Swiper);
import React from 'react';
import './aboutus.scss';
import NoContentTip from '../nocontentpage/nocontentpage';

import { changeColor, urlHost1 } from '../../utils/common';
class Aboutus extends React.Component {
	state = {
		allListData: [],
		pageSize: 10,
		pageIndex: 0,
		hasGetAll: false,
		newsList: [],
		loadButtonText: '+点击获取更多',
		pageColor: false
	};

	routerTo = item => {
		if (item.url.trim().length > 0) {
			window.location.href = item.url;
			return;
		} else {
			window.location.href =
				urlHost1() +
				'index/index/imgshow/id/' +
				item.id +
				'.html#&gid=1&pid=1';
			return;
		}
		// if (item.id == 654) {
		//     window.location.href = "http://e.au-fthenakis.com/index/index/imgshow/id/" + item.id + ".html#&gid=1&pid=1";
		//     return;

		// } else if (item.id == 653) {
		//     window.location.href = "http://e.au-fthenakis.com/index/index/imgshow/id/" + item.id + ".html#&gid=1&pid=1";
		//     return;

		// } else if (item.id == 655) {
		//     window.location.href = "http://e.au-fthenakis.com/index/index/imgshow/id/" + item.id + ".html#&gid=1&pid=1";
		//     return;

		// } else if (item.id == 656) {
		//     window.location.href = "http://e.au-fthenakis.com/index/index/imgshow/id/" + item.id + ".html#&gid=1&pid=1";
		//     return;

		// }
		//this.props.history.push("/itemdetailpage/" + item.id)
	};

	getPageData = id => {
		// routerToItem(id).then(res => {
		//     let data = res.data.list;
		//     setTitle(res.data.title)
		//     console.log("title=============================================" + res.data.title)
		//     if (data instanceof Array) {
		//         if (data.length > 0) {
		//             var dataArr = [];
		//             data.map(item => {
		//                 dataArr.push({
		//                     title: item.title,
		//                     imgUrl: item.thumb,
		//                     info: item.about,
		//                     id: item.id,
		//                     url: item.url
		//                 })
		//             }
		//             )
		//             this.setState({
		//                 allListData: [],
		//                 hasGetAll: false,
		//                 loadButtonText: "+点击获取更多"
		//             }, () => {
		//                 this.setState({
		//                     allListData: dataArr
		//                 }, () => {
		//                     this.setState({
		//                         pageIndex: 0
		//                     }, () => {
		//                         this.setPageData()
		//                     })
		//                 })
		//             })
		//         }
		//     }
		// })
	};

	setPageData = () => {
		//设置数据
		let len = this.state.allListData.length;

		if (len > 0) {
			if (!this.state.hasGetAll) {
				if (len <= this.state.pageSize * 1) {
					this.setState(
						{
							newsList: this.state.allListData,
							hasGetAll: true
						},
						() => {
							this.testLoadAll(); //检测数据是否加载完成
						}
					);
				} else {
					this.setState(
						{
							pageIndex: this.state.pageIndex + 1
						},
						() => {
							let endDataIndex =
								this.state.pageIndex * this.state.pageSize;
							if (len <= endDataIndex) {
								endDataIndex = len;
								this.setState({
									hasGetAll: true,
									newsList: this.state.allListData.slice(
										0,
										endDataIndex
									)
								});
							}
							this.setState(
								{
									newsList: this.state.allListData.slice(
										0,
										endDataIndex
									)
								},
								() => {
									this.testLoadAll();
								}
							);
						}
					);
				}
			} else {
				console.log('you have loaded all list data');
			}
		}
	};

	testLoadAll = () => {
		//检测数据是否加载完成
		if (this.state.hasGetAll) {
			this.setState({
				loadButtonText: '已加载所有数据'
			});
		}
	};

	componentDidMount () {
		// console.log("this.props.match.params.id-------------="+this.props.match.params.id)
		this.getPageData(this.props.match.params.id);
		changeColor(this.state.pageColor);
	}

	componentWillReceiveProps (nextProps) {
		if (nextProps.id !== this.props.id) {
			//   console.log("recived-----------------------")
			//   console.log("nextProps.id-------------------="+nextProps.id)
			this.getPageData(nextProps.id);
		}
	}

	render () {
		return (
			<div className="aboutUsWrapper_page">
				{' '}
				{this.state.newsList.map((item, index) => {
					if (item.imgUrl.length > 0) {
						return (
							<div
								key={item.title}
								onClick={this.routerTo.bind(this, item)}
								data-id={item.id}
							>
								{' '}
								{/* <div className="title">{item.title+this.props.match.params.id}</div> */}{' '}
								<div className="title"> {item.title} </div>{' '}
								<div className="img">
									{' '}
									<img src={item.imgUrl} alt="" />
								</div>
								<div className="info">
									{' '}
									{decodeURIComponent(item.info)}{' '}
								</div>{' '}
							</div>
						);
					} else {
						return (
							<div
								key={item.title}
								onClick={this.routerTo.bind(this, item)}
								data-id={item.id}
							>
								<div className="title"> {item.title} </div>{' '}
								<div className="info"> {item.info} </div>{' '}
							</div>
						);
					}
				})}{' '}
				{this.state.newsList.length > 0 ? (
					<div className="getMore">
						<div
							onClick={this.setPageData}
							style={{
								display:
									this.state.allListData.length >
									this.state.pageSize
										? 'block'
										: 'none'
							}}
						>
							{' '}
							{this.state.loadButtonText}{' '}
						</div>{' '}
						{/* { <Loading></Loading> } */}{' '}
					</div>
				) : (
					<NoContentTip showLoading={this.state.showLoading}>
						{' '}
					</NoContentTip>
				)}
			</div>
		);
	}
}

// export default withRouter(Aboutus);

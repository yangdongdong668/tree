import React, { Component } from 'react';
import './articlePage.scss';
import NoContentTip from '../nocontentpage/nocontentpage';

export default class ArticlePage extends Component {
	render () {
		return (
			<div>
				<div className="pageArticleWrapper">
					{this.props.info.content.length > 0 ? (
						<div className="pageArticle">
							<p className="articleTitle">
								{this.props.info.title.replace(/&quot;/g, '"')}
							</p>
							<p className="articleTime"> {this.props.info.time} </p>
							<div
								style={{
									fontSize: 'initial',
									marginTop: '18px'
								}}
								dangerouslySetInnerHTML={{
									__html: decodeURIComponent(this.props.info.content)
								}}
							/>
						</div>
					) : (
						<NoContentTip> </NoContentTip>
					)}
				</div>
			</div>
		);
	}
}

import React, { Component } from 'react';

import Router from '../../router/router';
import './pagecontent.scss';

import Footer from '../footer/footer';
class PageContent extends Component {
	render () {
		return (
			<div className="pageContentWrapper" id="pageContentWrapper">
				<Router />
				<Footer />
			</div>
		);
	}
}

export default PageContent;

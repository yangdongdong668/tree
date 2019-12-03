import React, { Component } from 'react';
import PageHeader from './components/header/header';
import PageContent from './components/pagecontent/pagecontent';
import { getLang } from './utils/common';
import wxShare from './utils/wxShare';

import './App.scss';
class App extends Component {
	componentDidMount () {
		wxShare.config();
	}

	render () {
		return (
			<div className={'app ' + getLang()}>
				<div className="header-wrapper">
					<PageHeader history={this.props.history} />
				</div>
				<PageContent />
			</div>
		);
	}
}

export default App;

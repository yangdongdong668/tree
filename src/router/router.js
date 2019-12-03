import React, { Component } from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';

import MainPage from '../views/mainpage/mainpage';
import NewsList from '../views/news/news';
import Tongzhi from '../views/tongzhi/tongzhi';
import Player from '../views/player/player';
import AboutClass from '../views/aboutclass/aboutclass';
import HtmlContentPage from '../views/htmlcontentpage/htmlcontentpage';
import ItemDetailPage from '../views/itemDetailPage/itemDetailPage';
import Founder from '../views/founder/founder';
import ErrorPage from '../views/errorpage/errorpage';
import ScrollToTop from '../components/scrolltotop/scrollToTop';

export default class IRouter extends Component {
	render () {
		return (
			<HashRouter>
				<ScrollToTop>
					<Switch>
						<Route exact path="/" component={MainPage} />
						<Route path="/mainpage" component={MainPage} />
						<Route path="/tongzhi" component={Tongzhi} />
						<Route path="/newslist" component={NewsList} />
						<Route path="/player/:id" component={Player} />
						<Route path="/aboutclass" component={AboutClass} />
						<Route
							path="/htmlcontentpage/:id/"
							component={HtmlContentPage}
						/>
						<Route
							path="/itemdetailpage/:id/"
							component={ItemDetailPage}
						/>
						<Route path="/founder/:id/" component={Founder} />
						<Route component={ErrorPage} />
					</Switch>
				</ScrollToTop>
			</HashRouter>
		);
	}
}

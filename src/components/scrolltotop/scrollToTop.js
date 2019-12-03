import { Component } from 'react';
import { withRouter } from 'react-router-dom';

class ScrollToTop extends Component {
	componentDidUpdate (prevProps) {
		if (this.props.location.pathname !== prevProps.location.pathname) {
			window.scrollTo(0, 0);
		}
	}
	render () {
		console.log(this.props.children);
		return this.props.children;
	}
}

export default withRouter(ScrollToTop);

import React from 'react';
import './loading.scss';
export default class Loading extends React.Component {
	render () {
		return (
			<div className="transition-loader">
				<div className="transition-loader-inner">
					<label />
					<label />
					<label />
					<label />
					<label />
					<label />
				</div>
			</div>
		);
	}
}

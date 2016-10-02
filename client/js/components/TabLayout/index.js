import React from 'react';
import classNames from 'classnames';
import './style.scss';

class TabLayout extends React.Component {
	static propTypes = {
		tabData: React.PropTypes.array.isRequired,
		selectedTab: React.PropTypes.string
	};

	constructor(props) {
		super(props);

		this.handleTabClick = this.handleTabClick.bind(this);

		this.state = {
			selectedTab: this.props.selectedTab || this.props.tabData[0].id
		};
	}

	handleTabClick(e) {
		let selectedTabID = e.target.getAttribute('data-tab-id');

		this.setState({
			selectedTab: selectedTabID
		});
	}

	renderTabs() {
		let tabs = this.props.tabData.map((tab) => {
			let tabStyle = {
				width: `${100 / this.props.tabData.length}%`
			};
			let tabClass = classNames({
				'tab-layout__tab': true,
				'tab-layout__tab--selected': this.state.selectedTab == tab.id
			});

			return (
				<li data-tab-id={tab.id} className={tabClass} key={tab.id} style={tabStyle}>
					{tab.label}
				</li>
			);
		});

		return tabs;
	}

	renderTabContent() {
		let children = this.props.children;

		let tabContent = React.Children.map(this.props.children, (child, index) => {

			return React.cloneElement(child, {
				style: {
					display: child.props['data-tab-id'] == this.state.selectedTab ? 'block' : 'none'
				}
			});
		});

		return tabContent;
	}

	render() {
		return (
			<div className="tab-layout">
				<div className="tab-layout__tabs">
					<ul onClick={this.handleTabClick}>{this.renderTabs()}</ul>
				</div>
				<div className="tab-layout__body">
					{this.renderTabContent()}
				</div>
			</div>
		);
	}
}

export default TabLayout;
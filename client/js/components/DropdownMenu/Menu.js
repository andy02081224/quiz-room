/* Libs */
import React from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

/* Styles */
import './style.scss';


class Menu extends React.Component {
	static propTypes = {
		className: React.PropTypes.string
	};

	static defaultProps = {
		className: ''
	};

	constructor(props) {
		super(props);

		this.state = {
			open: this.props.open
		};
		
		this.handleMenuTriggerClick = this.handleMenuTriggerClick.bind(this);
		this.handleMenuItemClick = this.handleMenuItemClick.bind(this);
	}

	componentDidMount() {
		let menuElement = ReactDOM.findDOMNode(this);
		document.body.addEventListener('click', (e) => {
			if (!menuElement.contains(e.target)) {
				this.setState({
					open: false
				});
			}
		});
	}

	handleMenuTriggerClick(e) {
		e.stopPropagation();
		this.setState({
			open: !this.state.open
		});
	}

	handleMenuItemClick(e) {
		e.stopPropagation();
		this.setState({
			open: false
		});
	}

	render() {	
		let menuClass = classNames('menu', ...this.props.className.split(' '), {
			'menu--open': this.state.open
		});

		let children = React.Children.map(this.props.children, (child) => {
			if (child.type.name == 'MenuTrigger') {
				return React.cloneElement(child, {
					onMenuTriggerClick: this.handleMenuTriggerClick
				}, child.props.children); 
			}
			else if (child.type.name == 'MenuDropdown') {
				return React.cloneElement(child, {
					onMenuItemClick: this.handleMenuItemClick
				}, child.props.children); 
			}
		});

		return (
			<div className={menuClass}>
				{children}
			</div>
		);
	}
}

export default Menu;
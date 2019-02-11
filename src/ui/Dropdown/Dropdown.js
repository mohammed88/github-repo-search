import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import {lightGray, darkGray, orange} from '../styles/colors';
import Spacing from '../styles/spacing';


const Wrapper = styled.div`
	width: auto;
	position: relative;
	box-sizing: border-box;
`;
const Header = styled.div`
	border: 2px solid ${lightGray};
	border-radius: 3px;
	padding: ${Spacing.small} ${Spacing.medium};
`;
const HeaderTitle = styled.div`
	display: flex;
	justify-content: space-between;
`;
const List = styled.ul`
	background: white;
	border-radius: 3px;
	border: 2px solid ${lightGray};
	box-sizing: border-box;
	list-style-type: none;
	margin: ${Spacing.small} 0;
	padding: 0;
	position: absolute;
	width: inherit;
	width:100%;
	z-index:1;
`;
const ListItem = styled.li`
	padding: ${Spacing.small} ${Spacing.medium};
	border: 2px ${lightGray};
	border-style: none none solid none;
	:hover {
		background: ${orange};
	}

	:last-child {
		border: none;
	}
`;

class Dropdown extends React.Component {
	static propTypes = {
		list: PropTypes.array.isRequired,
		onChange: PropTypes.func,
		initialValue: PropTypes.string,
	};

	static defaultProps = {
		onChange: () => {},
		initialValue: '',
	};

	constructor(props) {
		super(props);
		this.wrapper = React.createRef();
	}

	state = {
		isOpen: false,
		value: '',
	};

	toggleList = (event={
		nativeEvent: {stopImmediatePropagation: () => {}},
		stopPropagation: () => {},
	}) => {
		event && event.stopPropagation();
		event.nativeEvent && event.nativeEvent.stopImmediatePropagation && event.nativeEvent.stopImmediatePropagation();

		this.setState({isOpen: !this.state.isOpen});
	};

	close = event => {
		if (this.state.isOpen && !this.wrapper.current.contains(event.target)) {
			this.toggleList();		
		}
	};

	selectItem = (index) => {
		const value = this.props.list[index];

		this.setState(
			{value, isOpen: false}, 
			() => this.props.onChange(this.state.value),
		);
	};

	componentDidMount() {
		document.addEventListener('click', this.close);
	}

	componentWillMount() {
		document.removeEventListener('click', this.close);
	}

	render() {
		const {isOpen, value} = this.state;
		const {list, initialValue} = this.props;

		return (
			<Wrapper ref={this.wrapper} data-component-type="Dropdown">
				<Header onClick={this.toggleList}>
					<HeaderTitle>
						<span>
							{value.length === 0 
								? initialValue.length === 0 
									? "Select Option" 
									: initialValue 
								: value
							}
						</span> 
						<span>
							{isOpen ? <CaretUpSvg /> : <CaretDownSvg />}
						</span>
					</HeaderTitle>
				</Header>

				{
					isOpen && 
					<List>
						{list.map((item, index) => 
							<ListItem 
								key={index} 
								onClick={this.selectItem.bind(this, index)}
								data-component-type="DropdownOption"
							>
								{item}
							</ListItem>)
						}
					</List>
				}
			</Wrapper>
		);
	}
}

function CaretUpSvg() {
	return (
		<svg 
			width="16" 
			height="16" 
			viewBox="0 0 1792 1792" xmlns="http://www.w3.org/2000/svg"
		>
			<path 
				d="
					M1408 1216q0 26-19 45t-45 19h-896q-26 
					0-45-19t-19-45 19-45l448-448q19-19 45-19t45 
					19l448 448q19 19 19 45z"
				fill={darkGray}
			/>
		</svg>
	);
}

function CaretDownSvg() {
	return (
		<svg 
			width="16" 
			height="16" 
			viewBox="0 0 1792 1792" 
			xmlns="http://www.w3.org/2000/svg"
		>
			<path 
				d="
					M1408 704q0 26-19 45l-448 448q-19 
					19-45 19t-45-19l-448-448q-19-19-19-45t19-45 
					45-19h896q26 0 45 19t19 45z"
				fill={darkGray}
			/>
		</svg>
	);
}

export default Dropdown;
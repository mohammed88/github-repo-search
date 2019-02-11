import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Link from '../../ui/Link/';
import {darkGray} from '../../ui/styles/colors';
import {Text14} from '../../ui/styles/typography';

const Wrapper = styled.div`
	align-items: center;
	display: flex;
	justify-content: space-between;
	width: 300px;
	${Text14};
`;

export const PaginatorLink = styled(Link)`
	color: ${props => props.disabled ? darkGray : "default"};
	flex: 0 1 0;
	pointer-events: ${props => props.disabled ? "none" : "auto"};
	${Text14};
`;

class Paginator extends React.Component {
	state = {
		currentPage: 1,
		prevPropsCurrentPage: null,
	};

	static getDerivedStateFromProps(props, state) {
		if(
			state.prevPropsCurrentPage !== props.currentPage && 
			props.currentPage <= props.totalCount
		) {
			return {
				currentPage: props.currentPage,
				prevPropsCurrentPage: props.currentPage,
			};
		}

		return state;
	}

	render() {
		const {currentPage} = this.state;
		const {totalCount, className} = this.props;

		return (
			<Wrapper className={className}>
				<PaginatorLink 
					onClick={this.handleFirst} 
					disabled={currentPage === 1}
				>
					First
				</PaginatorLink>
				<PaginatorLink
					onClick={this.handlePrev} 
					disabled={currentPage === 1}
				>
					Previous
				</PaginatorLink>

				<div>{currentPage} of {totalCount}</div>

				<PaginatorLink 
					onClick={this.handleNext}
					disabled={currentPage === totalCount}
				>
					Next
				</PaginatorLink>
				<PaginatorLink 
					onClick={this.handleLast}
					disabled={currentPage === totalCount}
				>
					Last
				</PaginatorLink>
			</Wrapper>
		);
	}

	handleNext = (e) => {
		const currentPage = Math.min(this.state.currentPage + 1, this.props.totalCount);
		this.setState({currentPage}, this.props.onChange.bind(null, currentPage));
	};

	handlePrev = () => {
		const currentPage = Math.max(this.state.currentPage - 1, 1);
		this.setState({currentPage}, this.props.onChange.bind(null, currentPage));
	};

	handleFirst = () => this.setState(
		{currentPage: 1}, 
		this.props.onChange.bind(null, 1)
	);

	handleLast = () => this.setState({
		currentPage: this.props.totalCount}, 
		this.props.onChange.bind(null, this.props.totalCount)
	);
}

Paginator.propTypes = {
	totalCount: PropTypes.number.isRequired,
};

Paginator.defaultProps = {
	currentPage: 1,
	onChange: () => {},
};

export default Paginator;
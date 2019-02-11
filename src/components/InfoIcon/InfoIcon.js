import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Spacing from '../../ui/styles/spacing';
import {darkGray} from '../../ui/styles/colors';


const Wrapper = styled.div`
	align-items: center;
	display: flex;
	margin-right: ${Spacing.large};
`;

const IconText = styled.span`
	margin-left: 4px;
	color: ${darkGray};
`;

function InfoIcon({icon, text}) {
	return (
		<Wrapper>
			{icon}
			<IconText>{text}</IconText>
		</Wrapper>
	);
}

InfoIcon.propTypes = {
	icon: PropTypes.object.isRequired,
	text: PropTypes.any.isRequired,
};

export default InfoIcon;
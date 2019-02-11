import React from 'react';
import styled from 'styled-components';

import {lightGray} from '../../ui/styles/colors';
import Spacing from '../../ui/styles/spacing';
import {H2} from '../../ui/styles/typography';
import {
	Content,
	Title, 
	Description, 
	Wrapper,
} from '../Item/';


const DescriptionPlaceholder = styled(H2)`
	background: ${lightGray};
	width: 220px;
	height: ${Spacing.large};
`;

const TitlePlaceholder = styled.div`
	background: ${lightGray};
	width: 220px;
	height: 14px;
`;

const MetaDataPlaceholder = styled.div`
	background: ${lightGray};
	width: 80px;
	height: 14px;
`;

function ItemLoading({className}) {
	return (
		<Wrapper className={className}>
			<Content>
				<TitlePlaceholder>
					<Title />
				</TitlePlaceholder>
				<Description>
					<DescriptionPlaceholder />
				</Description>
				<MetaDataPlaceholder />
			</Content>
		</Wrapper>
	);
}

export default ItemLoading;
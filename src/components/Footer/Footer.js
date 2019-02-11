import React from 'react';
import styled from 'styled-components';

import {Text12} from '../../ui/styles/typography';
 
const Wrapper = styled.div`
	align-items: center;
	display: flex;
	height: 80px;
	justify-content: space-around;
	${Text12};
`;

function Footer() {
	return (
		<Wrapper>© Github 2019, Inc.</Wrapper>
	);
}

export default Footer;
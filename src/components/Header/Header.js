import React from 'react';
import styled from 'styled-components';

import Spacing from '../../ui/styles/spacing';
import GitHubCat from '../../ui/icons/github-cat';
import GitHubText from '../../ui/icons/github-text';

const Wrapper = styled.div`
	background-color: #222222;
`;

const Content = styled.div`
	display: flex;
	height: 60px;
	padding: 0 ${Spacing.large};
	align-items: center;
	margin: 0 auto;
	max-width: 1260px;
	box-sizing: border-box;

	@media (max-width: 1260px) {
		width: 100%;
	}
`;

const GitHubLogo = styled(GitHubText)`
	margin: 0 ${Spacing.medium};
	fill: white;
`;

function Header() {
	return (
		<Wrapper>
			<Content>
				<GitHubCat width={28} />
				<GitHubLogo width={70} /> 
			</Content>
		</Wrapper>
	);
}

export default Header;
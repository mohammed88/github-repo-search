import React, {Fragment} from 'react';
import styled from 'styled-components';

import Header from '../../components/Header/';
import Footer from '../../components/Footer/';
import {H1, Text18} from '../../ui/styles/typography';
import Link from '../../ui/Link';
import Spacing from '../../ui/styles/spacing';
import GitHubText from '../../ui/icons/github-text';
import {darkOrange} from '../../ui/styles/colors';

const Body = styled.div`
	box-sizing: border-box;
	height: 800px;
	padding: 200px;
	line-height: 1.8;
`;

const Message = styled.div`
	text-align: center;
	width: 400px;
	margin: auto;
	${Text18};
`;

const HomeLink = styled(Link)`
	${Text18};
`;

const NotFoundHeader = styled(H1)`
	margin: ${Spacing.large} 0;
`

const GitHubLogo = styled(GitHubText)`
	fill: ${darkOrange};
`;

function NotFoundView() {
	return (
		<Fragment>
			<Header />
			<Body data-component-type="PageNotFoundMessage">
				<Message>
					<GitHubLogo width={200} height={75}/>
					<NotFoundHeader>404 - Not Found</NotFoundHeader>
					Sorry, the page you are looking for does not exist.
					You can always go back to the <HomeLink href="/">homepage.</HomeLink>
				</Message>
			</Body>
			<Footer />
		</Fragment>
	);
}

export default NotFoundView;
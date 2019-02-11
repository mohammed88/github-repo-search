import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import {Link} from 'react-router-dom';

import {lightGray, darkGray} from '../../ui/styles/colors';
import Spacing from '../../ui/styles/spacing';
import {Text12, Text14} from '../../ui/styles/typography';
import {LinkStyles} from '../../ui/Link/';
import Star from '../../ui/icons/star';
import RepoFork from '../../ui/icons/repo-fork';
import Repo from '../../ui/icons/repo';
import InfoIcon from '../../components/InfoIcon/';

export const Wrapper = styled.div`
	display: flex;
	border: 1px solid ${lightGray};
`;

export const Content = styled.div`
	margin: ${Spacing.small};
`;

export const Metadata = styled.div`
	display: flex;
	margin: ${Spacing.small} 0;
	${Text12}
`;

const StyledLink = styled(Link)`
	font-weight: bold;
	${LinkStyles};
	${Text14};
`

export const Description = styled.p`
	color: ${darkGray};
	line-height: 1.4;
	margin: ${Spacing.medium} 0;
`;

export const Title = styled.div`
	display: flex;
	align-items: flex-start;
	margin: ${Spacing.small} 0;
`;

const RepoIcon = styled(Repo)`
	margin-right: ${Spacing.small};
`;

function Item({className, repo, detailsUrl}) {
	return (
		<Wrapper className={className} data-component-type="Item">
			<Content>
				<Title>
					<RepoIcon /> 
					<StyledLink 
						to={detailsUrl}
						data-component-type="RouterLink"
					>
						{repo.owner.login} / {repo.name}
					</StyledLink>
				</Title>
				<Description>{repo.description}</Description>
				<Metadata>
					<InfoIcon icon={<Star/>} text={repo.stargazers_count} />
					<InfoIcon icon={<RepoFork/>} text={repo.forks_count} />
				</Metadata>
			</Content>
		</Wrapper>
	);
}

Item.propTypes = {
	repo: PropTypes.object.isRequired,
	detailsUrl: PropTypes.string.isRequired,
};

export default Item;
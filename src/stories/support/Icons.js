import React from 'react';
import styled from 'styled-components';

import {
	GitBranch,
	GitHubCat,
	GitHubText,
	Repo,
	RepoFork,
	Star
} from '../../ui/icons/';


export default function Icons({colors}) {
	const Wrapper = styled.div`
		display: flex;
		justify-content: space-around;
		align-items: center;
		flex-wrap: wrap;
	`;

	const IconInfoWrapper = styled.div`
		margin: 1rem 0;
		text-align: center;
	`;

	const Label = styled.div`
		font-style: italic;
		font-size: 0.8rem;
	`;

	const IconInfo = ({children, name}) => {
		return (
			<IconInfoWrapper>
				{children}
				<Label>{name}</Label>
			</IconInfoWrapper>
		);
	}

	const GitHubCatRed = styled(GitHubCat)`fill: red`;
	
	return (
		<Wrapper>
			<IconInfo name={GitBranch.name}>
				<GitBranch />
			</IconInfo>
			<IconInfo name={GitHubCat.name}>
				<GitHubCatRed />
			</IconInfo>
			<IconInfo name={GitHubText.name}>
				<GitHubText />
			</IconInfo>
			<IconInfo name={Repo.name}>
				<Repo />
			</IconInfo>
			<IconInfo name={RepoFork.name}>
				<RepoFork />
			</IconInfo>
			<IconInfo name={Star.name}>
				<Star />
			</IconInfo>
		</Wrapper>
	);
}


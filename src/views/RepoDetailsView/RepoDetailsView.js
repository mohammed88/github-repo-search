import React from 'react';
import styled from 'styled-components';

import Header from '../../components/Header/';
import Footer from '../../components/Footer/';
import Spacing from '../../ui/styles/spacing';
import {H2, Text12, Text14} from '../../ui/styles/typography';
import NotFoundView from '../../views/NotFoundView';
import BASE_URL from '../constants';
import GitBranch from '../../ui/icons/git-branch';
import Repo from '../../ui/icons/repo';
import InfoIcon from '../../components/InfoIcon/';
import Link from '../../ui/Link/';

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
	height: 100vh;
`;

const Body = styled.div`
	flex: 1 1 0;
	padding: ${Spacing.large};
	overflow: scroll;
	margin: 0 auto;
	box-sizing: border-box;
	width: 800px;

	@media (max-width: 800px) {
		width: 100%;
	}
`;

const BranchesList = styled.ul`
	display: flex;
	flex-direction: column;
	flex-wrap: wrap;
	list-style-type: none;
	line-height: 1.5;
	padding: 0;
	height: 90%;

	@media (max-width: 760px) {
		flex-wrap: nowrap;
	}
`;

const Title = styled.div`
	display: flex;
	align-items: center;
`;

const SubTitle = styled.div`
	${Text14};
	margin: 0 ${Spacing.medium};
	font-style: italic;

`;

const RepoIcon = styled(Repo)`
	margin-right: ${Spacing.small};
`;

const BranchLink = styled(Link)`
	${Text12};
	font-weight: bold;
`;

class RepoDetailsView extends React.Component {
	state = {
		branches: [],
		repoNotFound: false,
	};

	async fetchData(url) {
		const response = await fetch(url);
		return await response.json();
	}

	async fetchRepoData() {
		try {
			const {owner, repo} = this.props.match.params;
			const url = `${BASE_URL}/repos/${owner}/${repo}/branches`;

			const branches = await this.fetchData(url);

			if (branches.message) {
				throw(branches.message);
			}

			this.setState({branches, repoNotFound: false});
		} catch(e) {
			this.setState({repoNotFound: true});
		}
	}

	componentDidMount() {
		this.fetchRepoData();
	}

	render() {
		const {branches, repoNotFound} = this.state;
		const {owner, repo} = this.props.match.params;

		if (repoNotFound) {
		
			return <NotFoundView />;
		}

		return(
			<Wrapper>
				<Header />
				<Body>
					<Title>
						<RepoIcon />
						<H2>{owner} / {repo} </H2>
						<SubTitle>({branches.length} branches)</SubTitle>
					</Title>
					<BranchesList>
						{branches.length === 0 && <div>Loading...</div>}
						{branches.map(({name, commit}, index) => 
							<li key={index} data-component-type="BranchListItem">
								<InfoIcon
									icon={<GitBranch />} 
									text={
										<BranchInfo 
											owner={owner} 
											repo={repo} 
											commit={commit} 
											name={name} 
										/>
									}
								/>
							</li>
						)}
					</BranchesList>
				</Body>
				<Footer />
			</Wrapper>
		);
	}
}

function BranchInfo({owner, repo, commit, name}) {
	return (
		<BranchLink
			href={`http://github.com/${owner}/${repo}/commit/${commit.sha}`}
			target="_blank">
			{name}
		</BranchLink>
	);
}

export default RepoDetailsView;
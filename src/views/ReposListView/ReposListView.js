import React from 'react';
import styled from 'styled-components';
import LinkHeaderParser from 'parse-link-header';

import {lightGray} from '../../ui/styles/colors';
import Spacing from '../../ui/styles/spacing';
import Header from '../../components/Header/';
import Footer from '../../components/Footer/';
import Paginator from '../../components/Paginator/';
import {Text14} from '../../ui/styles/typography';
import LabelledDropdown from '../../components/LabelledDropdown/';
import ReposList from './ReposList/';
import BASE_URL from '../constants';

const SEARCH_URL = `${BASE_URL}/search/repositories`;

const getSearchUrl = ({org, sortBy, language}) => {
	const languageQuery = language !== PROGRAMMING_LANGS[0] ? `+language:${language}` : '';
	return `${SEARCH_URL}?q=org:${org}${languageQuery}&sort=${sortBy.toLowerCase()}`;
}

const Wrapper = styled.div`
	display: flex;
	flex-direction: column;
`;

const Body = styled.div`
	flex: 1 1 800px;
	margin: ${Spacing.medium} auto;
	padding: 0 ${Spacing.large};
	width: 760px;
	box-sizing: border-box;

	@media (max-width: 760px) {
		width: 100%;
	}

	min-width: 320px;
`;

const SortByFilter = styled(LabelledDropdown)`
	width: 130px;
	${Text14};
`;

const ProgrammingLanguageFilter = styled(LabelledDropdown)`
	width: 130px;
	margin-right: ${Spacing.large};
	${Text14};
`;

const ReposListPaginator = styled(Paginator)`
	margin: ${Spacing.large} auto 0;
`;

const InputControls = styled.div`
	display: flex;
	flex-wrap: wrap;
	justify-content: space-between;
	align-items: flex-end;
	margin-bottom: ${Spacing.medium};
`;

const TextInput = styled.input`
	width: 260px;
	height: 36px;
	font-size: 0.9rem;
	padding: 0;
	border: none;

	:focus {
		outline: none;
	}
`;

const TextInputWrapper = styled.div`
	border: 2px solid ${lightGray};
	border-radius: 2px;
	margin-right: 5rem;
	padding: 0 ${Spacing.small};
	margin-bottom: ${Spacing.small};
`;

const FiltersWrapper = styled.div`
	display: flex;
	align-items: flex-end;	
	margin-bottom: ${Spacing.small};
`;

const Error = styled.div`
	${Text14};
	font-style: italic;
	${lightGray};
`;

export const PROGRAMMING_LANGS = [
	"All",
	"C",
	"C#",
	"Java",
	"JavaScript",
	"Python",
	"C++",
	"Objective-C",
	"Shell",
	"Go",
];

export const SORT_OPTIONS = ["Stars", "Forks"];

class ReposListView extends React.Component {
	initialState = {
		totalPages: 1,
		currentPage: 1,
		sortBy: SORT_OPTIONS[0],
		repos: null,
		organization: '',
		linkHeader: {},
		isLoading: false,
		language: PROGRAMMING_LANGS[0],
		errors: null,
	};

	state = this.initialState;

	async fetchData(url) {
		const response = await fetch(url);
		const data = await response.json();
		const headers = response.headers;

		return {data, headers};
	}

	async fetchRepos({
		organization=this.state.organization, 
		page=this.state.currentPage,
		language=this.state.language,
		sortBy=this.state.sortBy,
	}) {

		if (organization.trim().length === 0) {
			return;
		}

		this.setState({isLoading: true, repos: []});

		try {
			const url = this.getRequestUrl({organization, page, language, sortBy});
			const {data, headers} = await this.fetchData(url);
			const errors = data.errors ? data.errors : null;
			
			const linkHeader = LinkHeaderParser(headers.get('Link')) || {};
			const totalPages = linkHeader.last ? parseInt(linkHeader.last.page) : page;

			this.setState({
				repos: data.items,
				linkHeader: linkHeader,
				totalPages: totalPages,
				currentPage: page,
				isLoading: false,
				language,
				sortBy,
				errors,
			});
		} catch(e) {
			this.setState(this.initialState);
		}
	}

	componentDidMount() {
		const savedState = JSON.parse(window.localStorage.getItem('repos'));

		if (savedState) {
			this.setState(savedState);
		}
	}

	componentWillUnmount() {
		window.localStorage.setItem('repos', JSON.stringify(this.state));
	}

	render() {
		const {
			repos,
			organization,
			totalPages,
			currentPage,
			isLoading,
			language,
			sortBy,
			errors,
		} = this.state;

		return (
			<Wrapper>
				<Header />
				<Body>
					<InputControls>
						<TextInputWrapper>
							<TextInput 
								autoFocus
								type="text"
								value={organization}
								onChange={this.handleOrganizationChange} 
								onKeyUp={this.handleInputKeyUp}
								placeholder="Search Github Repos by Organization"
							/>
						</TextInputWrapper>
						<FiltersWrapper>
							<ProgrammingLanguageFilter
								label="Programming language"
								initialValue={language} 
								options={PROGRAMMING_LANGS} 
								onChange={this.handleLanguageChange} 
							/>

							<SortByFilter
								label="Sort by"
								initialValue={sortBy}
								options={SORT_OPTIONS} 
								onChange={this.handleSortByChange}
							/>
						</FiltersWrapper>
					</InputControls>
					
					{!errors && repos && <ReposList 
						repos={repos} 
						isLoading={isLoading}
					/>}

					{errors && <Error>{errors[0].message}</Error>}
					
					{totalPages > 1 && <ReposListPaginator 
						totalCount={totalPages}
						currentPage={currentPage}
						onChange={this.handlePageChange}
					/>}
				</Body>
				<Footer />
			</Wrapper>
		);
	}

	handleLanguageChange = value => {
		if (value === this.state.language) {
			return;
		}

		this.fetchRepos({language: value, page: 1});
	};

	handleSortByChange = value => {
		if (value === this.state.sortBy) {
			return;
		}
 		
 		this.fetchRepos({sortBy: value});
	};

	handleInputKeyUp = event => {
		const organization = event.target.value.trim();

		if (event.keyCode === 13 && organization.length > 0) {
			this.fetchRepos({organization: event.target.value});
		}
	};

	handleOrganizationChange = event => this.setState({organization: event.target.value});

	handlePageChange = page => {
		if (this.state.currentPage === page) {
			return;
		}

		this.fetchRepos({page});
	};

	getRequestUrl({organization, page, language, sortBy}) {
		const {currentPage, linkHeader, totalPages} = this.state;
		const defaultUrl = getSearchUrl({org: organization, sortBy: sortBy, language});

		let url = defaultUrl;

		if (page === totalPages && linkHeader.last) {
			url = linkHeader.last.url;
		} else if (page === currentPage + 1 && linkHeader.next ) {
			url = linkHeader.next.url;
		} else if (page === currentPage - 1 && linkHeader.prev) {
			url = linkHeader.prev.url;
		} else if (page === 1 && linkHeader.first && linkHeader.first) {
			url = linkHeader.first.url;
		}

		return url;
	}
}

export default ReposListView;
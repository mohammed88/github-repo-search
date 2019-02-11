import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Spacing from '../../../ui/styles/spacing';
import Item from '../../../components/Item/';
import ItemLoading from '../../../components/ItemLoading/';

const RepoItem = styled(Item)`
	margin-bottom: ${Spacing.medium};
`;
export const RepoItemLoading = styled(ItemLoading)`
	margin-bottom: ${Spacing.medium};
`;

function ReposList({repos, isLoading, owner, repo}) {
	return (
		<React.Fragment>
			{repos.map(repo =>
				<RepoItem
					key={repo.id}
					repo={repo}
					detailsUrl={`/repo/${repo.full_name}`}
				/>
			)}
			{isLoading &&
				Array(10).fill(null).map((v, i) => <RepoItemLoading key={i} />)
			}
			{repos.length === 0 && !isLoading &&
				<div>No results found.</div>
			}
		</React.Fragment>
	);
}

ReposList.propTypes = {
	repos: PropTypes.array.isRequired, //TODO: type check each item
	isLoading: PropTypes.bool,
};

ReposList.defaultProps = {
	isLoading: false,
}

export default ReposList;
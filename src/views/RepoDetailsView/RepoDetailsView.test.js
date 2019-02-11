import React from 'react';
import {shallow, mount} from 'enzyme';
import { StaticRouter } from 'react-router-dom';

import RepoDetailsView from './RepoDetailsView';
import NotFoundView from '../../views/NotFoundView';

describe('RepoDetailsView', () => {
	const match = {params: {owner: '', repo: ''}};

	it('should render', () => {
		const wrapper = shallow(
			<RepoDetailsView match={match} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should render details when data is fetched successfully', (done) => {
		const mockData = [{}, {}];
		RepoDetailsView.prototype.fetchData = jest.fn().mockReturnValue(Promise.resolve(mockData));

		const wrapper = shallow(<RepoDetailsView match={match} />);

		process.nextTick(() => {
			expect(wrapper.state().branches.length).toEqual(mockData.length);
			expect(wrapper.find(NotFoundView).length).toBe(0);
			done();
		});
	});

	it('should render Not Found message when data fetching fails', (done) => {
		RepoDetailsView.prototype.fetchData = jest.fn().mockReturnValue(Promise.reject());
		
		const wrapper = shallow(<RepoDetailsView match={match} />);

		process.nextTick(() => {
			expect(wrapper.find(NotFoundView).length).toBe(1);
			done();
		});
	});
});
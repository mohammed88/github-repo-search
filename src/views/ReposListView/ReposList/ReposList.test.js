import React from 'react';
import {shallow} from 'enzyme';

import ReposList, {RepoItemLoading} from './ReposList';

describe('ReposList', () => {
	it('should render', () => {
		const wrapper = shallow(<ReposList repos={[]} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should render repos placeholder when loading', () => {
		const wrapper = shallow(<ReposList repos={[]} isLoading={true} />);

		expect(wrapper.find(RepoItemLoading).length).toBe(10);
	});
});
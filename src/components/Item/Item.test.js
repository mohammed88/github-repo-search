import React from 'react';
import {shallow} from 'enzyme';

import Item from './Item';

describe('Item', () => {
	it('should render', () => {
		const repo = {owner:{}, stargazers_count: 42, forks_count: 42};
		const wrapper = shallow(<Item repo={repo} detailsUrl="/" />);

		expect(wrapper).toMatchSnapshot();
	});
});
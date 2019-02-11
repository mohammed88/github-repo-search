import React from 'react';
import {shallow} from 'enzyme';

import ItemLoading from './ItemLoading';

describe('ItemLoading', () => {
	it('should render', () => {
		const wrapper = shallow(<ItemLoading name="" imageUrl="" detailsUrl="" metadata="" />);

		expect(wrapper).toMatchSnapshot();
	});
});
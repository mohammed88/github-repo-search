import React from 'react';
import {shallow} from 'enzyme';

import NotFoundView from './NotFoundView';

describe('NotFoundView', () => {
	it('should render', () => {
		const wrapper = shallow(<NotFoundView />);

		expect(wrapper).toMatchSnapshot() ;
	});
});
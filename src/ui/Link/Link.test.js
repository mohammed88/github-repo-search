import React from 'react';
import {shallow} from 'enzyme';

import Link from './Link';

describe('Link', () => {
	it('should render', () => {
		const wrapper = shallow(<Link>Click me!</Link>);

		expect(wrapper).toMatchSnapshot();
	});
});
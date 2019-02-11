import React from 'react';
import {shallow} from 'enzyme';

import InfoIcon from './InfoIcon';

describe('InfoIcon', () => {
	it('should render', () => {
		const wrapper = shallow(<InfoIcon icon={{}} text='' />);

		expect(wrapper).toMatchSnapshot();
	});
});
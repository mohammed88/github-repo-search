import React from 'react';
import {shallow} from 'enzyme';

import LabelledDropdown from './LabelledDropdown';

describe('LabelledDropdown', () => {
	it('should render', () => {
		const wrapper = shallow(<LabelledDropdown label="Label" options={[]}/>);

		expect(wrapper).toMatchSnapshot();
	});
});
import React from 'react';
import {shallow, mount} from 'enzyme';

import Dropdown from './Dropdown';

describe('Dropdown', () => {
	it('should render', () => {
		const wrapper = shallow(<Dropdown list={[]} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should open options list onClick ', () => {
		const wrapper = mount(<Dropdown list={['option1', 'option2']} />);

		expect(wrapper.state().isOpen).toEqual(false);
		
		wrapper.find('span').first().simulate('click');

		expect(wrapper.state().isOpen).toEqual(true);
	});

	it('should display selected option', () => {
		const options = ['option1', 'option2'];
		const wrapper = mount(<Dropdown list={options} />);

		// open dropdown
		wrapper.find('span').first().simulate('click');
		// select first option
		wrapper.find('li').first().simulate('click');

		expect(wrapper.state().isOpen).toEqual(false);
		expect(wrapper.state().value).toEqual('option1');
	});
});
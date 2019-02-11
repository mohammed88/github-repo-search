import React from 'react';
import {shallow} from 'enzyme';

import Paginator, {PaginatorLink} from './Paginator';

describe('Paginator', () => {
	it('should render', () => {
		const wrapper = shallow(<Paginator totalCount={10} />);

		expect(wrapper).toMatchSnapshot();
	});

	it('should show current page passed as prop', () => {
		const currPage = 5;
		const wrapper = shallow(<Paginator totalCount={10} currentPage={currPage} />)

		expect(wrapper.state().currentPage).toEqual(currPage);
	});

	it('should show current page as 1 if currentPage > totalCount', () => {
		const currPage = 30;
		const wrapper = shallow(<Paginator totalCount={10} currentPage={currPage} />)

		expect(wrapper.state().currentPage).toEqual(1);
	});

	it('should increment page count', () => {
		const wrapper = shallow(<Paginator totalCount={10} />);

		wrapper.find(PaginatorLink).at(2).simulate('click');

		expect(wrapper.state().currentPage).toEqual(2);
	});

	it('should decrement page count', () => {
		const currPage = 5;
		const wrapper = shallow(<Paginator totalCount={10} currentPage={currPage} />);

		wrapper.find(PaginatorLink).at(1).simulate('click');

		expect(wrapper.state().currentPage).toEqual(currPage - 1);
	});

	it('should set page count to 1', () => {
		const currPage = 5;
		const wrapper = shallow(<Paginator totalCount={10} currentPage={currPage} />);

		wrapper.find(PaginatorLink).at(0).simulate('click');

		expect(wrapper.state().currentPage).toEqual(1);
	});

	it('should set page count to totalCount', () => {
		const currPage = 5;
		const totalCount = 10;
		const wrapper = shallow(<Paginator totalCount={totalCount} currentPage={currPage} />);

		wrapper.find(PaginatorLink).at(3).simulate('click');

		expect(wrapper.state().currentPage).toEqual(totalCount);
	});

	it('should trigger onChange handler', () => {
		const currPage = 5;
		const totalCount = 10;
		const mockCallback = jest.fn();
		const wrapper = shallow(<Paginator totalCount={totalCount} onChange={mockCallback} />);

		wrapper.find(PaginatorLink).at(3).simulate('click');
		
		expect(mockCallback.mock.calls.length).toBe(1);
	});
});
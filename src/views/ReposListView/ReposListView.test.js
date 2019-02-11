import React from 'react';
import {shallow, mount} from 'enzyme';

import ReposListView, {PROGRAMMING_LANGS, SORT_OPTIONS} from './ReposListView';


describe('ReposListView', () => {
	it('should render', () => {
		const wrapper = shallow(<ReposListView />);

		expect(wrapper).toMatchSnapshot();
	});
});


describe('ReposListView handlers', () => {
	let fetchData;
	
	beforeAll(() => {
		fetchData = 
			ReposListView.prototype.fetchData = 
			jest.fn().mockReturnValue(Promise.resolve());
	});

	it('should fetch repos when language filter is changed', () => {
		const wrapper = shallow(<ReposListView />);
		wrapper.setState({organization: 'org'});
		const language = PROGRAMMING_LANGS[1];
		
		wrapper.instance().handleLanguageChange(language);

		expect(
			fetchData.mock.calls[fetchData.mock.calls.length - 1][0]
			.includes(`language:${language}`)
		).toBe(true);
	});

	it('should fetch repos when sorting filter is changed', () => {
		const wrapper = shallow(<ReposListView />);
		wrapper.setState({organization: 'org'});
		const sortBy = SORT_OPTIONS[1].toLowerCase();
		
		wrapper.instance().handleSortByChange(sortBy);

		expect(
			fetchData.mock.calls[fetchData.mock.calls.length - 1][0]
			.includes(`sort=${sortBy}`)
		).toBe(true);
	});


	it('should fetch repos when organization is entered', () => {
		const wrapper = shallow(<ReposListView />);
		const organization = 'org';
		
		wrapper.instance().handleInputKeyUp({target: {value: organization}, keyCode: 13});

		expect(
			fetchData.mock.calls[fetchData.mock.calls.length - 1][0]
			.includes(`org:${organization}`)
		).toBe(true);
	});

	it('should fetch repos when page is changed', () => {
		const page = 2;
		const wrapper = shallow(<ReposListView />);
		wrapper.setState({organization: 'org', currentPage: 1, linkHeader: {next: {url: `...&page=${page}`}}});
		
		wrapper.instance().handlePageChange(page);

		expect(
			fetchData.mock.calls[fetchData.mock.calls.length - 1][0]
			.includes(`page=${page}`)
		).toBe(true);
	});

	it('should not fetch repos when same filters are selected', () => {
		const wrapper = shallow(<ReposListView />);
		const {organization, language, sortBy} = wrapper.instance().initialState;
		
		const calls = fetchData.mock.calls.length;

		wrapper.instance().handleLanguageChange(language);
		expect(fetchData.mock.calls.length).toBe(calls);

		wrapper.instance().handleSortByChange(sortBy);
		expect(fetchData.mock.calls.length).toBe(calls);

		wrapper.instance().handleInputKeyUp({target: {value: organization}, keyCode: 13});
		expect(fetchData.mock.calls.length).toBe(calls);
	});
});


describe('ReposListView state', () => {
	it('should be updated with repos data', (done) => {
		const mockData = {items: [{}, {}, {}]};
		const promise = Promise.resolve({data: mockData, headers: {get: () => {}}});
		ReposListView.prototype.fetchData = jest.fn().mockReturnValue(promise);

		const wrapper = shallow(<ReposListView />);
		wrapper.instance().handleInputKeyUp({target: {value: 'org'}, keyCode: 13});

		process.nextTick(() => {
			expect(wrapper.state().repos.length).toEqual(mockData.items.length);
			done();
		});
	});


	it('should be set to initial state value when network call fails', (done) => {
		const fetchData = ReposListView.prototype.fetchData = jest.fn().mockReturnValue(Promise.reject());
		const wrapper = shallow(<ReposListView />);

		process.nextTick(() => {
			expect(wrapper.state()).toEqual(wrapper.instance().initialState);
			done();
		});
	});

	it('should be retrieved from LocalStorage on initial mount', () => {
		const getItemMock = jest.fn().mockReturnValue(JSON.stringify({repos: []}));

		const localStorageMock = {
			getItem: getItemMock,
  		};
  		
		Object.defineProperty(window, 'localStorage', { value: localStorageMock });

		const wrapper = shallow(<ReposListView />);
		expect(getItemMock).toHaveBeenCalledTimes(1);
	});
});
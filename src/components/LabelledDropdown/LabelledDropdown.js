import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Dropdown from '../../ui/Dropdown/';
import {Text12} from '../../ui/styles/typography';
import Spacing from '../../ui/styles/spacing';

const Label = styled.div`
	margin-bottom: ${Spacing.small};
	${Text12};
`;

function LabelledDropdown({className, label, initialValue, options, onChange}) {
	return (
		<div className={className}>
			<Label>{label}</Label>
			<Dropdown list={options} onChange={onChange} initialValue={initialValue} />
		</div>
	);
}

LabelledDropdown.propTypes = {
	label: PropTypes.string.isRequired,
	options: PropTypes.array.isRequired,
	onChange: PropTypes.func,
}

LabelledDropdown.defaultProps = {
	onChange: () => {},
	initialValue: '',
}

export default LabelledDropdown;
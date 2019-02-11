import React from 'react';

import styled from 'styled-components';

export default function ColorPalette({colors}) {
	const Wrapper = styled.div`
		display: flex;
		flex-wrap: wrap;
	`;
	
	return (
		<Wrapper>
			{Object.keys(colors).map(key => <ColorCircle name={key} value={colors[key]} />)}
		</Wrapper>
	);
}

function ColorCircle({name, value}) {
	const Wrapper = styled.div`
		margin: 1rem;
		text-align: center;
	`;

	const Circle = styled.div`
		width: 100px;
		height: 100px;
		border-radius: 50%;
		background: ${props => props.color};
		margin: 1rem;
	`;

	return (
		<Wrapper>
			<Circle color={value}/>
			<label><b>{name}</b><br/>{value}</label>
		</Wrapper>
	);
}


import styled, {css} from 'styled-components';

const FONT_FAMILY = "'Roboto', sans-serif";

const H1 = styled.h1`
	font-family: ${FONT_FAMILY};
	font-size: 32px;
	font-weight: bold;
	margin: 0;
`;

const H2 = styled.h2`
	font-family: ${FONT_FAMILY};
	font-size: 18px;
	font-weight: bold;
	margin: 0;
`;

const Text18 = css`
	font-family: ${FONT_FAMILY};
	font-size: 18px;
`;

const Text14 = css`
	font-family: ${FONT_FAMILY};
	font-size: 14px;
`;

const Text12 = css`
	font-family: ${FONT_FAMILY};
	font-size: 12px;
`;

export {H1, H2, Text18, Text14, Text12};
import styled, {css} from 'styled-components';
import {orange} from '../styles/colors'; 


export const LinkStyles = css`
  color: ${orange};
  font-size: 1rem;
  text-decoration: none;

  :hover {
  	text-decoration: underline;
    cursor: pointer;
  }
`;

const Link = styled.a`
	${LinkStyles}
`;

export default Link;
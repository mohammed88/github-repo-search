import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Colors from '../ui/styles/colors';
import ColorPalette from './support/ColorPalette';
import Link from '../ui/Link/';
import Dropdown from '../ui/Dropdown/';
import {Text18px, Text14px, Text12px} from './support/TypographyHelper';
import {H1, H2} from '../ui/styles/typography';
import Icons from './support/Icons';
import Header from '../components/Header/';
import Footer from '../components/Footer/';


storiesOf('Colors', module)
	.add('default', () => 
		<ColorPalette colors={Colors} />
	);

storiesOf('Link', module)
	.add('default', () => 
		<Link onClick={action('clicked')}>
			View details
		</Link>
	);

storiesOf('Dropdown', module)
	.add('default', () => 
		<Dropdown 
			onClick={action('clicked')} 
			list={['Bangalore', 'Warsaw', 'Helsinki', 'Berlin']}
		/>
	);


storiesOf('Typography', module)
	.add('default', () => {
		return (
			<React.Fragment>
				<H1>Roboto Bold 32px (H1)</H1>
				<H2>Roboto Bold 18px (H2)</H2>
				<Text18px>Roboto Regular 18px (Text18)</Text18px>
				<Text14px>Roboto Regular 14px (Text14)</Text14px>
				<Text12px>Roboto Regular 12px (Text12)</Text12px>
			</React.Fragment>
		);
	});

storiesOf('Icons', module)
	.add('default', () => <Icons />);

storiesOf('Header', module)
	.add('default', () => <Header />);

storiesOf('Footer', module)
	.add('default', () => <Footer />);
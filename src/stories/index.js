import React from 'react';

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import Colors from '../ui/styles/colors';
import ColorPalette from './support/ColorPalette';
import Link from '../ui/Link/';

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

import React from 'react';
import './style.scss';

import SKRotatingPlane from './SKRotatingPlane';
import SKDoubleBounce from './SKDoubleBounce';
import SKWave from './SKWave';
import SKWanderingCubes from './SKWanderingCubes';
import SKSpinnerPulse from './SKSpinnerPulse';
import SKChasingDots from './SKChasingDots';
import SKThreeBounce from './SKThreeBounce';
import SKCircle from './SKCircle';
import SKCubeGrid from './SKCubeGrid';
import SKFadingCircle from './SKFadingCircle';
import SKFoldingCube from './SKFoldingCube';

/**
 * Available Types:
 * 
 * 1. sk-rotating-plane
 * 2. sk-double-bounce
 * 3. sk-wave
 * 4. sk-wandering-cubes
 * 5. sk-spinner-pulse
 * 6. sk-chasing-dots
 * 7. sk-three-bounce
 * 8. sk-circle
 * 9. sk-cube-grid
 * 10.sk-fading-circle
 * 11.sk-folding-cube
 */


const Spinner = function(props) {
	let spinner = renderSpecifiedSpinner(props.type);
	return spinner;
};

function renderSpecifiedSpinner(type) {
	switch (type) {
		case 'sk-rotating-plane':
			return <SKRotatingPlane />;
		case 'sk-double-bounce':
			return <SKDoubleBounce />;		
		case 'sk-wave':
			return <SKWave />;
		case 'sk-wandering-cubes':
			return <SKWanderingCubes />;
		case 'sk-spinner-pulse':
			return <SKSpinnerPulse />;
		case 'sk-chasing-dots':
			return <SKChasingDots />;
		case 'sk-three-bounce':
			return <SKThreeBounce />;
		case 'sk-circle':
			return <SKCircle />;
		case 'sk-cube-grid':
			return <SKCubeGrid />;
		case 'sk-fading-circle':
			return <SKFadingCircle />;
		case 'sk-folding-cube':
			return <SKFoldingCube />;
		default: 
			return <SKThreeBounce />;
	}
}

Spinner.PropTypes = {
	type: React.PropTypes.string
};

export default Spinner;
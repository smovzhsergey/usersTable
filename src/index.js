// Core
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

// Instruments
import store from 'store';

// Containers
import App from 'containers/App';

render(
	<Provider store = { store }>
		<App />
	</Provider>,
	document.getElementById('root')
);

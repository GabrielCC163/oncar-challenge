import React from 'react';
import VehicleList from './components/VehicleList';

function App() {
	return (
		<div className="container">
			<div className="header">
				<span>OnCar</span>
			</div>
			<div className="section_vehicles">
				<VehicleList />
			</div>
		</div>
	);
}

export default App;

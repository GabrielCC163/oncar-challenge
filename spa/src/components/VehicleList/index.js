import React, { useState, useEffect } from 'react';

import VehicleService from '../../services/VehicleService';

import './styles.css';

export default function Vehicle() {
	const [ vehicles, setVehicles ] = useState([]);
	const [ currentVehicle, setCurrentVehicle ] = useState(null);
	const [ currentIndex, setCurrentIndex ] = useState(-1);
	const [ searchName, setSearchName ] = useState('');

	useEffect(() => {
		retrieveVehicles();
	}, []);

	const onChangeSearchName = (e) => {
		const searchName = e.target.value;
		setSearchName(searchName);
	};

	const retrieveVehicles = () => {
		VehicleService.getAll()
			.then((res) => {
				setVehicles(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const setActiveVehicle = (vehicle, index) => {
		setCurrentVehicle(vehicle);
		setCurrentIndex(index);
	};

	const findByName = () => {
		VehicleService.findByName(searchName)
			.then((res) => {
				setVehicles(res.data);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	return (
		<div className="list row">
			<div className="col-md-8">
				<div className="input-group mb-3">
					<input
						type="text"
						className="form-control"
						placeholder="Buscar Veículo"
						value={searchName}
						onChange={onChangeSearchName}
					/>
					<span className="input-group-btn">
						<button className="btn btn-default" type="button" onClick={findByName}>
							Search
						</button>
					</span>
				</div>
			</div>
			<div className="col-md-6">
				<h4>Lista de veículos</h4>

				<ul className="list-group">
					{vehicles &&
						vehicles.map((vehicle, index) => (
							<li
								className={`list-group-item ${index === currentIndex ? 'active' : ''}`}
								onClick={() => setActiveVehicle(vehicle, index)}
								key={index}
							>
								{vehicle.veiculo}
							</li>
						))}
				</ul>
			</div>
			<div className="col-md-6">
				{currentVehicle ? (
					<div>
						<h4>Detalhes do veículo</h4>
					</div>
				) : (
					<div>
						<br />
						<p>Clique em um veículo...</p>
					</div>
				)}
			</div>
		</div>
	);
}

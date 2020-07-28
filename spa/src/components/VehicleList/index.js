import React, { useState, useEffect } from 'react';
import VehicleService from '../../services/VehicleService';
import { ModalDetail } from '../ModalDetail';

import './styles.css';

export default function Vehicle() {
	const [ vehicles, setVehicles ] = useState([]);
	const [ currentVehicle, setCurrentVehicle ] = useState(null);
	const [ currentIndex, setCurrentIndex ] = useState(-1);
	const [ searchName, setSearchName ] = useState('');
	const [ page, setPage ] = useState(1);
	const [ perPage ] = useState(6);
	const [ loading, setLoading ] = useState(false);
	const [ modalIsOpen, setIsOpen ] = useState(false);

	const openModal = () => setIsOpen(true);
	const closeModal = () => setIsOpen(false);

	useEffect(() => {
		setLoading(true);
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
				setLoading(false);
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
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	const indexOfLast = page * perPage;
	const indexOfFirst = indexOfLast - perPage;
	const currentVehicles = vehicles.slice(indexOfFirst, indexOfLast);
	const lastPage = Math.ceil(vehicles.length / perPage);

	if (loading) {
		return <h2>Loading...</h2>;
	}

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
					{currentVehicles &&
						currentVehicles.map((vehicle, index) => (
							<li
								className={`list-group-item ${index === currentIndex ? 'active' : ''}`}
								onClick={() => setActiveVehicle(vehicle, index)}
								key={index}
							>
								<span className="vehicle_brand">{vehicle.marca}</span>
								<span className="vehicle_name">{vehicle.veiculo}</span>
								<span className="vehicle_year">{vehicle.ano}</span>
							</li>
						))}
				</ul>
				<div className="pagination">
					<button disabled={page === 1} onClick={() => setPage(1)}>
						&#8810;
					</button>
					<button disabled={page === 1} onClick={() => setPage(page - 1)}>
						&#60;
					</button>
					<button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
						&#62;
					</button>
					<button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
						&#8811;
					</button>
				</div>
			</div>
			<div className="col-md-6">
				{currentVehicle ? (
					<div className="vehicle_details">
						<h4>Detalhes do veículo</h4>
						<span className="vehicle_details_name">{currentVehicle.veiculo}</span>
						<div className="vehicle_details_group">
							<div className="vehicle_details_brand">
								<label>MARCA</label>
								<span>{currentVehicle.marca}</span>
							</div>
							<div className="vehicle_details_year">
								<label>ANO</label>
								<span>{currentVehicle.ano}</span>
							</div>
						</div>
						<div className="vehicle_details_detalhes">{currentVehicle.descricao}</div>
						<div className="edition">
							<button onClick={openModal}>EDITAR</button>
						</div>

						<ModalDetail isOpen={modalIsOpen} onRequestClose={closeModal} />
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

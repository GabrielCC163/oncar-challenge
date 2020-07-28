let tabVehicles,
	tabDetail,
	defaultDetail,
	searchField,
	searchButton = null;

let allVehicles,
	newVehicles = [];

let currentVehicles = [];

let page = 1;
let perPage = 6;

window.addEventListener('load', () => {
	tabVehicles = document.querySelector('#tabVehicles');
	tabDetail = document.querySelector('#tabDetail');
	defaultDetail = document.querySelector('#defaultDetail');
	searchField = document.querySelector('#searchField');
	searchButton = document.querySelector('#searchButton');

	fetchVehicles();
	handleSearch();
});

async function fetchVehicles() {
	//let vehicles = localStorage.getItem('allVehicles');
	let vehicles = '';
	allVehicles = vehicles ? JSON.parse(vehicles) : [];

	if (allVehicles.length === 0) {
		const res = await fetch('http://localhost:3333/veiculos');
		const json = await res.json();
		allVehicles = json.map((vehicle) => {
			const { id, marca, veiculo, ano, descricao } = vehicle;

			return {
				id,
				marca,
				veiculo,
				ano,
				descricao
			};
		});

		//localStorage.setItem('allVehicles', JSON.stringify(allVehicles));
	}

	render();
}

async function handleSearch() {
	searchButton.addEventListener('click', () => doSearch(searchField.value));
	searchField.addEventListener('keyup', (event) => {
		if (event.keyCode === 13) {
			event.preventDefault();
			searchButton.click();
		}
	});
}

function doSearch(text) {
	defaultDetail.style.display = 'block';
	tabDetail.style.display = 'none';

	text = text.toLowerCase();

	newVehicles = allVehicles.filter(({ veiculo }) => {
		return veiculo.toLowerCase().includes(text);
	});

	render();
}

function render() {
	renderVehiclesList();
}

function renderVehiclesList() {
	let listVehicles = newVehicles.length > 0 ? newVehicles : allVehicles;
	const indexOfLast = page * perPage;
	const indexOfFirst = indexOfLast - perPage;
	currentVehicles = listVehicles.slice(indexOfFirst, indexOfLast);
	const lastPage = Math.ceil(listVehicles.length / perPage);

	let vehiclesHTML = `
        <h5>Lista de veículos</h5>
        <div class='vehicles'>
    `;

	currentVehicles.forEach((vehicle) => {
		const { id, marca, veiculo, ano } = vehicle;

		const vehicleHTML = `
            <div id='${id}' class='vehicle'>
                <div className="vehicle_info">
                    <span>${marca}</span>
                    <span>${veiculo}</span>
                    <span>${ano}</span>
                </div>
                <button type="button" class="btn btn-outline-secondary" aria-label="Editar">
                    <svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-pencil-square" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                    </svg>
                </button>
            </div>
        `;

		vehiclesHTML += vehicleHTML;
	});

	vehiclesHTML += '</div>';
	tabVehicles.innerHTML = vehiclesHTML;

	let vehiclesList = document.querySelectorAll('.vehicle');
	vehiclesList.forEach((el) => {
		el.addEventListener('click', () => renderVehicleDetail(el.id));
	});
}

function renderVehicleDetail(id) {
	defaultDetail.style.display = 'none';
	let selectedVehicle = allVehicles.find((item) => {
		return item.id == id;
	});

	let detailsHTML = `
        <h5>Detalhes do veículo</h5>
        <div class='details'>
            <span class='vehicle_details_name'>${selectedVehicle.veiculo}</span>
            <div class='vehicle_details_group'>
                <div class='vehicle_details_brand'>
                    <label>MARCA</label>
                    <span>${selectedVehicle.marca}</span>
                </div>
                <div class='vehicle_details_year'>
                    <label>ANO</label>
                    <span>${selectedVehicle.ano}</span>
                </div>
            </div>
            <div class='vehicle_details_detalhes'>${selectedVehicle.descricao}</div>
            <div class='edition'>
                <button class='btn btn-outline-primary' onClick={openModal}>EDITAR</button>
            </div>
        </div>
    `;

	tabDetail.innerHTML = detailsHTML;
	tabDetail.style.display = 'block';
}

function setPage(newPage) {
	page = newPage;
}

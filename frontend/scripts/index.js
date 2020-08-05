let tabVehicles,
	tabDetail,
	defaultDetail,
	searchField,
	searchButton,
	newVehicle,
	submitNew,
	pgInitial,
	pgLeft,
	pgRight,
	pgEnd,
	modalAction,
	btnClose = null;

let listVehicles = [];
let indexOfLast = 0;
let indexOfFirst = 0;
let lastPage = 0;

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
	newVehicle = document.querySelector('#newVehicle');
	submitNew = document.querySelector('#submitNew');
	pgInitial = document.querySelector('#pgInitial');
	pgLeft = document.querySelector('#pgLeft');
	pgRight = document.querySelector('#pgRight');
	pgEnd = document.querySelector('#pgEnd');
	modalAction = document.querySelector('#modalAction');
	btnClose = document.querySelector('#btnClose');

	btnClose.addEventListener('click', () => {
		modalAction.style.display = 'none';
	});

	submitNew.addEventListener('click', (event) => {
		event.preventDefault();
		handleSubmit();
	});

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
	listVehicles = newVehicles.length > 0 ? newVehicles : allVehicles;
	indexOfLast = page * perPage;
	indexOfFirst = indexOfLast - perPage;
	currentVehicles = Array.from(listVehicles.slice(indexOfFirst, indexOfLast));
	lastPage = Math.ceil(listVehicles.length / perPage);

	handlePaginate(page, lastPage);

	let vehiclesHTML = `
        <h5>Lista de veículos</h5>
        <div class='vehicles'>
    `;

	currentVehicles.forEach((vehicle) => {
		const { id, marca, veiculo, ano } = vehicle;

		const vehicleHTML = `
            <div id='${id}' class='vehicle'>
                <div class="vehicle_info">
                    <span class="vehicle_info__marca">${marca}</span>
                    <span class="vehicle_info__veiculo">${veiculo}</span>
                    <span class="vehicle_info__ano">${ano}</span>
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
		el.children[1].addEventListener('click', () => openModal(el.id));
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
            <span class='vehicle_details__name'>${selectedVehicle.veiculo}</span>
            <div class='vehicle_details_group'>
                <div class='vehicle_details__brand'>
                    <label>MARCA</label>
                    <span>${selectedVehicle.marca}</span>
                </div>
                <div class='vehicle_details__year'>
                    <label>ANO</label>
                    <span>${selectedVehicle.ano}</span>
                </div>
            </div>
            <div class='vehicle_details__description'>${selectedVehicle.descricao}</div>
		</div>
		<div class='edition'>
			<button id='edit${selectedVehicle.id}' class='btn btn-outline-primary'>EDITAR</button>
		</div>
    `;

	tabDetail.innerHTML = detailsHTML;
	tabDetail.style.display = 'flex';

	document.querySelector(`#edit${id}`).addEventListener('click', () => openModal(id));
}

function setPage(newPage) {
	page = newPage;
	render();
}

function handlePaginate(pg, ltPage) {
	pgInitial.addEventListener('click', () => {
		setPage(1);
	});

	pgLeft.addEventListener('click', () => {
		if (page === 1) {
			return;
		}
		setPage(page - 1);
	});

	pgRight.addEventListener('click', () => {
		if (page >= ltPage) {
			return;
		}
		setPage(page + 1);
	});

	pgEnd.addEventListener('click', () => {
		if (page >= ltPage) {
			return;
		}
		setPage(ltPage);
	});
}

async function openModal(search = '') {
	if (search) {
		const result = await fetch(`http://localhost:3333/veiculos/${search}`);
		const resultJson = await result.json();

		const { id, marca, descricao, veiculo, ano, vendido } = resultJson[0];

		modalAction.style.display = 'block';
		document.querySelector('#veiculo_id').value = id;
		document.querySelector('#veiculo').value = veiculo;
		document.querySelector('#marca').value = marca;
		document.querySelector('#ano').value = ano;
		document.querySelector('#descricao').value = descricao;
		document.querySelector('#vendido').checked = vendido;
	} else {
		document.querySelector('#veiculo_id').value = '';
		document.querySelector('#veiculo').value = '';
		document.querySelector('#marca').value = '';
		document.querySelector('#ano').value = '';
		document.querySelector('#descricao').value = '';
		document.querySelector('#vendido').checked = false;
	}

	modalAction.style.display = 'block';
}

window.onclick = function(event) {
	if (event.target == modalAction) {
		modalAction.style.display = 'none';
	}
};

async function handleSubmit() {
	let idVeiculo = document.querySelector('#veiculo_id').value;
	let veiculo = document.querySelector('#veiculo').value;
	let marca = document.querySelector('#marca').value;
	let ano = document.querySelector('#ano').value;
	let descricao = document.querySelector('#descricao').value;
	let vendido = document.querySelector('#vendido').checked;

	let res = null;
	if (idVeiculo) {
		res = await fetch(`http://localhost:3333/veiculos/${idVeiculo}`, {
			method: 'PUT',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			redirect: 'follow',
			body: JSON.stringify({
				veiculo,
				marca,
				ano,
				descricao,
				vendido
			})
		});
	} else {
		res = await fetch('http://localhost:3333/veiculos', {
			method: 'POST',
			headers: new Headers({
				'Content-Type': 'application/json'
			}),
			redirect: 'follow',
			body: JSON.stringify({
				veiculo,
				marca,
				ano,
				descricao,
				vendido
			})
		});
	}

	if (res.status === 200) {
		if (idVeiculo) {
			alert('Alteração realizada com sucesso!');
		} else {
			alert('Veículo cadastrado com sucesso!');
		}
	}

	modalAction.style.display = 'none';
	tabDetail.style.display = 'none';
	fetchVehicles();
}

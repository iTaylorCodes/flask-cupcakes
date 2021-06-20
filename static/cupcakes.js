const base_url = 'http://localhost:5000/api';

const $cupcakeList = $('#cupcake-list');
const $cupcakeForm = $('#add-cupcake-form');

// HTML to use for cupcakes in list
function cupcakeHTML(cupcake) {
	return `
        <div class="card" data-cupcake-id=${cupcake.id}>
            <li >
                <img class="cupcake-img" src="${cupcake.image}" alt="Image of cupcake">
                <b>Flavor:</b> ${cupcake.flavor} | <b>Size:</b> ${cupcake.size} | <b>Rating:</b> ${cupcake.rating}
            </li>
        </div>`;
}

// Gets the list of cupcakes from the api and appends it to page
async function getCupcakes() {
	const resp = await axios.get(`${base_url}/cupcakes`);
	for (let cupcake of resp.data.cupcakes) {
		let newCupcake = $(cupcakeHTML(cupcake));
		$cupcakeList.append(newCupcake);
	}
}

// Handles new cupcake form, adds cupcake to db and page
$cupcakeForm.on('submit', async function (evt) {
	evt.preventDefault();

	let flavor = $('#flavor').val();
	let size = $('#size').val();
	let rating = $('#rating').val();
	let image = $('#image').val();

	const newCupcakeResponse = await axios.post(`${base_url}/cupcakes`, {
		flavor,
		size,
		rating,
		image
	});

	let newCupcake = $(cupcakeHTML(newCupcakeResponse.data.cupcake));
	$cupcakeList.append(newCupcake);
	$cupcakeForm.trigger('reset');
});

$(getCupcakes);

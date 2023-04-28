let skip = 0;
const limit = 30;

const getProducts = (url, skip) => {
    url += skip;
    console.log(url);
    axios.get(url)
        .then(res => {
            const tablaProductos = document.getElementById("tablaProductos");
            res.data.products.forEach(element => {
                const fila = document.createElement("tr");
                fila.innerHTML = `<th>${element.id}</th>
                            <td>${element.title}</td>
                            <td>U$D${element.price}</td>
                            <td>${element.rating}</td>
                            <td><button onclick="verMas(${element.id})" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducto">Ver Mas</button></td>`;
                tablaProductos.appendChild(fila);
            });

            console.log(res);
        })
}

const masProductos = document.getElementById("masProductos");
masProductos.onclick = () => {
    skip += limit;
    const paginacion = document.getElementById("paginacion");
    if (skip > 90) paginacion.removeChild(masProductos);
    else if (skip <= 90) {
        tablaProductos.innerHTML = "";
        const volver = document.createElement("a");
        volver.setAttribute("id", "volver");
        volver.setAttribute("class", "link-primary");
        volver.innerHTML = "Volver";
        volver.onclick = () => {
            tablaProductos.innerHTML = "";
            skip -= limit;
            if (skip == 0) paginacion.removeChild(volver);
            if (skip < 90) paginacion.appendChild(masProductos);
            getProducts("https://dummyjson.com/products?limit=" + limit + "&skip=", skip);
        }
        if (skip == 90) paginacion.removeChild(masProductos);
        if (!document.getElementById("volver")) paginacion.appendChild(volver);
        console.log(volver);
        getProducts("https://dummyjson.com/products?limit=" + limit + "&skip=", skip);
    }
}

getProducts("https://dummyjson.com/products?limit=" + limit + "&skip=", 0);

const filterProducts = text => {
    let url = "https://dummyjson.com/products/search?q=" + text;
    axios.get(url)
        .then(res => {
            console.log(res);
            const tablaProductos = document.getElementById("tablaProductos");
            tablaProductos.innerHTML = "";
            res.data.products.forEach(element => {
                const fila = document.createElement("tr");
                fila.innerHTML = `<th>${element.id}</th>
                            <td>${element.title}</td>
                            <td>U$D${element.price}</td>
                            <td>${element.rating}</td>
                            <td><button onclick="verMas(${element.id})" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducto">Ver Mas</button></td>`;
                tablaProductos.appendChild(fila);
            });
        })
}

const getById = id => {
    let url = "https://dummyjson.com/products/" + id;
    return axios.get(url)
}

const search = document.getElementById("buscarBoton");
const input = document.getElementById("buscar");
search.setAttribute("disabled", "true");
input.onkeyup = (e) => {
    if (input.value) search.removeAttribute("disabled");
    else search.setAttribute("disabled", "true");
}
search.onclick = (e) => {
    e.preventDefault();
    filterProducts(input.value);
}

const verMas = id => {
    const titulo = document.getElementById("titulo");
    const detalle = document.getElementById("producto");
    const product = getById(id).then(product => {
        console.log(product);
        titulo.innerHTML = `${product.data.title}`;
        detalle.innerHTML = `<p>${product.data.description}</p>
                            <hr style="border: 1px solid black; padding:0; opacity: 100;">
                            <b>Precio:</b>U$D ${product.data.price}<br>
                            <b>Rating:</b> ${product.data.rating}✡<br>
                            <img src="${product.data.thumbnail}" width="100%" height=auto>`;
    }
    );
}

const getCategories = () => {
    let url = "https://dummyjson.com/products/categories";
    axios.get(url)
        .then(res => {
            console.log(res);
            const dropdown = document.getElementById("categories");
            dropdown.innerHTML = "";
            console.log(dropdown);
            res.data.forEach(element => {
                console.log(element);
                const categorie = document.createElement("li");
                categorie.innerHTML = `<a class="dropdown-item" href="#" onclick="filterByCategories('${element}')">${element}</a>`
                dropdown.appendChild(categorie);
            });
        })
}

const filterByCategories = cat => {
    let url = "https://dummyjson.com/products/category/" + cat;
    axios.get(url)
        .then(res => {
            console.log(res);
            const tablaProductos = document.getElementById("tablaProductos");
            tablaProductos.innerHTML = "";
            res.data.products.forEach(element => {
                const fila = document.createElement("tr");
                fila.innerHTML = `<th>${element.id}</th>
                            <td>${element.title}</td>
                            <td>U$D${element.price}</td>
                            <td>${element.rating}</td>
                            <td><button onclick="verMas(${element.id})" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#modalProducto">Ver Mas</button></td>`;
                tablaProductos.appendChild(fila);
            });
        })
}
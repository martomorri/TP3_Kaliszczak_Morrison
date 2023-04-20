const getProducts = url => {
    axios.get(url)
    .then(res => {
        const tablaProductos = document.getElementById("tablaProductos");
        const totalDiv = document.getElementById("totalDiv");
        totalDiv.innerHTML = `Total: ${res.data.total}`;
        res.data.products.forEach(element => {
            const fila = document.createElement("tr");
            fila.setAttribute("id", `${element.id}`)
            fila.innerHTML = `<th>${element.id}</th>
                            <td>${element.title}</td>
                            <td>U$D${element.price}</td>
                            <td>${element.rating}</td>
                            <td><button id="verMas" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProducto">Ver Mas</button></td>`;
            tablaProductos.appendChild(fila);
        });

        console.log(res);
    })
}

getProducts("https://dummyjson.com/products");

const filterProducts = text => {
    let url = "https://dummyjson.com/products/search?q=" + text;
    axios.get(url)
    .then(res => {
        console.clear();
        console.log(res);
        const tablaProductos = document.getElementById("tablaProductos");
        tablaProductos.innerHTML = "";
        res.data.products.forEach(element => {
            const fila = document.createElement("tr");
            fila.setAttribute("id", `${element.id}`)
            fila.innerHTML = `<th>${element.id}</th>
                            <td>${element.title}</td>
                            <td>U$D${element.price}</td>
                            <td>${element.rating}</td>
                            <td><button id="verMas" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#modalProducto">Ver Mas</button></td>`;
            tablaProductos.appendChild(fila);
        });
    })
}

const search = document.getElementById("buscarBoton");
const input = document.getElementById("buscar");
search.setAttribute("disabled", "true");
input.onkeyup = (e) => {
    if (input.value) search.removeAttribute("disabled");
    else search.setAttribute("disabled", "true");
}
search.onclick = (e) => {
    filterProducts(input.value);
}

const more = document.getElementById("verMas");
more.onclick = (e) => {
    const titulo = document.getElementById("titulo");
    const detalle = document.getElementById("producto");
}
const getProducts = url => {
    axios.get(url)
    .then(res => {
        const ulProductos = document.getElementById("productos");
        const totalDiv = document.getElementById("totalDiv");
        totalDiv.innerHTML = `Total: ${res.data.total}`;
        res.data.products.forEach(element => {
            const unLi = document.createElement("li");
            unLi.innerHTML = `${element.title}`;
            ulProductos.appendChild(unLi);
        });
        console.log(res);
    })
}

const filterProducts = text => {
    let url = "https://dummyjson.com/products/search?q=" + text;
    axios.get(url)
    .then(res => {
        console.log(res);
        const ulProductos = document.getElementById("productos");
        ulProductos.innerHTML = "";
        res.data.products.forEach(element => {
            const unLi = document.createElement("li");
            unLi.innerHTML = `${element.title}`;
            ulProductos.appendChild(unLi);
        });
    })
}

getProducts("https://dummyjson.com/products");

const search = document.getElementById("buscarBoton");
search.onclick = (e) => {
    const input = document.getElementById("buscar");
    filterProducts(input.value);
}
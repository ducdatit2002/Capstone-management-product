
function apiGetProductsList() {
  return axios({
    url: `https://6539c7c2e3b530c8d9e8aa55.mockapi.io/Produt`,
    method: "GET",
  });
}

function apiGetProductsSearch(searchValue) {
  return axios({
    url: `https://6539c7c2e3b530c8d9e8aa55.mockapi.io/Produt`,
    method: "GET",
    params: {
      name: searchValue || undefined,
    },
  });
}

function apiGetProductById(productId) {
  return axios({
    url: `https://6539c7c2e3b530c8d9e8aa55.mockapi.io/Produt/${productId}`,
    method: "GET",
  });
}

function apiCreateProduct(product) {
  return axios({
    url: "https://6539c7c2e3b530c8d9e8aa55.mockapi.io/Produt",
    method: "POST",
    data: product,
  });
}

function apiUpdateProduct(productId, newProduct) {
  return axios({
    url: `https://6539c7c2e3b530c8d9e8aa55.mockapi.io/Produt/${productId}`,
    method: "PUT",
    data: newProduct,
  });
}

function apiDeleteProduct(productId) {
  return axios({
    url: `https://6539c7c2e3b530c8d9e8aa55.mockapi.io/Produt/${productId}`,
    method: "DELETE",
  });
}

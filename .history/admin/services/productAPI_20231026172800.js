// / AXIOS Get Product List
function apiGetProductsList() {
  return axios({
    url: `https://64b6ce1adf0839c97e162662.mockapi.io/Products`,
    method: "GET",
  });
}

function apiGetProductsSearch(searchValue) {
  return axios({
    url: `https://64b6ce1adf0839c97e162662.mockapi.io/Products`,
    method: "GET",
    params: {
      name: searchValue || undefined,
    },
  });
}

// / AXIOS Get Specific Product By ID
function apiGetProductById(productId) {
  return axios({
    url: `https://64b6ce1adf0839c97e162662.mockapi.io/Products/${productId}`,
    method: "GET",
  });
}

// product = {name: "...", price: 1000, image: "...", type: "..."}
function apiCreateProduct(product) {
  return axios({
    url: "https://64b6ce1adf0839c97e162662.mockapi.io/Products",
    method: "POST",
    data: product,
  });
}

function apiUpdateProduct(productId, newProduct) {
  return axios({
    url: `https://64b6ce1adf0839c97e162662.mockapi.io/Products/${productId}`,
    method: "PUT",
    data: newProduct,
  });
}

// / AXIOS Delete Specific Product By ID
function apiDeleteProduct(productId) {
  return axios({
    url: `https://64b6ce1adf0839c97e162662.mockapi.io/Products/${productId}`,
    method: "DELETE",
  });
}

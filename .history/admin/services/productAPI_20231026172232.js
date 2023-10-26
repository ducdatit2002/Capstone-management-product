// / AXIOS Get Product List
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
  
  // / AXIOS Get Specific Product By ID
  function apiGetProductById(id) {
    return axios({
      url: `https://6539c7c2e3b530c8d9e8aa55.mockapi.io/Produt/${id}`,
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
  
  function apiUpdateProduct(id, newProduct) {
    return axios({
      url: `https://6539c7c2e3b530c8d9e8aa55.mockapi.io/Produt/${id}`,
      method: "PUT",
      data: newProduct,
    });
  }
  
  // / AXIOS Delete Specific Product By ID
  function apiDeleteProduct(id) {
    return axios({
      url: `https://6539c7c2e3b530c8d9e8aa55.mockapi.io/Produt/${id}`,
      method: "DELETE",
    });
  }
  
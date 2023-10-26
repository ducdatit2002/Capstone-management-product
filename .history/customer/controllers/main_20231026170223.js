let shop = document.getElementById("shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

// Fetch data from the API
fetch("https://6539c7c2e3b530c8d9e8aa55.mockapi.io/Produt")
  .then(response => response.json())
  .then(data => {
    const shopItemsData = data;
    generateShop(shopItemsData);
  })
  .catch(error => {
    console.error("Error fetching data:", error);
  });

let generateShop = (data) => {
  shop.innerHTML = data
    .map((x) => {
      let { id ,name ,price, img ,desc ,type} = x;
      let search = basket.find((y) => y.id === id) || [];
      return `
    <div id="product-id-${id}" class="item">
      <img width="220" src=${img} alt="">
      <div class="details">
        <h3>${name}</h3>
        <p>${type}</p>
        <p>${desc}</p>
        <div class="price-quantity">
          <h2>$ ${price} </h2>
          <div class="buttons">
            <i onclick="decrement('${id}')" class="bi bi-dash-lg"></i>
            <div id="${id}" class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
            <i onclick="increment('${id}')" class="bi bi-plus-lg"></i>
          </div>
        </div>
      </div>
  </div>
    `;
    })
    .join("");
};


let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) {
    basket.push({
      id: selectedItem,
      item: 1,
    });
  } else {
    search.item += 1;
  }

  console.log(basket);
  update(selectedItem);
  localStorage.setItem("data", JSON.stringify(basket));
};

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((x) => x.id === selectedItem);

  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem);
  basket = basket.filter((x) => x.item !== 0);
  console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((x) => x.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculation();
};

let calculation = () => {
  let cartIcon = document.getElementById("cartAmount");
  cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};


calculation();

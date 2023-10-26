import { Product } from "../models/Products.js"

getProducts();

let isSubmitted = false;

var current_quantity_product

function getProducts() {
  apiGetProductsList()
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function samsungFilter() {
  var filter_array = []

  apiGetProductsList()
    .then((response) => {
      for (var i = 0; i < response.data.length; i++) {
        if (response.data[i].type.toLowerCase() == "samsung") {
          filter_array.push(response.data[i])
        }
      }
      console.log(filter_array)
      display(filter_array)
    })
    .catch((error) => {
      console.log(error);
    });
}

function isRequired(value) {
  if (!value.trim()) {

    return false;
  }
  return true;
}
//Check Validate
function validate(order, productID) {
  // Lấy dữ liệu
  let name = document.getElementById("name_product").value;
  let price = document.getElementById("price_product").value;
  let screen = document.getElementById("screen_product").value;
  let backCamera = document.getElementById("backCamera_product").value;
  let frontCamera = document.getElementById("frontCamera_product").value;
  let img = document.getElementById("img_product").value;
  let desc = document.getElementById("desc_product").value;
  let type = document.getElementById("type_product").value;

  let isValid = true;

//Tên
  if (!isRequired(name)) {
    isValid = false;
    document.getElementById("tbName").innerHTML = "Tên sản phẩm không được để trống";
    document.getElementById("tbName").style.display = "block"
  } else {
    document.getElementById("tbName").style.display = "none"
  }

//Giá
  if (!isRequired(price)) {
    isValid = false;
    document.getElementById("tbPrice").innerHTML =
      "Giá sản phẩm không được để trống";
    document.getElementById("tbPrice").style.display =
      "block";
  } else if (isNaN(price) == true) {
    isValid = false;
    document.getElementById("tbPrice").innerHTML = "Giá sản phẩm phải là số";
    document.getElementById("tbPrice").style.display = "block";
  } else {
    document.getElementById("tbPrice").style.display =
      "none";
  }
// Screen
  if (!isRequired(screen)) {
    isValid = false;
    document.getElementById("tbScreen").innerHTML =
      "Màn hình sản phẩm không được để trống";
    document.getElementById("tbScreen").style.display =
      "block";
  } else {
    document.getElementById("tbScreen").style.display =
      "none";
  }
//Camera Sau
  if (!isRequired(backCamera)) {
    isValid = false;
    document.getElementById("tbBackCamera").innerHTML =
      "Camera sau của sản phẩm không được để trống";
    document.getElementById("tbBackCamera").style.display =
      "block";
  } else {
    document.getElementById("tbBackCamera").style.display =
      "none";
  }
//Camera Trước
  if (!isRequired(frontCamera)) {
    isValid = false;
    document.getElementById("tbFrontCamera").innerHTML =
      "Camera trước của sản phẩm không được để trống";
    document.getElementById("tbFrontCamera").style.display =
      "block";
  } else {
    document.getElementById("tbFrontCamera").style.display =
      "none";
  }
// Img
  if (!isRequired(img)) {
    isValid = false;
    document.getElementById("tbImg").innerHTML =
      "Hình ảnh của sản phẩm không được để trống";
    document.getElementById("tbImg").style.display =
      "block";
  } else {
    document.getElementById("tbImg").style.display =
      "none";
  }
// Mô Tả
  if (!isRequired(desc)) {
    isValid = false;
    document.getElementById("tbDesc").innerHTML =
      "Mô tả của sản phẩm không được để trống";
    document.getElementById("tbDesc").style.display =
      "block";
  } else {
    document.getElementById("tbDesc").style.display =
      "none";
  }

// Type
  let type_span = document.getElementById("tbType");
  if (!isRequired(type)) {
    isValid = false;
    type_span.innerHTML = "Loại sản phẩm không được để trống";
    type_span.style.display = "block";
  } else {
    type_span.style.display = "none";
  }

  console.log("current_quantity_product", current_quantity_product)


  if (isValid) {

    if (order == 1) {
      let product = new Product(
        current_quantity_product + 1,
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
      );
      console.log(product)
      return product;
    } else if (order == 2) {
      let product = new Product(
        productID,
        name,
        price,
        screen,
        backCamera,
        frontCamera,
        img,
        desc,
        type
      );
      console.log(product)
      return product;
    }
  }
  return undefined;
}

// // Reset lại form điền
function resetForm() {
  isSubmitted = false;

  document.getElementById("name_product").value = "";
  document.getElementById("price_product").value = "";
  document.getElementById("screen_product").value = "";
  document.getElementById("backCamera_product").value = "";
  document.getElementById("frontCamera_product").value = "";
  document.getElementById("img_product").value = "";
  document.getElementById("desc_product").value = "";
  document.getElementById("type_product").value = "";

  document.getElementById("tbName").innerHTML = "";
  document.getElementById("tbPrice").innerHTML = "";
  document.getElementById("tbScreen").innerHTML = "";
  document.getElementById("tbBackCamera").innerHTML = "";
  document.getElementById("tbFrontCamera").innerHTML = "";
  document.getElementById("tbImg").innerHTML = "";
  document.getElementById("tbDesc").innerHTML = "";
  document.getElementById("tbType").innerHTML = "";

}

// // Create New Product
function createProduct() {

  let product = validate(1)
  console.log(product)
  if (!product) {
    return;
  }

  // Gọi API thêm sản phẩm
  apiCreateProduct(product)
    .then((response) => {
      return apiGetProductsList();
    })
    .then((response) => {
      display(response.data);
      $("#myModal").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });

  resetForm();
}

// // Delete Product
function deleteProduct(productId) {
  apiDeleteProduct(productId)
    .then(() => {
      return apiGetProductsList();
    })
    .then((response) => {
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function selectProduct(productId) {

  $("#myModal").modal("show");

  getElement(".modal-title").innerHTML = "Cập nhật sản phẩm";
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-success" id="btnUpdateProduct">Cập nhật</button>
    <button class="btn btn-secondary" data-dismiss="modal">Đóng</button>
  `;

  apiGetProductById(productId)
    .then((response) => {

      let product = response.data;
      getElement("#name_product").value = product.name;
      getElement("#price_product").value = product.price;
      getElement("#screen_product").value = product.screen;
      getElement("#backCamera_product").value = product.backCamera;
      getElement("#frontCamera_product").value = product.frontCamera;
      getElement("#img_product").value = product.img;
      getElement("#desc_product").value = product.desc;
      getElement("#type_product").value = product.type;
    })
    .catch((error) => {
      console.log(error);
    });

  getElement("#btnUpdateProduct").addEventListener("click", function () {
    updateProduct(productId)
  })
}

// // Update Product
function updateProduct(productId) {

  isSubmitted = true;
  let product = validate(2, productId);
  if (!product) {
    return;
  }

  apiUpdateProduct(productId, product)
    .then(() => {
      // Cập nhật thành công
      return apiGetProductsList();
    })
    .then((response) => {
      display(response.data);
      $("#myModal").modal("hide");
    })
    .catch((error) => {
      console.log(error);
    });
}

// // Display Function
function display(products) {
  current_quantity_product = products.length
  let html = products.reduce((result, value, index) => {
    let product = new Product(
      value.id,
      value.name,
      value.price,
      value.screen,
      value.backCamera,
      value.frontCamera,
      value.img,
      value.desc,
      value.type
    );

    return (
      result +
      `
        <tr>
          <td>${index + 1}</td>
          <td>${product.name}</td>
          <td>${product.price}</td>
          <td>${product.screen}</td>
          <td>${product.backCamera}</td>
          <td>${product.frontCamera}</td>    
          <td>
            <img src="${product.img}" width="100px" height="100px" />
          </td>
          <td>${product.desc}</td>    
          <td>${product.type}</td>
          <td>
            <button
              class="btn btn-info btnUpdate">
              Update
            </button>
            <button
              class="btn btn-danger btnDelete">
              Delete
            </button>
          </td>
        </tr>
      `
    );
  }, "");


  document.getElementById("tblDanhSachSP").innerHTML = html;

  // Thêm Event Listener cho Delete/Update button
  products.forEach((element, index) => {
    //Update Button
    document.getElementsByClassName("btnUpdate")[index].addEventListener("click", function () {
      selectProduct(element.id)
    })

    //Delete Button
    document.getElementsByClassName("btnDelete")[index].addEventListener("click", function () {
      deleteProduct(element.id)
    })
  });
}

function compare(a, b) {
  // Dùng toUpperCase() để không phân biệt ký tự hoa thường
  const priceA = Number(a.price);
  const priceB = Number(b.price);

  let comparison = 0;
  if (priceA > priceB || priceA == priceB) {
    comparison = 1;
  } else if (priceA < priceB) {
    comparison = - 1;
  }

  return comparison;
}

function reverseCompare(a, b) {
  // Dùng toUpperCase() để không phân biệt ký tự hoa thường
  const priceA = Number(a.price);
  const priceB = Number(b.price);

  let comparison = 0;
  if (priceA > priceB || priceA == priceB) {
    comparison = 1;
  } else if (priceA < priceB) {
    comparison = - 1;
  }

  return comparison * -1;
}

// // Price Giảm Dần
function sapXepGiam() {
  console.log("Sap xep giam")
  apiGetProductsList()
    .then((response) => {
      // Gọi hàm display để hiển thị ra giao diện
      console.log(response.data.sort(reverseCompare))
      display(response.data.sort(reverseCompare))
    })
    .catch((error) => {
      console.log(error);
    });
}

// // Price Tăng Dần
function sapXepTang() {
  console.log("Sap xep tang")
  apiGetProductsList()
    .then((response) => {
      // Gọi hàm display để hiển thị ra giao diện
      console.log(response.data.sort(compare))
      display(response.data.sort(compare))
    })
    .catch((error) => {
      console.log(error);
    });
}

document.getElementById("btnSapXep").onclick = () => {
  if (document.getElementById("SapXepTang").style.display == "block") {
    document.getElementById("SapXepGiam").style.display = "block"
    document.getElementById("SapXepTang").style.display = "none"
    sapXepGiam()
  } else {
    document.getElementById("SapXepGiam").style.display = "none"
    document.getElementById("SapXepTang").style.display = "block"
    sapXepTang()
  }
};

// ======= DOM =======
getElement("#btnThem").onclick = () => {
  getElement(".modal-title").innerHTML = "Thêm Sản Phẩm";
  resetForm()
  getElement(".modal-footer").innerHTML = `
    <button class="btn btn-success" id="btnCreateProduct">Thêm Sản Phẩm</button>
    <button class="btn btn-secondary" data-dismiss="modal">Đóng</button>
  `;

  document.getElementById("btnCreateProduct").addEventListener("click", createProduct)
};

getElement("#searchName").addEventListener("keypress", logKey)
getElement("#btnTimSP").addEventListener("click", function () {
  const search = getElement("#searchName").value
  searchByButton(search)
})

function searchByButton(value) {
  apiGetProductsSearch(value)
    .then((response) => {
      console.log(response.data)
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function logKey(e) {

  if (e.key !== "Enter") {
    return;
  }

  apiGetProductsSearch(e.target.value)
    .then((response) => {
      console.log(response.data)
      display(response.data);
    })
    .catch((error) => {
      console.log(error);
    });
}

function getElement(selector) {
  return document.querySelector(selector);
}
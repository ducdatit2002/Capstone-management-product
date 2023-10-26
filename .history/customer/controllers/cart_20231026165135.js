<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Cart</title>
  <link rel="stylesheet" href="./å">
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
</head>

<body>
  <div class="navbar">
    <div class="navbar_direct">
      <a class="nav_item" href="./index.html">
        <h2>Home</h2>
      </a>
      <a class="nav_item" href="./../../index.html">Page</a>
      <a class="nav_item" href="./../../admin/views/index.html">Admin</a>
    </div>

    <a href="./cart.html">
      <div class="cart">
        <i class="bi bi-cart2"></i>
        <div id="cartAmount" class="cartAmount">0</div>
      </div>
    </a>

  </div>

  <div id="label" class="text-center"></div>

  <div class="shopping-cart" id="shopping-cart"></div>
</body>
 
<script src="./../controllers/cart.js"></script>

</html>
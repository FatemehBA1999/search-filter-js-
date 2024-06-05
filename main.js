// http://localhost:3000/items
const searchInput = document.querySelector("#search");
const productsDom = document.querySelector(".product-center");
const btns = document.querySelectorAll(".btn");
let allProductData = [];
const filters = {
  searchItem: "",
};
document.addEventListener("DOMContentLoaded", () => {
  axios
    .get("http://localhost:3000/items")
    .then((res) => {
      allProductData = res.data;
      renderProducts(res.data, filters);
      //function render products in DOM
    })
    .catch((err) => console.log(err));
});
function renderProducts(_products, _filters) {
  const filteredProducts = _products.filter((p) => {
    return p.title.toLowerCase().includes(_filters.searchItem.toLowerCase());
  });
  productsDom.innerHTML = "";
  //render to DOM
  filteredProducts.forEach((item, index) => {
    const productsDiv = document.createElement("div");
    productsDiv.classList.add("product");
    productsDiv.innerHTML = `
    <div class="img-container">
        <img src=${item.image} alt="p-${index}" />
      </div>
      <div class="product-desc">
        <p class="product-title">${item.title}</p>
        <p class="product-price">
          ${item.price}<span>$</span>
        </p>
      </div>`;
    productsDom.appendChild(productsDiv);
  });
}
searchInput.addEventListener("input", (e) => {
  console.log(e.target.value);
  filters.searchItem = e.target.value;
  renderProducts(allProductData, filters);
});
// btn group based

btns.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const filter = e.target.dataset.filter;
    filters.searchItem = filter;
    renderProducts(allProductData, filters);
  });
});

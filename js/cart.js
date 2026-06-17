import { cartProducts } from "./data/renderData.js";
import { cartData, detailData } from "./productsDetail.js";
import { addStorageItem } from "./storage.js";

const cartProductsWrap = document.querySelector(".cartContainer .productsWrap");
const allDelete = document.querySelector(".allDelete");
const allCheck = document.querySelector("#allCheck");
const totallPriceElText = document.querySelector(
  ".totalWrap.price .price > span",
);
const totallQuantityText = document.querySelector(
  ".totalWrap.quantity .quantity",
);
const addCartBtn = document.querySelectorAll(".cartBtnWrap");
const orderBtn = document.querySelector(".orderWrap .centerBtn");

// 데이터 셋팅
let localCartData = JSON.parse(localStorage.getItem("cart")) || [];

// 상품 등록
function cartLocalAdd() {
  addCartBtn.forEach((el) => {
    el.addEventListener("click", () => {
      addStorageItem("cart", cartData(detailData));
    });
  });
}
cartLocalAdd();

// 타겟 인덱스 찾기
function dataTargetHandle(currentEl) {
  const liId = Number(currentEl.dataset.id);
  const liSize = currentEl.dataset.size;
  const liColor = currentEl.dataset.color;

  return localCartData.findIndex(
    (data) =>
      data.id === liId && data.size === liSize && data.color === liColor,
  );
}

function renderCart() {
  if (!cartProductsWrap) return;

  // 장바구니가 비었을 때
  if (localCartData.length === 0) {
    cartProductsWrap.innerHTML = `<div class="emptyCartWrap"><p class="emptyCart">Your cart is empty.</p></div>`;
    totallPriceElText.innerHTML = "0";
    totallQuantityText.innerHTML = "0";
    if (allCheck) allCheck.checked = false;
    return;
  }

  // 상품 정렬
  const sizeSort = { S: 1, M: 2, L: 3 };
  const sortCartData = [...localCartData].sort((a, b) => {
    if (a.id !== b.id) return a.id - b.id;
    return sizeSort[a.size] - sizeSort[b.size];
  });

  // HTML 렌더링
  cartProductsWrap.innerHTML = cartProducts(sortCartData);
}

renderCart();

function totalResult(quantity, price) {
  totallQuantityText.innerHTML = quantity;
  totallPriceElText.innerHTML = price;
}

function clickEventHandle() {
  const productCheckBox = document.querySelectorAll(".productCheck");
  const quantityInput = document.querySelectorAll(".quantity");

  function updateTotal() {
    const checkItem = localCartData.filter((item) => item.checked);

    const quantity = checkItem.reduce((sum, item) => sum + item.quantity, 0);
    const price = checkItem.reduce((sum, item) => sum + item.totalPrice, 0);

    totalResult(quantity, price);
  }

  //장바구니 클릭 이벤트(수량, 삭제)
  cartProductsWrap.addEventListener("click", (e) => {
    const liEl = e.target.closest(".productCont");
    const liQuantity = liEl.querySelector(".quantity");
    const liPrice = liEl.querySelector(".price > span");
    if (!liEl) return;

    const targetIndex = dataTargetHandle(liEl);
    if (targetIndex === -1) return;

    //수량 변경 & 상품 개별 삭제
    if (e.target.classList.contains("quantityBtn")) {
      const item = localCartData[targetIndex];

      if (e.target.classList.contains("plus") && item.quantity < 10) {
        item.quantity += 1;
      } else if (e.target.classList.contains("minus") && item.quantity > 1) {
        item.quantity -= 1;
      }

      item.totalPrice = item.initPrice * item.quantity;

      liQuantity.value = item.quantity;
      liPrice.innerHTML = item.totalPrice;
      updateTotal();
      orderItemSave();
    }

    if (e.target.classList.contains("deleteBtn")) {
      const item = localCartData[targetIndex];

      if (targetIndex !== -1) {
        localCartData.splice(targetIndex, 1);
      }

      liEl.remove();
      item.checked = false;
      localStorage.setItem("cart", JSON.stringify(localCartData));
      updateTotal();

      console.log(liEl);
    }
  });

  //전체 체크박스
  if (allCheck) {
    allCheck.addEventListener("change", (e) => {
      if (e.target.checked === true) {
        localCartData.forEach((el) => (el.checked = true));
        productCheckBox.forEach((el) => (el.checked = true));
      } else {
        localCartData.forEach((el) => (el.checked = false));
        productCheckBox.forEach((el) => (el.checked = false));
      }
      updateTotal();
      orderItemSave();
    });
  }

  //상품 체크 박스
  cartProductsWrap.addEventListener("change", (e) => {
    const liEl = e.target.closest(".productCont");
    if (!liEl) return;

    const targetIndex = dataTargetHandle(liEl);

    if (e.target.closest(".productCheck")) {
      const item = localCartData[targetIndex];
      item.checked = e.target.checked;

      allCheck.checked = localCartData.every((item) => item.checked);

      updateTotal();
      orderItemSave();
    }
  });

  //전체 삭제
  allDelete.addEventListener("click", () => {
    localCartData = [];
    localStorage.removeItem("cart");
    allCheck.checked = false;
    renderCart();
    totalResult("0", "0");
  });

  //수량, 체크박스 뒤로가기 초기화
  window.addEventListener("pageshow", () => {
    allCheck.checked = false;
    productCheckBox.forEach((el) => (el.checked = false));
    quantityInput.forEach((el) => {
      el.value = 1;
    });
    if (localStorage.getItem("order") !== null) {
      localStorage.removeItem("order");
    }
  });
}
//orderItem 저장
function orderItemSave() {
  const orderItems = localCartData.filter((item) => item.checked === true);

  localStorage.setItem("order", JSON.stringify(orderItems));
}
if (cartProductsWrap) {
  clickEventHandle();
}

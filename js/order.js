import { orderProducts } from "./data/renderData.js";

const orderData = JSON.parse(localStorage.getItem("order")) || [];
const addressProductsWrap = document.querySelector(
  ".addressSectionWrap .productsWrap",
);
const addressSearchBtn = document.querySelector(".addressInput .searchBtn");
const totallPriceElText = document.querySelector(
  ".totalWrap.price .price > span",
);
const totallQuantityText = document.querySelector(
  ".totalWrap.quantity .quantity",
);
const checkoutBtn = document.querySelector(".payBtnWrap .centerBtn");

// 데이터 없을 경우 & 화면 렌더링
if (orderData.length === 0) {
  alert("No products selected for order.");
  history.back();
} else {
  addressProductsWrap.innerHTML = orderProducts(orderData);
}

//전체 수량, 가격 계산
function orderTotalResult() {
  const quantity = orderData.reduce((sum, item) => sum + item.quantity, 0);
  const price = orderData.reduce((sum, item) => sum + item.totalPrice, 0);

  totallQuantityText.innerHTML = quantity;
  totallPriceElText.innerHTML = price;
}

//주소 검색
addressSearchBtn.addEventListener("click", () => {
  new kakao.Postcode({
    oncomplete: function (data) {
      const fullAddress = data.roadAddressEnglish;
      const addressParts = fullAddress.split(",");

      const city = `${addressParts[2]} ${addressParts[3]}`;
      const state = `${addressParts[0]} ${addressParts[1]}`;

      document.querySelector("#address").value = city;
      document.querySelector("#state").value = state;
      document.querySelector("#zoneCode").value = data.zonecode;
    },
  }).open();
});

function addressSearch() {
  const firstNameVal = document.querySelector("#firstName").value;
  const lastNameVal = document.querySelector("#lastName").value;
  const cityVal = document.querySelector("#address").value;
  const stateVal = document.querySelector("#state").value;
  const detailVal = document.querySelector("#OtherAddress").value;
  const codeVal = document.querySelector("#zoneCode").value;
  const telVal = document.querySelector("#tel").value;

  const payVal = document.querySelector(".radioWrap input:checked");

  // 주소 데이터 저장
  const orderAddress = {
    city: cityVal,
    state: stateVal,
    code: codeVal,
  };

  //이름 정규 표현식 체크
  const nameConfirm = /^[a-zA-Z]+$/;
  const fName = firstNameVal.trim();
  const lName = lastNameVal.trim();

  if (nameConfirm.test(fName) && nameConfirm.test(lName)) {
    orderAddress.firstName = fName;
    orderAddress.lastName = lName;
  } else {
    alert("Please enter a valid English name.");
    return;
  }
  if (detailVal.trim() !== "") {
    orderAddress.detailAdd = detailVal;
  }

  // tel 정규 표현식 체크
  const telConfirm = /^\d{11}$/;

  if (telConfirm.test(telVal.trim())) {
    orderAddress.tel = telVal;
  } else {
    alert("Please enter a valid 11-digit phone number (numbers only).");
    return;
  }

  if (!payVal) {
    alert("Please select a payment method.");
    return;
  }

  orderAddress.pay = payVal.id;

  localStorage.setItem("orderAddress", JSON.stringify(orderAddress));
  return true;
}
checkoutBtn.addEventListener("click", () => {
  const payPop = document.querySelector(".popWrap");

  if (!addressSearch()) {
    return;
  }
  payPop.classList.add("show");

  setTimeout(() => {
    payPop.classList.remove("show");
    window.location = "./orderList.html";
  }, 1500);
});

if (addressProductsWrap) {
  orderTotalResult();
}

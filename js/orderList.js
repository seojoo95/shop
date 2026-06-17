import { orderProducts } from "./data/renderData.js";
import { orderData } from "./order.js";

const orderListData = JSON.parse(localStorage.getItem("orderAddress")) || [];
console.log(orderListData);

//전화번호 - 추가
function telHandle(tel) {
  if (!tel) return;
  return tel.replace(/^(\d{3})(\d{4})(\d{4})/, `$1-$2-$3`);
}

//주문 상품 렌더
function orderInfoRender(orderListData) {
  return `
     <div className="addressInfo">
         <p class="name">${orderListData.firstName} ${orderListData.lastName}</p>
         <div className="addressWrap">
             <p class="address">${orderListData.code} ${orderListData.detailAdd ? orderListData.detailAdd : ""} ${orderListData.state}</p>
             <p class="address">${orderListData.city}</p>
         </div>
         <p class="tel">${telHandle(orderListData.tel)}</p>
     </div>
     <div className="payInfo">
         <p class="pay">${orderListData.pay}</p>
     </div>
    `;
}
const orderInfoWrap = document.querySelector(".orderInfoWrap");
const orderListProducts = document.querySelector(".orderList .productsWrap");

orderInfoWrap.innerHTML = orderInfoRender(orderListData);
orderListProducts.innerHTML = orderProducts(orderData);

const quantityText = document.querySelector(".orderTotalWrap .quantity > span");
const priceText = document.querySelector(".orderTotalWrap .price > span");

const quantity = orderData.reduce((sum, item) => sum + item.quantity, 0);
const price = orderData.reduce((sum, item) => sum + item.totalPrice, 0);

quantityText.innerHTML = quantity;
priceText.innerHTML = price;

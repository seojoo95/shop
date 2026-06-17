import { products } from "./data.js";

//상품 데이터
export function randomProducts(data, count) {
  return [...data].sort(() => Math.random() - 0.5).slice(0, count);
}
export function renderProducts(data) {
  return data
    .map(
      (item) =>
        `
    <li class="productCont swiper-slide" data-id="${item.id}"data-cate="${item.category}">
        <a href="./productDetail.html?id=${item.id}&category=${item.category}">
          <div class="imgWrap">
            <img src="${item.mainImg}" alt="${item.title}" />
          </div>
          <div class="productInfoWrap">
              <p class="name">${item.title}</p>
              <p class="price">$${item.initPrice.toLocaleString()}</p>
          </div>
        </a>
    </li>`,
    )
    .join("");
}

renderProducts(products);

//블로그 데이터
export function blogContList(item) {
  return `<li class="blogCont">
                <a href="./blogCont.html?id=${item.id}&category=${item.category}" target="_blank">
                  <div class="imgCont">
                    <div class="imgWrap">
                      <img src="${item.sImg}" alt="${item.title}" />
                    </div>
                  </div>
                  <div class="infoCont">
                  <div class="blogTitWrap">
                      <p class="blogTit">${item.title}</p>
                      <p class="blogSub">${item.description}</p>
                    </div>
                    <p class="date">${item.date}</p>
                  </div>
                </a>
              </li>`;
}
export function blogContGallery(item) {
  return `<li class="blogCont">
                <a href="./blogCont.html?id=${item.id}&category=${item.category}" target="_blank">
                  <div class="imgCont">
                    <div class="imgWrap">
                      <img src="${item.lImg}" alt="${item.title}" />
                    </div>
                    <div class="blogTit">
                      ${item.title}
                    </div>
                  </div>
                </a>
                  <div class="infoCont">
                    <div class="blogTag">
                        ${item.tag.map((tag) => `<p>${tag}</p>`).join("")}
                    </div>
                    <p class="date">${item.date}</p>
                  </div>
              </li>`;
}

//상품리스트 데이터
export function productsList(item) {
  return `
  <li class="productCont" data-id=${item.id} data-cate=${item.category}>
        <a href="./productDetail.html?id=${item.id}&category=${item.category}">
          <div class="imgWrap">
          <img src=${item.mainImg} alt=${item.title} />
          </div>
          <div class="productInfoWrap">
              <p class="brand">${item.brand}</p>
              <p class="name">${item.title}</p>
              <p class="price">$${item.initPrice.toLocaleString()}</p>
          </div>
        </a>
    </li>
  `;
}

//상품 상세페이지 데이터
export function productsDetail(detailData) {
  return `
  <section class="productInfoSection">
            <div class="productCont">
              <div class="productImgWrap">
                <div class="mainImg">
                  <img src="${detailData.mainImg}" alt="${detailData.id}" />
                </div>
                <div class="detailImg swiper">
                  <div class="swiper-wrapper">
                  ${
                    detailData.detailImg
                      ? detailData.detailImg
                          .map((img) => {
                            return `
                    <div class="swiper-slide">
                      <img src="${img}">
                    </div>`;
                          })
                          .join("")
                      : ""
                  }
                  </div>
                  <div class="swiper-scrollbar"></div>
                  <!-- swiper-wrapper END -->
                </div>
              </div>
              <!-- productImgWrap END -->
              <div class="productInfoWrap">
                <p class="brand">${detailData.brand}</p>
                <p class="name">${detailData.title}</p>
                <p class="price">$${detailData.initPrice}</p>
                <div class="optionContainer">
                  <div class="optionWrap size">
                    <p class="optionTit">size</p>
                    <ul class="optionListWrap">
                    ${
                      detailData.size
                        ? detailData.size
                            .map((size) => {
                              return `
                                     <li class="optionList">
                                       <label>
                                         <input type="radio" name="size" value="${size}" />
                                         <div class="radioBox">${size}</div>
                                       </label>
                                     </li>
                                     `;
                            })
                            .join("")
                        : ""
                    }
                    </ul>
                  </div>
                  <div class="optionWrap color">
                    <p class="optionTit">color</p>
                    <ul class="optionListWrap">
                    ${
                      detailData.color
                        ? detailData.color
                            .map((color) => {
                              return `
                                      <li class="optionList">
                                        <label>
                                          <input type="radio" name="color" value="${color.name}" />
                                          <div class="radioBox">
                                            <span class="color" style="background: ${color.code}">${color.name}</span>
                                          </div>
                                        </label>
                                      </li>
                                    `;
                            })
                            .join("")
                        : ""
                    }
                    </ul>
                  </div>
                </div>
                <div class="cartBtnWrap web disabled">
                  <button class="blackBtn addCartBtn" data-id="${detailData.id}" onclick="location.href='cart.html?id=${detailData.id}&category=${detailData.category}'">
                    add to cart
                  </button>
                </div>
              </div>
              <!-- productInfoWrap END -->
            </div>
          </section>
          <!-- productInfoSection END -->
          <div class="cartBtnWrap mo disabled">
            <button class="blackBtn addCartBtn" data-id="${detailData.id}" onclick="location.href='cart.html?id=${detailData.id}&category=${detailData.category}'">
              add to cart
            </button>
          </div>
          <section class="productDescriptionSection">
            <div class="descriptionImgWrap">
              <p class="descriptionTit">gallery</p>
              <ul class="imgListWrap">
              ${
                detailData.detailImg
                  ? detailData.detailImg
                      .map((img, idx) => {
                        return `
                <li class="imgList">
                  <img src="${img}" alt="${detailData.category}_${detailData.id}_${idx}" />
                </li>
                `;
                      })
                      .join("")
                  : ""
              }
              </ul>
            </div>
            <!-- descriptionImgWrap END -->
            <div class="descriptionInfoWrap">
              <p class="descriptionTit">care</p>
              <ul class="careContWrap">
                <li class="careCont">
                  <span class="titIcon">
                    <img src="./images/icons/truck.svg" alt="truckIcon" />
                  </span>
                  <div class="careTextWrap">
                    <span class="careTit">Free Flat Rate Shipping</span>
                    <p class="careText">
                      Estimated to be delivered on <br />
                      09/11/2021 - 12/11/2021.
                    </p>
                  </div>
                </li>
                <li class="careCont">
                  <span class="titIcon">
                    <img src="./images/icons/tag.svg" alt="tgaIcon" />
                  </span>
                  <div class="careTextWrap">
                    <span class="careTit">COD Policy</span>
                    <p class="careText">
                      Cash on Delivery (COD) is available for selected orders
                      and regions only. Payment must be completed at the time of
                      delivery. <br /><br />
                      Please make sure your shipping information is correct
                      before placing an order. Additional COD fees may apply
                      depending on your location. <br /><br />
                      COD is not available for some limited items or
                      international orders. Unconfirmed or refused COD orders
                      may result in future restrictions.
                    </p>
                  </div>
                </li>
                <li class="careCont">
                  <span class="titIcon">
                    <img src="./images/icons/refresh.svg" alt="refreshIcon" />
                  </span>
                  <div class="careTextWrap">
                    <span class="careTit arrowIcon">Return Policy</span>
                    <p class="careText">
                      Returns are accepted within 7 days of delivery for unused
                      items in their original condition and packaging.
                      <br /><br />
                      All returned items must include original tags and
                      accessories. Refunds are processed after inspection and
                      approval. <br /><br />
                      Shipping fees are non-refundable unless the item is
                      defective or incorrect. Sale, limited edition, and
                      personalized items may not be eligible for return or
                      exchange.
                    </p>
                  </div>
                </li>
              </ul>
            </div>
          </section>
          <!-- productDescriptionSection END -->
  `;
}

//장바구니 데이터
export function cartProducts(localCartData) {
  return localCartData
    .map(
      (data, idx) =>
        `<li
                  class="productCont"
                  data-id="${data.id}"
                  data-cate="${data.category}"
                  ${data.size ? `data-size="${data.size}"` : ""}
                  ${data.color ? `data-color="${data.color}"` : ""}
                >
                  <input
                    class="productCheck"
                    type="checkbox"
                    id="check_${data.id}_${idx + 1}"
                  />
                  <div class="imgWrap">
                    <img src="${data.mainImg}" alt="${data.title}" />
                  </div>
                  <div class="productInfoWrap">
                    <div class="productInfo">
                      <p class="brand">${data.brand}</p>
                      <p class="name">${data.title}</p>
                      <div class="optionWrap">
                       ${data.size ? `<p class="size">${data.size}</p>` : ""}
                       ${data.color ? `<p class="color">${data.color}</p>` : ""}
                      </div>
                    </div>
                    <div class="quantityWrap">
                      <button class="quantityBtn minus">
                        <img
                          src="./images/icons/quantity_minus.svg"
                          alt="quantity_minus"
                        />
                      </button>
                      <input
                        class="quantity"
                        type="number"
                        value="${data.quantity}"
                        min="1"
                        max="5"
                      />
                      <button class="quantityBtn plus">
                        <img
                          src="./images/icons/quantity_plus.svg"
                          alt="quantity_plus"
                        />
                      </button>
                    </div>
                    <p class="price">$ <span>${data.totalPrice}</span></p>
                  </div>
                  <button class="deleteBtn">
                    <img src="./images/icons/close.svg" alt="productDeletBtn" />
                  </button>
                </li>`,
    )
    .join("");
}

export function orderProducts(orderData) {
  return orderData
    .map(
      (data) =>
        `<li
            class="productCont"
            data-id="${data.id}"
            data-cate="${data.category}"
            ${data.size ? `data-size="${data.size}"` : ""}
            ${data.color ? `data-color="${data.color}"` : ""}
          >

            <div class="imgWrap">
              <img src="${data.mainImg}" alt="${data.title}" />
            </div>
            <div class="productInfoWrap">
              <div class="productInfo">
                <p class="brand">${data.brand}</p>
                <p class="name">${data.title}</p>
                <div class="optionWrap">
                 ${data.size ? `<p class="size">${data.size}</p>` : ""}
                 ${data.color ? `<p class="color">${data.color}</p>` : ""}
                </div>
              </div>
              <p class="quantity">${data.quantity}</span></p>
              <p class="price">$ <span>${data.totalPrice}</span></p>
            </div>
          </li>`,
    )
    .join("");
}
// 데이터 연결
export function renderItem(data, renderFn) {
  return data.map(renderFn).join("");
}

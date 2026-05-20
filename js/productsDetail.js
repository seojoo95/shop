import { products } from "./data/data.js";
import { productsList, renderItem, productsDetail } from "./data/renderData.js";
import { getParam } from "./data/getParam.js";

const idParam = Number(getParam("id"));
const categoryParam = getParam("category");

//상품 상세페이지
function productDetailHandle() {
  const detailData = products.find((data) => data.id === idParam);

  const productDetailContainer = document.querySelector(
    ".productDetailContainer",
  );
  productDetailContainer.insertAdjacentHTML(
    "afterbegin",
    productsDetail(detailData),
  );

  //상세페이지 서브 썸네일 스와이프
  const productDetailImgSwiper = new Swiper(
    ".productDetailContainer .detailImg.swiper",
    {
      direction: "horizontal",
      slidesPerView: 4,
      spaceBetween: 12,
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    },
  );
  //상세페이지 데이터 없을 경우
  function toggleElement(targetSelector, checkSelector) {
    const target = document.querySelector(targetSelector);
    const checkTarget = document.querySelector(checkSelector);

    target.style.display = checkTarget.children.length === 0 ? "none" : "block";
  }

  toggleElement(
    ".descriptionImgWrap .descriptionTit",
    ".descriptionImgWrap .imgListWrap",
  );

  toggleElement(
    ".productInfoSection .detailImg",
    ".productInfoSection .swiper-wrapper",
  );

  //상세페에지 care
  const careTit = document.querySelectorAll(".careTit");

  careTit.forEach((el) => {
    el.addEventListener("click", () => {
      el.classList.toggle("active");

      const careText = el.nextElementSibling;
      careText.classList.toggle("active");
    });
  });
}
productDetailHandle();

//메인 이미지 포커스
function imgFocushandle() {
  const mainImg = document.querySelector(
    ".productDetailContainer .mainImg > img",
  );
  const detailImg = document.querySelectorAll(".detailImg .swiper-slide");
  if (mainImg) {
    detailImg.forEach((el) => {
      el.addEventListener("click", () => {
        const img = el.querySelector("img");
        mainImg.src = img.src;
      });
    });
  }
}
imgFocushandle();

//장바구니 버튼 클릭
const cartBtn = document.querySelectorAll(".cartBtnWrap");
cartBtn.forEach((el) => {
  el.addEventListener("click", () => {
    const selectedSize = document.querySelector(
      'input[name="size"]:checked',
    )?.value;

    const selectedColor = document.querySelector(
      'input[name="color"]:checked',
    )?.value;
  });
});

//추천 상품
function recommendProducts() {
  const recommend = document.querySelector(".recommendProducts .productsWrap");

  const recommendData = [...products]
    .filter((item) => item.id !== idParam && item.category === categoryParam)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  recommend.innerHTML = renderItem(recommendData, productsList);
}
recommendProducts();

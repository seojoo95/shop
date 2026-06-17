import { products } from "./data/data.js";
import { productsList, renderItem, productsDetail } from "./data/renderData.js";
import { getParam } from "./data/getParam.js";

const idParam = Number(getParam("id"));
const categoryParam = getParam("category");

export const detailData = products.find((data) => data.id === idParam);

//size, color 선택 데이터
export function cartData(detailData) {
  const selectedSize = document.querySelector(
    'input[name="size"]:checked',
  )?.value;

  const selectedColor = document.querySelector(
    'input[name="color"]:checked',
  )?.value;

  return {
    ...detailData,
    size: selectedSize,
    color: selectedColor,
  };
}

//상품 상세페이지
const productDetailContainer = document.querySelector(
  ".productDetailContainer",
);
function productDetailHandle() {
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
if (productDetailContainer) {
  productDetailHandle();
}

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

//장바구니 버튼 활설&비활성
const addCartBtn = document.querySelectorAll(".cartBtnWrap");
const sizeRadio = document.querySelectorAll('input[name="size"]');
const colorRadio = document.querySelectorAll('input[name="color"]');

function addCartBtnHandle() {
  const isSizeValid =
    sizeRadio.length === 0 ||
    document.querySelector('input[name="size"]:checked');
  const isColorValid =
    colorRadio.length === 0 ||
    document.querySelector('input[name="color"]:checked');

  // 2. 둘 다 만족하면 버튼 활성화!
  if (isSizeValid && isColorValid) {
    addCartBtn.forEach((el) => el.classList.remove("disabled"));
  } else {
    addCartBtn.forEach((el) => el.classList.add("disabled"));
  }
}

[...sizeRadio, ...colorRadio].forEach((el) => {
  el.addEventListener("change", addCartBtnHandle);
});

//추천 상품
const recommend = document.querySelector(".recommendProducts .productsWrap");
function recommendProducts() {
  const recommendData = [...products]
    .filter((item) => item.id !== idParam && item.category === categoryParam)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);

  recommend.innerHTML = renderItem(recommendData, productsList);
}
if (recommend) {
  recommendProducts();
}

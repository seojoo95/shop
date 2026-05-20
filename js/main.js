import { products } from "./data/data.js";
import { renderProducts, randomProducts } from "./data/renderData.js";

document.addEventListener("includeLoaded", () => {
  //상품 리스트
  const productsList = document.querySelector(".productWrap");

  //productList 초기값
  productsList.innerHTML = renderProducts(products);

  //탭 메뉴
  function tabMenuHandle() {
    //메인 탭메뉴 상품
    const productsSwiper = new Swiper(".productContainer .swiper", {
      direction: "horizontal",
      slidesPerView: 2.2,
      spaceBetween: 10,
      grid: {
        rows: 2, // 👈 2줄
        fill: "row", // 가로 방향으로 채움
      },
      freeMode: true,
      breakpoints: {
        599: {
          slidesPerView: "auto",
          grid: {
            rows: 1,
          },
        },
      },
      initialSlide: 0,
    });

    const tabMenu = document.querySelectorAll(".tabMenuWrap");

    tabMenu.forEach((el) => {
      el.addEventListener("click", (e) => {
        const currentMenu = e.target.closest(".tabMenu");

        if (!currentMenu) return;

        const active = el.querySelector(".on");
        if (active) active.classList.remove("on");

        currentMenu.classList.add("on");
        tabMenuFilter(currentMenu);

        productsSwiper.slideTo(0, 300);
      });
    });
  }

  function tabMenuFilter(currentMenu) {
    //id 비교후 상품 노출
    const tabId = currentMenu.dataset.id;
    const filterProduct = products.filter((p) => p.category.includes(tabId));

    if (!tabId) return;

    if (tabId === "all") {
      productsList.innerHTML = renderProducts(products);
    } else {
      productsList.innerHTML = renderProducts(filterProduct);
    }
  }
  tabMenuHandle();

  //동영상 재생
  function videoHandle() {
    const videoCont = document.querySelector(".videoCont video");
    const playBtn = document.querySelector(".playBtn");

    playBtn.addEventListener("click", () => {
      videoCont.play();
      playBtn.classList.remove("show");
    });
    videoCont.addEventListener("ended", () => {
      playBtn.classList.add("show");
    });
  }
  videoHandle();

  //추천 상품
  function foryouProducts() {
    const foryouProductsList = document.querySelector(
      ".section.foryou .productWrap",
    );
    const random = randomProducts(products, 15);

    foryouProductsList.innerHTML = renderProducts(random);
  }
  foryouProducts();
});

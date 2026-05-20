import { products } from "./data/data.js";
import { productsList, renderItem, productsDetail } from "./data/renderData.js";
import { getParam } from "./data/getParam.js";

const productsContainer = document.querySelector(
  ".productListContainer .productsWrap",
);

const categoryParam = getParam("category");
const tagParam = getParam("tag");

//gnb 상품 필터
function gnbProductsFilter() {
  const productsNum = document.querySelector(
    ".productFilterHead .totalNum > span",
  );
  if (categoryParam && tagParam) {
    //둘 다 있으면 데이터의 category와도 같고 seoson도 같은 애를 찾아라

    const allFilterProducts = products.filter(
      (data) => data.category === categoryParam && data.tag === tagParam,
    );
    productsContainer.innerHTML = renderItem(allFilterProducts, productsList);

    productsFilterHandle(allFilterProducts);

    productsNum.textContent = allFilterProducts.length;
  } else {
    const filterProducts = products.filter((data) =>
      data.category.includes(categoryParam),
    );
    productsContainer.innerHTML = renderItem(filterProducts, productsList);

    productsFilterHandle(filterProducts);

    productsNum.textContent = filterProducts.length;
  }
}

if (productsContainer) {
  gnbProductsFilter();
}

//상품 필터
function productsFilterHandle(data) {
  const select = document.querySelector("#filterSelect");
  const baseData = [...data];

  select.addEventListener("change", (e) => {
    const value = e.target.value;

    let result = [...baseData];

    if (value === "high") {
      result.sort((a, b) => b.price - a.price);
    }

    if (value === "low") {
      result.sort((a, b) => a.price - b.price);
    }

    if (value === "new") {
      result = baseData.filter((item) => item.tag === "new");
    }

    productsContainer.innerHTML = renderItem(result, productsList);
  });
}

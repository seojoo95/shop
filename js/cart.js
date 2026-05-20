// 하트(장바구니)버튼 동작
function heartBtnHandle() {
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".addCartBtn");

    if (!btn) return;

    const productId = Number(btn.dataset.id);

    // addCart(productId);

    e.preventDefault();
    e.stopPropagation();

    const heartImg = btn.querySelector("img");

    if (!btn.classList.contains("detailAddCart")) {
      btn.classList.toggle("addActive");

      if (btn.classList.contains("addActive")) {
        heartImg.src = "./images/icons/heart_color.svg";
      } else {
        heartImg.src = "./images/icons/heart.svg";
      }
    }
  });
}
heartBtnHandle();

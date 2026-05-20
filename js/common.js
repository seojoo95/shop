// gnb
function gnbHandle() {
  document.addEventListener("includeLoaded", () => {
    const body = document.querySelector("body");
    const menuBtn = document.querySelector(".menuBtn");
    const menuContainer = document.querySelector(".menuContainer");
    const hasSubMenu = document.querySelectorAll(".menuCont.hasSub");
    const dim = document.querySelector(".dim");

    menuContainer.classList.remove("show");
    //gnb show
    menuBtn.addEventListener("click", () => {
      menuBtn.classList.toggle("active");
      menuContainer.classList.toggle("show");
      dim.classList.toggle("show");

      // body 스크롤 X
      menuContainer.classList.contains("show")
        ? body.classList.add("noScroll")
        : body.classList.remove("noScroll");

      //lnb show
      hasSubMenu.forEach((el) => {
        const subMenuWrap = el.querySelector(".subMenuWrap");
        el.addEventListener("click", () => {
          el.classList.toggle("active");
          subMenuWrap.classList.toggle("show");
        });
      });

      // menu > tabmenu 초기값
      const gnbTabMenu = menuContainer.querySelectorAll(".tabMenu");
      if (!menuBtn.classList.contains("active")) {
        gnbTabMenu.forEach((el, idx) => {
          el.classList.remove("on");
          idx === 0 ? el.classList.add("on") : null;
        });
      }
    });
  });
}

gnbHandle();

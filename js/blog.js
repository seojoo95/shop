import { blogConts } from "./data/blogData.js";
import {
  renderItem,
  blogContList,
  blogContGallery,
} from "./data/renderData.js";
import { getParam } from "./data/getParam.js";

const blogWrap = document.querySelector(".blogWrap");

if (blogWrap) {
  blogWrap.innerHTML = renderItem(blogConts, blogContGallery);
}

//listbtn
function listBtnHandle() {
  const listBtn = document.querySelector(".listBtn");
  if (listBtn) {
    listBtn.addEventListener("click", () => {
      listBtn.classList.toggle("gallery");
      blogWrap.classList.toggle("list");

      if (blogWrap.classList.contains("list")) {
        blogWrap.innerHTML = renderItem(blogConts, blogContList);
      } else {
        blogWrap.innerHTML = renderItem(blogConts, blogContGallery);
      }
    });
  }
}
listBtnHandle();

//블로그 상세 데이터
const blogDetailContainer = document.querySelector(".blogDetailContainer");
function blogDetail() {
  const blogDetailData = blogConts.find((item) => item.id == getParam("id"));

  if (blogDetailData) {
    const blogDetailCont = `
  <article class="blogArticle">
          <div class="imgWrap">
            <img
              src=${blogDetailData.lImg}
              alt=${blogDetailData.title}
            />
          </div>
          <div class="textWrap">
            <h3 class="blogTit subTit2">
              ${blogDetailData.title}
            </h3>
            <p>
              ${blogDetailData.detailText1}
            </p>
          </div>
        </article>
        <article class="blogArticle">
          <div class="swiper blogContSwiper">
            <div class="swiper-wrapper">
            ${blogDetailData.detailImg
              .map(
                (img, idx) => `
              <div class="swiper-slide">
                <img src=${img} alt=${`blogSwipeImg_${idx}`} />
              </div>`,
              )
              .join("")}
   
            </div>
            <div class="swiper-pagination"></div>
          </div>
          <!-- swiper END -->
          <div class="textWrap">
            <p>
              ${blogDetailData.detailText2}
            </p>
          </div>
          <div class="blogContInfoWrap">
            <div class="blogContInfo">
              <p class="postInfo">Posted by OpenFashion</p>
              <p class="date">${blogDetailData.date}</p>
            </div>
            <div class="blogTag">
              ${blogDetailData.tag.map((tag) => `<p>${tag}</p>`).join("")}
            </div>
          </div>
        </article>
  `;
    blogDetailContainer.innerHTML = blogDetailCont;

    new Swiper(".blogArticle .blogContSwiper", {
      direction: "horizontal",
      slidesPerView: 1,
      pagination: {
        el: ".swiper-pagination",
      },
    });
  } else {
    const blogErrorCont = `
 <h1 class="tit errorText">Page not found.</h1>
  `;
    blogDetailContainer.innerHTML = blogErrorCont;
  }
}
if (blogDetailContainer) {
  blogDetail();
}

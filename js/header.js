export function headerContents() {
  return `
          <div class="headerWrap">
          <button class="menuBtn">
            <span></span>
            <span></span>
            <span></span>
          </button>
          <h1 class="logo">
            <a href="index.html"
              ><img src="./images/logo/logo.svg" alt="open fashion"
            /></a>
          </h1>
          <div class="headerOption">
            <button class="searchBtn">
              <img src="./images/icons/search_black.svg" alt="search" />
            </button>
            <button class="shoppingBagBtn">
              <img
                src="./images/icons/shoppingbag_black.svg"
                alt="shoppingbag"
              />
            </button>
          </div>
        </div>
        <div class="dim" aria-hidden="true"></div>
        <div class="menuContainer">
          <ul class="tabMenuWrap">
            <li class="tabMenu on"><button>women</button></li>
            <li class="tabMenu"><button>men</button></li>
            <li class="tabMenu"><button>kids</button></li>
          </ul>
          <!-- tabMenuWrap END -->
          <div class="menuContWrap">
            <nav class="menuWrap">
              <ul>
                <li class="menuCont hasSub">
                  <button class="subMenuOpenBtn">new</button>
                  <ul class="subMenuWrap">
                    <li class="subMenuCont"><a href="./productList.html?category=outer&tag=new" data-id"outer" tag-id="new">outer</a></li>
                    <li class="subMenuCont"><a href="./productList.html?category=tshirt&tag=new" data-id"tshirt" tag-id="new">tshirt</a></li>
                    <li class="subMenuCont"><a href="./productList.html?category=bag&tag=new" data-id"bag" tag-id="new">bag</a></li>
                    <li class="subMenuCont"><a href="./productList.html?category=acc&tag=new" data-id"acc" tag-id="new">acc</a></li>
                  </ul>
                </li>
                <li class="menuCont hasSub">
                  <button class="subMenuOpenBtn">apparel</button>
                  <ul class="subMenuWrap">
                    <li class="subMenuCont"><a href="./productList.html?category=outer" data-id="outer">outer</a></li>
                    <li class="subMenuCont"><a href="./productList.html?category=tshirt" data-id="tshirt">tshirt</a></li>
                  </ul>
                </li>
                <li class="menuCont"><a href="./productList.html?category=bag" data-id="bag">bag</a></li>
                <li class="menuCont"><a href="./productList.html?category=acc" data-id="acc">acc</a></li>
                <li class="menuCont">
                  <a href="./blogMain.html" target="_blank">blog</a>
                </li>
              </ul>
            </nav>
            <div class="contactContainer">
              <div class="contactInfo">
                <a class="contatcCont" href="tel:+010">
                  <img src="./images/icons/call.svg" alt="call" />
                  +60 825 876
                </a>
                <a class="contatcCont" href="javascript:;">
                  <img src="./images/icons/location.svg" alt="location" />
                  Store locator
                </a>
              </div>
              <!-- contactInfo END -->
              <div class="snsContainer">
                <span class="underLine">
                  <img src="./images/icons/titUnder.svg" alt="footerLine" />
                </span>
                <ul class="snsWrap">
                  <li class="snsCont">
                    <a href="#"
                      ><img src="./images/icons/twitter.png" alt="twitter"
                    /></a>
                  </li>
                  <li class="snsCont">
                    <a href="#"
                      ><img
                        src="./images/icons/instagram_black.svg"
                        alt="instagram"
                    /></a>
                  </li>
                  <li class="snsCont">
                    <a href="#"
                      ><img src="./images/icons/youtube.svg" alt="youtube"
                    /></a>
                  </li>
                </ul>
              </div>
              <!-- snsContainer END -->
            </div>
            <!-- contactContainer END -->
          </div>
          <!-- menuContWrap END -->
        </div>
        <!-- menuContainer END -->`;
}

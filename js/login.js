const loginForm = document.querySelector("#loginForm");
const loginInput = document.querySelectorAll(".inputWrap input");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    let isAllInput = true;

    loginInput.forEach((el) => {
      const inputWrap = el.parentElement;
      if (el.value.trim() === "") {
        inputWrap.classList.add("error");
        isAllInput = false;
      }
      if (!isAllInput) {
        return;
      }
    });

    const id = loginInput[0].value;
    const pw = loginInput[1].value;

    if (id === "test" && pw === "test1234") {
      localStorage.setItem("loginUser", id);
      if (document.referrer && !document.referrer.includes("login.html")) {
        location.href = document.referrer;
      } else {
        location.href = "./index.html";
      }
    } else {
      alert("Invalid ID or password.");
    }
  });

  loginInput.forEach((el) => {
    const inputWrap = el.parentElement;
    el.addEventListener("input", () => {
      inputWrap.classList.remove("error");
    });
  });
}

import "./footer.scss";

document.addEventListener("DOMContentLoaded", () => {
  const moreBtn = document.querySelector(".footer-head__more button");
  const textContainer = document.querySelector(".footer-head__body");
  const moreWrapper = document.querySelector(".footer-head__more");

  if (!moreBtn || !textContainer) return;

  moreBtn.addEventListener("click", (e) => {
    e.preventDefault();

    const isExpanded = textContainer.classList.contains("is-expanded");
    const btnText = moreBtn.querySelector("span");

    if (!isExpanded) {
      const startHeight = textContainer.offsetHeight;

      textContainer.classList.add("is-expanded");

      const endHeight = textContainer.scrollHeight;

      textContainer.style.height = `${startHeight}px`;

      textContainer.offsetHeight;

      textContainer.style.height = `${endHeight}px`;

      if (moreWrapper) moreWrapper.classList.add("is-active");
      if (btnText) btnText.textContent = "Менше";

      textContainer.addEventListener("transitionend", function onExpand() {
        textContainer.removeEventListener("transitionend", onExpand);
        textContainer.style.height = "";
      });
    } else {
      const startHeight = textContainer.offsetHeight;
      textContainer.style.height = `${startHeight}px`;

      textContainer.classList.remove("is-expanded");
      const endHeight = textContainer.offsetHeight;

      textContainer.classList.add("is-expanded");

      textContainer.offsetHeight;

      textContainer.style.height = `${endHeight}px`;

      if (moreWrapper) moreWrapper.classList.remove("is-active");
      if (btnText) btnText.textContent = "Більше";

      textContainer.addEventListener("transitionend", function onCollapse() {
        textContainer.removeEventListener("transitionend", onCollapse);
        textContainer.classList.remove("is-expanded");
        textContainer.style.height = "";
      });
    }
  });

  const links = document.querySelectorAll(".footer-navigation-block__link");

  links.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      if (this.classList.contains("footer-navigation-block__link--active")) {
        this.classList.add("animating");
      }
    });

    link.addEventListener("animationend", function () {
      this.classList.remove("animating");
    });
  });

  document.querySelector(".footer-contacts__button").addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });
});

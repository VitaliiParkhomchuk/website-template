import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Swiper from "swiper";
import { Navigation, Autoplay } from "swiper/modules";
import "@shared/scripts/liquid-glass-animation/liquid-glass-animation";
import "./home.scss";

gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const advantagesSlider = new Swiper(".advantages-list__container", {
    slidesPerView: "auto",
    enabled: true,
    spaceBetween: "8px",
    breakpoints: {
      1025: {
        enabled: false,
        slidesPerView: "auto",
        spaceBetween: "",
      },
    },
  });

  const optionsSlider = new Swiper(".assortment-options__list", {
    slidesPerView: "auto",
    enabled: true,
    spaceBetween: "8px",
    breakpoints: {
      1025: {
        enabled: false,
        slidesPerView: "3",
        spaceBetween: "10px",
      },
    },
  });

  const gallerySlider = new Swiper(".gallery__slider", {
    modules: [Navigation, Autoplay],
    spaceBetween: 10,
    slidesPerView: "1",
    speed: 1000,
    autoplay: {
      delay: 4000,
      enabled: true,
    },
    navigation: {
      prevEl: ".gallery__nav-prev",
      nextEl: ".gallery__nav-next",
    },
    breakpoints: {
      1025: {
        slidesPerView: "auto",
      },
    },
  });

  const flatsPrice = document.querySelectorAll(".assortment-flat-card__price-value");

  if (flatsPrice.length) {
    const updateFlatsPrice = (currency) => {
      flatsPrice.forEach((price) => {
        price.classList.toggle(
          "assortment-flat-card__price-value--active",
          price.dataset.currency === currency,
        );
      });
    };

    const initialCurrency = document.querySelector(".header-utility-currency")?.dataset.currency || "UAH";

    updateFlatsPrice(initialCurrency);

    window.addEventListener("currencyChange", (e) => {
      updateFlatsPrice(e.detail.currency);
    });
  }

  const optionsPrice = document.querySelectorAll(".assortment-options-card__price-value");

  if (optionsPrice.length) {
    const updateOptionsPrice = (currency) => {
      optionsPrice.forEach((price) => {
        price.classList.toggle(
          "assortment-options-card__price-value--active",
          price.dataset.currency === currency,
        );
      });
    };

    const initialCurrency = document.querySelector(".header-utility-currency")?.dataset.currency || "UAH";

    updateOptionsPrice(initialCurrency);

    window.addEventListener("currencyChange", (e) => {
      updateOptionsPrice(e.detail.currency);
    });
  }

  const gallerySection = document.querySelector(".gallery__slider");

  if (gallerySection) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            gallerySlider.autoplay.start();
          } else {
            gallerySlider.autoplay.stop();
          }
        });
      },
      {
        threshold: 0.2,
      },
    );

    observer.observe(gallerySection);
  }

  gsap.from(".advantages-header", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".advantages-header",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  gsap.from(".advantages-list-card", {
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".advantages-list",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  gsap.from(".assortment-flat__title", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".assortment-flat__title",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  gsap.from(".assortment-flat-card", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".assortment-flat__list",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  gsap.from(".assortment-flat__planning-btn", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".assortment-flat__planning-btn",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  gsap.from(".assortment-options__title", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".assortment-options__title",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  gsap.from(".assortment-options-card, .assortment-blocked-card", {
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".assortment-options__list",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  gsap.from(".gallery__title", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".gallery__title",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  gsap.from(".gallery__image", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".gallery__slider",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  let mm = gsap.matchMedia();

  mm.add(
    {
      isDesktop: "(min-width: 768px)",
      isMobile: "(max-width: 767px)",
    },
    (context) => {
      let { isDesktop } = context.conditions;

      const feedbackTl = gsap.timeline({
        scrollTrigger: {
          trigger: ".feedback",
          start: "top 85%",
          toggleActions: "play none none",
        },
      });

      if (isDesktop) {
        feedbackTl
          .from(".feedback__img-container", {
            x: -100,
            opacity: 0,
            duration: 1.2,
            ease: "power2.out",
          })
          .from(
            ".feedback__liquid-glass",
            {
              scale: 0.9,
              opacity: 0,
              duration: 1,
              ease: "back.out(1.7)",
            },
            "-=0.8",
          );
      }

      feedbackTl.from(
        ".feedback__content > *",
        {
          y: 40,
          opacity: 0,
          stagger: 0.15,
          duration: 0.8,
          ease: "power2.out",
        },
        isDesktop ? "-=0.6" : "+=0",
      );

      if (isDesktop) {
        gsap.to(".feedback__liquid-glass", {
          y: -100,
          ease: "none",
          scrollTrigger: {
            trigger: ".feedback",
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        });
      }

      return () => {};
    },
  );

  gsap.to(".feedback__liquid-glass", {
    y: -100,
    ease: "none",
    scrollTrigger: {
      trigger: ".feedback",
      start: "top bottom",
      end: "bottom top",
      scrub: true,
    },
  });

  gsap.from(".news-header", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".news-header",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  gsap.from(".news-card", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".news__list",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  gsap.from(".news-card__more", {
    y: 60,
    opacity: 0,
    duration: 1.2,
    stagger: 0.2,
    ease: "power2.out",
    scrollTrigger: {
      trigger: ".news-card__more",
      start: "top 85%",
      toggleActions: "play none none",
    },
  });

  window.addEventListener("load", () => {
    ScrollTrigger.refresh();
  });
});

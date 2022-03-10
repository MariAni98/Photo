document.addEventListener("DOMContentLoaded", function () {
  function setSearch(params) {
    const openBtn = document.querySelector(`.${params.openBtnClass}`);
    const search = document.querySelector(`.${params.searchClass}`);
    const closeBtn = search.querySelector(`.${params.closeBtnClass}`);

    search.addEventListener("animationend", function (evt) {
      if (this._isOpened) {
        this.classList.remove(params.activeClass);
        this.classList.remove(params.hiddenClass);
        this._isOpened = false;
      } else {
        this._isOpened = true;
      }
    });

    search.addEventListener("click", function (evt) {
      evt._isSearch = true;
    });

    openBtn.addEventListener("click", function (evt) {
      this.disabled = true;

      if (
        !search.classList.contains(params.activeClass) &&
        !search.classList.contains(params.hiddenClass)
      ) {
        search.classList.add(params.activeClass);
      }
    });

    closeBtn.addEventListener("click", function () {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    });

    document.body.addEventListener("click", function (evt) {
      if (!evt._isSearch && search._isOpened) {
        openBtn.disabled = false;
        search.classList.add(params.hiddenClass);
      }
    });
  }

  setSearch({
    openBtnClass: "js-open-search", // класс кнопки открытия
    closeBtnClass: "js-close", // класс кнопки закрытия
    searchClass: "js-form", // класс формы поиска
    activeClass: "is-opened", // класс открытого состояния
    hiddenClass: "is-closed", // класс закрывающегося состояния (удаляется сразу после закрытия)
  });

  const HeroSwiper = new Swiper(".swiper", {
    // Optional parameters
    loop: true,

    // If we need pagination
    pagination: {
      el: ".swiper-pagination",
      bulletActiveClass: "swiper-pagination-bullet-active",
      clickable: true,
    },

    // And if we need scrollbar
    scrollbar: {
      el: ".swiper-scrollbar",
    },
  });

  const params = {
    btnClassNameOne: "js-header-dropdown-btn",
    dropClassName: "js-header-drop",
    activeClassName: "is-active",
    disabledClassName: "is-disabled",
  };

  function onDisable(evt) {
    if (evt.target.classList.contains(params.disabledClassName)) {
      evt.target.classList.remove(
        params.disabledClassName,
        params.activeClassName
      );
      evt.target.removeEventListener("animationend", onDisable);
    }
  }

  function setMenuListener() {
    document.body.addEventListener("click", (evt) => {
      const activeElements = document.querySelectorAll(
        `.${params.activeClassName}`
      );

      if (
        activeElements.length &&
        !evt.target.closest(`.${params.activeClassName}`)
      ) {
        activeElements.forEach((current) => {
          if (current.classList.contains(params.btnClassNameOne)) {
            current.classList.remove(params.activeClassName);
          } else {
            current.classList.add(params.disabledClassName);
          }
        });
      }

      if (evt.target.closest(`.${params.btnClassNameOne}`)) {
        const btn = evt.target.closest(`.${params.btnClassNameOne}`);
        const path = btn.dataset.path;
        const drop = document.querySelector(
          `.${params.dropClassName}[data-target="${path}"]`
        );

        btn.classList.toggle(params.activeClassName);

        if (!drop.classList.contains(params.activeClassName)) {
          drop.classList.add(params.activeClassName);
          drop.addEventListener("animationend", onDisable);
        } else {
          drop.classList.add(params.disabledClassName);
        }
      }
    });
  }

  let gallerySlider = new Swiper(".gallery__slides-container", {
    slidesPerView: 1,
    grid: {
      rows: 1,
      fill: "row",
    },
    spaceBetween: 20,

    pagination: {
      el: ".gallery-section .gallery__pagination",
      type: "fraction",
    },

    navigation: {
      nextEl: ".gallery__next",
      prevEl: ".gallery__prev",
    },

    breakpoints: {
      320: {
        slidesPerView: 1,
        grid: {
          rows: 1,
        },
        spaceBetween: 30,
      },

      420: {
        slidesPerView: 2,
        grid: {
          rows: 2,
        },
        spaceBetween: 30,
      },

      1200: {
        slidesPerView: 3,
        grid: {
          rows: 2,
        },
        spaceBetween: 50,
      },
    },

    a11y: false,
    keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
    watchSlidesProgress: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
    },

    // on: {
    //   /* исправляет баг с margin-top остающимся при смене брейкпоинта, это было нужно в 6-й версии свайпера */
    //   beforeResize: function () {
    //     this.slides.forEach((el) => {
    //       el.style.marginTop = "";
    //     });
    //   }
    // }
  });

  (() => {
    const btns = document.querySelectorAll(".gallery__slide-modal-btn");
    const galleryOverlay = document.querySelector(".gallery__overlay");
    const modals = document.querySelectorAll(".gallery__modal");
    const body = document.body;

    btns.forEach((el) => {
      el.addEventListener("click", (e) => {
        let path = e.currentTarget.getAttribute("data-active");

        modals.forEach((el) => {
          el.classList.remove("gallery__modal-visible");
          body.classList.add("gallery__modal-disable-scroll")
        });

        document
          .querySelector(`[data-gallery="${path}"]`)
          .classList.add("gallery__modal-visible");
          galleryOverlay.classList.add("gallery__overlay-visible");
      });
    });

    document
      .querySelectorAll(".gallery__modal-btn")
      .forEach(function (galleryModalBtn) {
        galleryModalBtn.addEventListener("click", function () {
          document
            .querySelectorAll(".gallery__overlay")
            .forEach(function (galleryOverlay) {
              galleryOverlay.classList.remove("gallery__overlay-visible");
              body.classList.remove("gallery__modal-disable-scroll")
            });
          document
            .querySelectorAll(".gallery__overlay")
            .forEach(function (galleryOverlay) {
              galleryOverlay.classList.remove("gallery__modal-visible");
            });
        });
      });

    galleryOverlay.addEventListener("click", (e) => {
      console.log(e.target);

      if (e.target == galleryOverlay) {
        galleryOverlay.classList.remove("gallery__overlay-visible");

        modals.forEach((el) => {
          el.classList.remove("gallery__modal-visible");
        });
      }
    });
  })();
  
const MOBILE_WIDTH = 850;

function getWindowWidth () {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.body.clientWidth,
    document.documentElement.clientWidth
  );
}

function scrollToContent (link, isMobile) {
	if (isMobile && getWindowWidth() > MOBILE_WIDTH) {
		return;
	}

  const href = link.getAttribute('href').substring(1);
  const scrollTarget = document.getElementById(href);
  const elementPosition = scrollTarget.getBoundingClientRect().top;

  window.scrollBy({
      top: elementPosition,
      behavior: 'smooth'
  });
}

document.querySelectorAll('.js-scroll-link').forEach(link => {
  link.addEventListener('click', function(e) {
      e.preventDefault();

      scrollToContent(this, true);
  });
});

  $(".js-accordion").accordion({
    collapsible: true,
    icons: false,
    heightStyle: "content",
  });

  document
    .querySelectorAll(".catalog__tabs-btn")
    .forEach(function (catalogTabsBtn) {
      catalogTabsBtn.addEventListener("click", function (event) {
        const path = event.currentTarget.dataset.path;

        document
          .querySelectorAll(".catalog__bottom-left")
          .forEach(function (catalogBottomLeft) {
            catalogBottomLeft.classList.remove("catalog__bottom-left-active");
          });

        document
          .querySelector(`[data-target="${path}"]`)
          .classList.add("catalog__bottom-left-active");
      });
    });

  document
    .querySelectorAll(".catalog__tabs-text")
    .forEach(function (catalogTabsText) {
      catalogTabsText.addEventListener("click", function () {
        document
          .querySelectorAll(".catalog__tabs-text")
          .forEach(function (catalogTabsText) {
            catalogTabsText.classList.remove("catalog__tabs-text-active");
          });
        catalogTabsText.classList.toggle("catalog__tabs-text-active");
      });
    });

  (() => {
    const MOBILE_WIDTH = 600;
    const DESKTOP_WIDTH = 1001;
    const btn = document.querySelector(".developments__btn");

    const sliderMobileParams = {
      paginationClassName: "events-pagination",
      cardsContainerName: "js-slider",
      cardsWrapName: "js-slides-wrap",
      card: "developments__slide",
      hiddenClass: "is-hidden",
    };

    function getWindowWidth() {
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
      );
    }

    function activateMobileSlider(params) {
      const pagination = document.createElement("div");
      pagination.classList.add(params.paginationClassName);
      params.cardsContainer.append(pagination);

      params.cardsContainer.classList.add("swiper-container");
      params.cardsWrap.classList.add("swiper-wrapper");

      params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
        slidesPerView: 1,
        spaceBetween: 20,
        pagination: {
          el: `.${params.cardsContainerName} .${params.paginationClassName}`,
        },

        on: {
          beforeInit() {
            document.querySelectorAll(`.${params.card}`).forEach((el) => {
              el.classList.add("swiper-slide");
            });
          },

          beforeDestroy() {
            this.slides.forEach((el) => {
              el.classList.remove("swiper-slide");
              el.removeAttribute("role");
              el.removeAttribute("aria-label");
            });

            this.pagination.el.remove();
          },
        },
      });
    }

    function destroyMobileSlider(params) {
      params.cardsSlider.destroy();
      params.cardsContainer.classList.remove("swiper-container");
      params.cardsWrap.classList.remove("swiper-wrapper");
      params.cardsWrap.removeAttribute("aria-live");
      params.cardsWrap.removeAttribute("id");
    }

    function setHiddenCards(params, windowWidth) {
      const cards = document.querySelectorAll(`.${params.card}`);
      let quantity = cards.length;

      if (windowWidth > MOBILE_WIDTH && windowWidth < DESKTOP_WIDTH) {
        quantity = 2;
      }

      if (windowWidth >= DESKTOP_WIDTH) {
        quantity = 3;
      }

      cards.forEach((card, i) => {
        card.classList.remove(params.hiddenClass);
        if (i >= quantity) {
          card.classList.add(params.hiddenClass);
        }
      });
    }

    function showCards(e) {
      const cards = document.querySelectorAll(`.${sliderMobileParams.card}`);

      e.target.style = "display: none";

      cards.forEach((card) => {
        card.classList.remove(sliderMobileParams.hiddenClass);
      });
    }

    function checkWindowWidthMobile(params) {
      const currentWidth = getWindowWidth();
      btn.style = "";
      params.cardsContainer = document.querySelector(
        `.${params.cardsContainerName}`
      );
      params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

      if (
        currentWidth <= MOBILE_WIDTH &&
        (!params.cardsSlider || params.cardsSlider.destroyed)
      ) {
        activateMobileSlider(params);
      } else if (currentWidth > MOBILE_WIDTH && params.cardsSlider) {
        destroyMobileSlider(params);
      }

      setHiddenCards(params, currentWidth);
    }

    checkWindowWidthMobile(sliderMobileParams);
    btn.addEventListener("click", showCards);

    window.addEventListener("resize", function () {
      checkWindowWidthMobile(sliderMobileParams);
    });
  })();

  (() => {
    const checkBtn = document.querySelector(".js-heading");

    checkBtn.addEventListener("click", function () {
      this.classList.toggle("is-active");
    });
  })();

  (() => {
    const MOBILE_WIDTH_TWO = 600;

    const sliderParamsNotMobile = {
      sliderWrap: "js-editions-slider-main",
      cardsContainerName: "js-editions-slider",
      cardsWrapName: "js-editions-slides-wrap",
      card: "editions__slide",
      paginationClassName: "editions__pagination",
      navClassName: "editions__navigation",
      navBtnClassName: "editions__btn",
      navPrev: "editions__prev",
      navNext: "editions__next",
    };

    function getWindowWidth() {
      console.log(document.body.scrollWidth);
      return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.body.clientWidth,
        document.documentElement.clientWidth
      );
    }

    function activateSlider(params) {
      const navigation = document.createElement("div");
      const pagination = document.createElement("div");
      const navBtnPrev = document.createElement("button");
      const navBtnNext = document.createElement("button");

      navigation.classList.add(params.navClassName);

      navBtnPrev.classList.add(params.navBtnClassName);
      navBtnPrev.classList.add(params.navPrev);
      navigation.prepend(navBtnPrev);

      pagination.classList.add(params.paginationClassName);
      navigation.append(pagination);

      navBtnNext.classList.add(params.navBtnClassName);
      navBtnNext.classList.add(params.navNext);
      navigation.append(navBtnNext);

      params.sliderWrapElem.prepend(navigation);

      params.cardsContainer.classList.add("swiper-container");
      params.cardsWrap.classList.add("swiper-wrapper");

      params.cardsSlider = new Swiper(`.${params.cardsContainerName}`, {
        slidesPerView: 3,
        spaceBetween: 42,

        pagination: {
          el: `.${params.sliderWrap} .${params.paginationClassName}`,
          type: "fraction",
        },

        navigation: {
          nextEl: `.${params.navNext}`,
          prevEl: `.${params.navPrev}`,
        },

        breakpoints: {
          600: {
            slidesPerView: 2,
            spaceBetween: 34,
          },

          780: {
            slidesPerView: 2,
            spaceBetween: 49,
          },

          1200: {
            slidesPerView: 3,
            spaceBetween: 42,
          },
        },

        a11y: false,
        keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

        // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми
        watchSlidesProgress: true,
        slideVisibleClass: "slide-visible",

        on: {
          init: function () {
            this.slides.forEach((slide) => {
              if (!slide.classList.contains("slide-visible")) {
                slide.tabIndex = "-1";
              } else {
                slide.tabIndex = "";
              }
            });
          },
          slideChange: function () {
            this.slides.forEach((slide) => {
              if (!slide.classList.contains("slide-visible")) {
                slide.tabIndex = "-1";
              } else {
                slide.tabIndex = "";
              }
            });
          },
        },

        on: {
          beforeInit() {
            document.querySelectorAll(`.${params.card}`).forEach((el) => {
              el.classList.add("swiper-slide");
            });
          },

          beforeDestroy() {
            this.slides.forEach((el) => {
              el.classList.remove("swiper-slide");
              el.removeAttribute("role");
              el.removeAttribute("aria-label");
            });

            this.pagination.el.remove();
            navigation.remove();
          },
        },
      });
    }

    function destroySlider(params) {
      params.cardsSlider.destroy();
      params.cardsContainer.classList.remove("swiper-container");
      params.cardsWrap.classList.remove("swiper-wrapper");
      params.cardsWrap.removeAttribute("aria-live");
      params.cardsWrap.removeAttribute("id");
    }

    function checkWindowWidth(params) {
      const currentWidth = getWindowWidth();
      params.sliderWrapElem = document.querySelector(`.${params.sliderWrap}`);
      params.cardsContainer = document.querySelector(
        `.${params.cardsContainerName}`
      );
      params.cardsWrap = document.querySelector(`.${params.cardsWrapName}`);

      if (
        currentWidth > MOBILE_WIDTH_TWO &&
        (!params.cardsSlider || params.cardsSlider.destroyed)
      ) {
        activateSlider(params);
      } else if (currentWidth <= MOBILE_WIDTH_TWO && params.cardsSlider) {
        destroySlider(params);
      }
    }

    checkWindowWidth(sliderParamsNotMobile);

    window.addEventListener("resize", function () {
      checkWindowWidth(sliderParamsNotMobile);
    });
  })();

  setMenuListener();
  let projectSlider = new Swiper(".slides-container", {
    slidesPerView: 3,
    spaceBetween: 48,

    navigation: {
      nextEl: ".project-next",
      prevEl: ".project-prev",
    },

    breakpoints: {
      300: {
        slidesPerView: 1,
        spaceBetween: 36,
      },

      601: {
        slidesPerView: 2,
        spaceBetween: 36,
      },

      800: {
        slidesPerView: 2,
        spaceBetween: 50,
      },

      1361: {
        slidesPerView: 3,
        spaceBetween: 53,
      },
    },

    a11y: false,
    keyboard: true, // можно управлять с клавиатуры стрелками влево/вправо

    // Дальнейшие надстройки делают слайды вне области видимости не фокусируемыми

    watchSlidesProgress: true,
    slideVisibleClass: "slide-visible",

    on: {
      init: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
      slideChange: function () {
        this.slides.forEach((slide) => {
          if (!slide.classList.contains("slide-visible")) {
            slide.tabIndex = "-1";
          } else {
            slide.tabIndex = "";
          }
        });
      },
    },

    // on: {
    //   /* исправляет баг с margin-top остающимся при смене брейкпоинта, это было нужно в 6-й версии свайпера */
    //   beforeResize: function () {
    //     this.slides.forEach((el) => {
    //       el.style.marginTop = "";
    //     });
    //   }
    // }
  });

  var selector = document.querySelector("input[type='tel']");
  var im = new Inputmask("+7 (999)-999-99-99");

  im.mask(selector);

  new JustValidate(".contacts__form", {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30,
        customRegexp: /^[a-zA-Z\s]*$/,
      },
      tel: {
        required: true,
        function: (name, value) => {
          const phone = selector.inputmask.unmaskedvalue();
          return Number(phone) && phone.length === 10;
        },
      },
    },
    messages: {
      name: "Недопустимый формат",
      tel: "Укажите ваш телефон",
    },

    colorWrong: "#D11616",
  });

  ymaps.ready(init);

  function init() {
    var myMap1 = new ymaps.Map(
      "contact__map1",
      {
        center: [55.76041845025553, 37.637142866683856],
        zoom: 14.3,
        controls: ["geolocationControl", "zoomControl"],
      },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition: { top: "200px", right: "20px" },
        geolocationControlFloat: "none",
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "120px", right: "20px" },
      }
    );

    var myMap2 = new ymaps.Map(
      "contact__map2",
      {
        center: [55.760005443155314, 37.61620242867861],
        zoom: 14,
        controls: ["geolocationControl", "zoomControl"],
      },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition: { top: "200px", right: "20px" },
        geolocationControlFloat: "none",
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "120px", right: "20px" },
      }
    );

    var myMap3 = new ymaps.Map(
      "contact__map3",
      {
        center: [55.759999443155314, 37.60970242867861],
        zoom: 14,
        controls: ["geolocationControl", "zoomControl"],
      },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition: { top: "200px", right: "20px" },
        geolocationControlFloat: "none",
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "120px", right: "20px" },
      }
    );

    var myMap4 = new ymaps.Map(
      "contact__map4",
      {
        center: [55.759999443155314, 37.60970242867861],
        zoom: 14,
        controls: ["geolocationControl", "zoomControl"],
      },
      {
        suppressMapOpenBlock: true,
        geolocationControlSize: "large",
        geolocationControlPosition: { top: "200px", right: "20px" },
        geolocationControlFloat: "none",
        zoomControlSize: "small",
        zoomControlFloat: "none",
        zoomControlPosition: { top: "120px", right: "20px" },
      }
    );

    var myPlacemark1 = new ymaps.Placemark(
      [55.75846806898367, 37.60108849999989],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "img/EllipseMap.svg",
        iconImageSize: [20, 20],
        iconImageOffset: [-10, -10],
      }
    );

    var myPlacemark2 = new ymaps.Placemark(
      [55.75846806898367, 37.60108849999989],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "img/EllipseMap.svg",
        iconImageSize: [20, 20],
        iconImageOffset: [-20, 0],
      }
    );

    var myPlacemark3 = new ymaps.Placemark(
      [55.75846806898367, 37.60108849999989],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "img/EllipseMap.svg",
        iconImageSize: [20, 20],
        iconImageOffset: [-12, 0],
      }
    );

    var myPlacemark4 = new ymaps.Placemark(
      [55.75846806898367, 37.60108849999989],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "img/EllipseMap.svg",
        iconImageSize: [20, 20],
        iconImageOffset: [-12, 0],
      }
    );

    myMap1.behaviors.disable('scrollZoom');
    myMap2.behaviors.disable('scrollZoom');
    myMap3.behaviors.disable('scrollZoom');
    myMap4.behaviors.disable('scrollZoom');

    myMap1.geoObjects.add(myPlacemark1);
    myMap2.geoObjects.add(myPlacemark2);
    myMap3.geoObjects.add(myPlacemark3);
    myMap4.geoObjects.add(myPlacemark4);
  }

  tippy(".js-tooltipe", {
    theme: "purple",
    trigger: "click",
    moveTransition: "transform 0.2s ease-out",
    offset: [-1, 13],
    maxWidth: 264,
  });

  const element = document.querySelector(".js-gallery-choices");
  const choices = new Choices(element, {
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: "",
    position: "bottom",

    classNames: {
      containerOuter: "filter-choises gallery__choices",
      containerInner: "filter-choises__inner",
      input: "filter-choises__input",
      inputCloned: "filter-choises__input--cloned",
      list: "filter-choises__list",
      listItems: "filter-choises__list--multiple",
      listSingle: "filter-choises__list--single",
      listDropdown: "filter-choises__list--dropdown",
      item: "filter-choises__item",
      itemSelectable: "filter-choises__item--selectable",
      itemDisabled: "filter-choises__item--disabled",
      itemChoice: "filter-choises__item--choice",
      placeholder: "filter-choises__placeholder",
      group: "filter-choises__group",
      groupHeading: "filter-choises__heading",
      button: "filter-choises__button",
      activeState: "is-active",
      focusState: "is-focused",
      openState: "is-open",
      disabledState: "is-disabled",
      highlightedState: "is-highlighted",
      selectedState: "is-selected",
      flippedState: "is-flipped",
      loadingState: "is-loading",
      noResults: "has-no-results",
      noChoices: "has-no-choices",
    },
  });
});

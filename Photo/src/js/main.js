document.addEventListener('DOMContentLoaded', function () {

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

    search.addEventListener('click', function(evt) {
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

    closeBtn.addEventListener('click', function () {
      openBtn.disabled = false;
      search.classList.add(params.hiddenClass);
    });

    document.body.addEventListener('click', function (evt) {
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
    hiddenClass: "is-closed" // класс закрывающегося состояния (удаляется сразу после закрытия)
  });

  const menu = document.querySelector('#menu')
  const burger = document.querySelector('#burger')
  const close = document.querySelector('#close')

  document.querySelector('#burger').addEventListener('click', function () {
    menu.classList.toggle('header__nav-is-active')    
    close.classList.toggle('header__nav-close-btn-active')

    document.querySelector('#close').addEventListener('click', function () {
      menu.classList.remove('header__nav-is-active')      
    });
  });

  ymaps.ready(init);

  function init() {
    var myMap = new ymaps.Map(
      "map",
      {
        center: [55.761019096607306,37.60957253429574],
        zoom: 13.5,
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
      "map2",
      {
        center: [55.761019096607306,37.60957253429574],
        zoom: 13.5,
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
      "map3",
      {
        center: [55.761019096607306,37.61957253429574],
        zoom: 13.5,
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

    var myPlacemark = new ymaps.Placemark(
      [55.76983456898229,37.63358549999998],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "/src/images/svg/Placemark.svg",
        iconImageSize: [12, 12],
        iconImageOffset: [-10, -10],
        iconColor: "#FF6E30"
      }
    );

    var myPlacemark2 = new ymaps.Placemark(
      [55.76983456898229,37.62808549999998],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "/src/images/svg/Placemark.svg",
        iconImageSize: [12, 12],
        iconImageOffset: [-10, -10],
        iconColor: "#FF6E30"
      }
    );

    var myPlacemark3 = new ymaps.Placemark(
      [55.76983456898229,37.62808549999998],
      {},
      {
        iconLayout: "default#image",
        iconImageHref: "/src/images/svg/Placemark.svg",
        iconImageSize: [12, 12],
        iconImageOffset: [-10, -10],
        iconColor: "#FF6E30"
      }
    );

    myMap.behaviors.disable('scrollZoom');
    myMap2.behaviors.disable('scrollZoom');
    myMap3.behaviors.disable('scrollZoom');

    myMap.geoObjects.add(myPlacemark);
    myMap2.geoObjects.add(myPlacemark2);
    myMap3.geoObjects.add(myPlacemark3);
  }

  const closeBtn = document.querySelector('#close-btn')
  const information = document.querySelector('#information')

  document.querySelector('#close-btn').addEventListener('click', function () {
    information.classList.toggle('contacts__left-information-close')
  });

  new JustValidate(".contacts__right-form", {
    rules: {
      name: {
        required: true,
        minLength: 2,
        maxLength: 30,
        customRegexp: /^[a-zA-Z\s]*$/,
      },

      mail: {
        required: true,
        email: true
      },
    },
    messages: {
      name: "Недопустимый формат",
      mail: "Недопустимый формат",
    },

    colorWrong: "#D11616",
  });

  new JustValidate(".studio__right-form", {
    rules: {
      mail: {
        required: true,
        email: true
      },
    },
    messages: {
      mail: "Недопустимый формат",
    },
  });
});

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

//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbImRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ0RPTUNvbnRlbnRMb2FkZWQnLCBmdW5jdGlvbiAoKSB7XG5cbiAgZnVuY3Rpb24gc2V0U2VhcmNoKHBhcmFtcykge1xuICAgIGNvbnN0IG9wZW5CdG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuJHtwYXJhbXMub3BlbkJ0bkNsYXNzfWApO1xuICAgIGNvbnN0IHNlYXJjaCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC4ke3BhcmFtcy5zZWFyY2hDbGFzc31gKTtcbiAgICBjb25zdCBjbG9zZUJ0biA9IHNlYXJjaC5xdWVyeVNlbGVjdG9yKGAuJHtwYXJhbXMuY2xvc2VCdG5DbGFzc31gKTtcblxuICAgIHNlYXJjaC5hZGRFdmVudExpc3RlbmVyKFwiYW5pbWF0aW9uZW5kXCIsIGZ1bmN0aW9uIChldnQpIHtcbiAgICAgIGlmICh0aGlzLl9pc09wZW5lZCkge1xuICAgICAgICB0aGlzLmNsYXNzTGlzdC5yZW1vdmUocGFyYW1zLmFjdGl2ZUNsYXNzKTtcbiAgICAgICAgdGhpcy5jbGFzc0xpc3QucmVtb3ZlKHBhcmFtcy5oaWRkZW5DbGFzcyk7XG4gICAgICAgIHRoaXMuX2lzT3BlbmVkID0gZmFsc2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLl9pc09wZW5lZCA9IHRydWU7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBzZWFyY2guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldnQpIHtcbiAgICAgIGV2dC5faXNTZWFyY2ggPSB0cnVlO1xuICAgIH0pO1xuXG4gICAgb3BlbkJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24gKGV2dCkge1xuICAgICAgdGhpcy5kaXNhYmxlZCA9IHRydWU7XG5cbiAgICAgIGlmIChcbiAgICAgICAgIXNlYXJjaC5jbGFzc0xpc3QuY29udGFpbnMocGFyYW1zLmFjdGl2ZUNsYXNzKSAmJlxuICAgICAgICAhc2VhcmNoLmNsYXNzTGlzdC5jb250YWlucyhwYXJhbXMuaGlkZGVuQ2xhc3MpXG4gICAgICApIHtcbiAgICAgICAgc2VhcmNoLmNsYXNzTGlzdC5hZGQocGFyYW1zLmFjdGl2ZUNsYXNzKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNsb3NlQnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgb3BlbkJ0bi5kaXNhYmxlZCA9IGZhbHNlO1xuICAgICAgc2VhcmNoLmNsYXNzTGlzdC5hZGQocGFyYW1zLmhpZGRlbkNsYXNzKTtcbiAgICB9KTtcblxuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoZXZ0KSB7XG4gICAgICBpZiAoIWV2dC5faXNTZWFyY2ggJiYgc2VhcmNoLl9pc09wZW5lZCkge1xuICAgICAgICBvcGVuQnRuLmRpc2FibGVkID0gZmFsc2U7XG4gICAgICAgIHNlYXJjaC5jbGFzc0xpc3QuYWRkKHBhcmFtcy5oaWRkZW5DbGFzcyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBzZXRTZWFyY2goe1xuICAgIG9wZW5CdG5DbGFzczogXCJqcy1vcGVuLXNlYXJjaFwiLCAvLyDQutC70LDRgdGBINC60L3QvtC/0LrQuCDQvtGC0LrRgNGL0YLQuNGPXG4gICAgY2xvc2VCdG5DbGFzczogXCJqcy1jbG9zZVwiLCAvLyDQutC70LDRgdGBINC60L3QvtC/0LrQuCDQt9Cw0LrRgNGL0YLQuNGPXG4gICAgc2VhcmNoQ2xhc3M6IFwianMtZm9ybVwiLCAvLyDQutC70LDRgdGBINGE0L7RgNC80Ysg0L/QvtC40YHQutCwXG4gICAgYWN0aXZlQ2xhc3M6IFwiaXMtb3BlbmVkXCIsIC8vINC60LvQsNGB0YEg0L7RgtC60YDRi9GC0L7Qs9C+INGB0L7RgdGC0L7Rj9C90LjRj1xuICAgIGhpZGRlbkNsYXNzOiBcImlzLWNsb3NlZFwiIC8vINC60LvQsNGB0YEg0LfQsNC60YDRi9Cy0LDRjtGJ0LXQs9C+0YHRjyDRgdC+0YHRgtC+0Y/QvdC40Y8gKNGD0LTQsNC70Y/QtdGC0YHRjyDRgdGA0LDQt9GDINC/0L7RgdC70LUg0LfQsNC60YDRi9GC0LjRjylcbiAgfSk7XG5cbiAgY29uc3QgbWVudSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtZW51JylcbiAgY29uc3QgYnVyZ2VyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2J1cmdlcicpXG4gIGNvbnN0IGNsb3NlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlJylcblxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjYnVyZ2VyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgbWVudS5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX25hdi1pcy1hY3RpdmUnKSAgICBcbiAgICBjbG9zZS5jbGFzc0xpc3QudG9nZ2xlKCdoZWFkZXJfX25hdi1jbG9zZS1idG4tYWN0aXZlJylcblxuICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZScpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgbWVudS5jbGFzc0xpc3QucmVtb3ZlKCdoZWFkZXJfX25hdi1pcy1hY3RpdmUnKSAgICAgIFxuICAgIH0pO1xuICB9KTtcblxuICB5bWFwcy5yZWFkeShpbml0KTtcblxuICBmdW5jdGlvbiBpbml0KCkge1xuICAgIHZhciBteU1hcCA9IG5ldyB5bWFwcy5NYXAoXG4gICAgICBcIm1hcFwiLFxuICAgICAge1xuICAgICAgICBjZW50ZXI6IFs1NS43NjEwMTkwOTY2MDczMDYsMzcuNjA5NTcyNTM0Mjk1NzRdLFxuICAgICAgICB6b29tOiAxMy41LFxuICAgICAgICBjb250cm9sczogW1wiZ2VvbG9jYXRpb25Db250cm9sXCIsIFwiem9vbUNvbnRyb2xcIl0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBzdXBwcmVzc01hcE9wZW5CbG9jazogdHJ1ZSxcbiAgICAgICAgZ2VvbG9jYXRpb25Db250cm9sU2l6ZTogXCJsYXJnZVwiLFxuICAgICAgICBnZW9sb2NhdGlvbkNvbnRyb2xQb3NpdGlvbjogeyB0b3A6IFwiMjAwcHhcIiwgcmlnaHQ6IFwiMjBweFwiIH0sXG4gICAgICAgIGdlb2xvY2F0aW9uQ29udHJvbEZsb2F0OiBcIm5vbmVcIixcbiAgICAgICAgem9vbUNvbnRyb2xTaXplOiBcInNtYWxsXCIsXG4gICAgICAgIHpvb21Db250cm9sRmxvYXQ6IFwibm9uZVwiLFxuICAgICAgICB6b29tQ29udHJvbFBvc2l0aW9uOiB7IHRvcDogXCIxMjBweFwiLCByaWdodDogXCIyMHB4XCIgfSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgdmFyIG15TWFwMiA9IG5ldyB5bWFwcy5NYXAoXG4gICAgICBcIm1hcDJcIixcbiAgICAgIHtcbiAgICAgICAgY2VudGVyOiBbNTUuNzYxMDE5MDk2NjA3MzA2LDM3LjYwOTU3MjUzNDI5NTc0XSxcbiAgICAgICAgem9vbTogMTMuNSxcbiAgICAgICAgY29udHJvbHM6IFtcImdlb2xvY2F0aW9uQ29udHJvbFwiLCBcInpvb21Db250cm9sXCJdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgc3VwcHJlc3NNYXBPcGVuQmxvY2s6IHRydWUsXG4gICAgICAgIGdlb2xvY2F0aW9uQ29udHJvbFNpemU6IFwibGFyZ2VcIixcbiAgICAgICAgZ2VvbG9jYXRpb25Db250cm9sUG9zaXRpb246IHsgdG9wOiBcIjIwMHB4XCIsIHJpZ2h0OiBcIjIwcHhcIiB9LFxuICAgICAgICBnZW9sb2NhdGlvbkNvbnRyb2xGbG9hdDogXCJub25lXCIsXG4gICAgICAgIHpvb21Db250cm9sU2l6ZTogXCJzbWFsbFwiLFxuICAgICAgICB6b29tQ29udHJvbEZsb2F0OiBcIm5vbmVcIixcbiAgICAgICAgem9vbUNvbnRyb2xQb3NpdGlvbjogeyB0b3A6IFwiMTIwcHhcIiwgcmlnaHQ6IFwiMjBweFwiIH0sXG4gICAgICB9XG4gICAgKTtcblxuICAgIHZhciBteU1hcDMgPSBuZXcgeW1hcHMuTWFwKFxuICAgICAgXCJtYXAzXCIsXG4gICAgICB7XG4gICAgICAgIGNlbnRlcjogWzU1Ljc2MTAxOTA5NjYwNzMwNiwzNy42MTk1NzI1MzQyOTU3NF0sXG4gICAgICAgIHpvb206IDEzLjUsXG4gICAgICAgIGNvbnRyb2xzOiBbXCJnZW9sb2NhdGlvbkNvbnRyb2xcIiwgXCJ6b29tQ29udHJvbFwiXSxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHN1cHByZXNzTWFwT3BlbkJsb2NrOiB0cnVlLFxuICAgICAgICBnZW9sb2NhdGlvbkNvbnRyb2xTaXplOiBcImxhcmdlXCIsXG4gICAgICAgIGdlb2xvY2F0aW9uQ29udHJvbFBvc2l0aW9uOiB7IHRvcDogXCIyMDBweFwiLCByaWdodDogXCIyMHB4XCIgfSxcbiAgICAgICAgZ2VvbG9jYXRpb25Db250cm9sRmxvYXQ6IFwibm9uZVwiLFxuICAgICAgICB6b29tQ29udHJvbFNpemU6IFwic21hbGxcIixcbiAgICAgICAgem9vbUNvbnRyb2xGbG9hdDogXCJub25lXCIsXG4gICAgICAgIHpvb21Db250cm9sUG9zaXRpb246IHsgdG9wOiBcIjEyMHB4XCIsIHJpZ2h0OiBcIjIwcHhcIiB9LFxuICAgICAgfVxuICAgICk7XG5cbiAgICB2YXIgbXlQbGFjZW1hcmsgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFxuICAgICAgWzU1Ljc2OTgzNDU2ODk4MjI5LDM3LjYzMzU4NTQ5OTk5OTk4XSxcbiAgICAgIHt9LFxuICAgICAge1xuICAgICAgICBpY29uTGF5b3V0OiBcImRlZmF1bHQjaW1hZ2VcIixcbiAgICAgICAgaWNvbkltYWdlSHJlZjogXCIvc3JjL2ltYWdlcy9zdmcvUGxhY2VtYXJrLnN2Z1wiLFxuICAgICAgICBpY29uSW1hZ2VTaXplOiBbMTIsIDEyXSxcbiAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTEwLCAtMTBdLFxuICAgICAgICBpY29uQ29sb3I6IFwiI0ZGNkUzMFwiXG4gICAgICB9XG4gICAgKTtcblxuICAgIHZhciBteVBsYWNlbWFyazIgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFxuICAgICAgWzU1Ljc2OTgzNDU2ODk4MjI5LDM3LjYyODA4NTQ5OTk5OTk4XSxcbiAgICAgIHt9LFxuICAgICAge1xuICAgICAgICBpY29uTGF5b3V0OiBcImRlZmF1bHQjaW1hZ2VcIixcbiAgICAgICAgaWNvbkltYWdlSHJlZjogXCIvc3JjL2ltYWdlcy9zdmcvUGxhY2VtYXJrLnN2Z1wiLFxuICAgICAgICBpY29uSW1hZ2VTaXplOiBbMTIsIDEyXSxcbiAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTEwLCAtMTBdLFxuICAgICAgICBpY29uQ29sb3I6IFwiI0ZGNkUzMFwiXG4gICAgICB9XG4gICAgKTtcblxuICAgIHZhciBteVBsYWNlbWFyazMgPSBuZXcgeW1hcHMuUGxhY2VtYXJrKFxuICAgICAgWzU1Ljc2OTgzNDU2ODk4MjI5LDM3LjYyODA4NTQ5OTk5OTk4XSxcbiAgICAgIHt9LFxuICAgICAge1xuICAgICAgICBpY29uTGF5b3V0OiBcImRlZmF1bHQjaW1hZ2VcIixcbiAgICAgICAgaWNvbkltYWdlSHJlZjogXCIvc3JjL2ltYWdlcy9zdmcvUGxhY2VtYXJrLnN2Z1wiLFxuICAgICAgICBpY29uSW1hZ2VTaXplOiBbMTIsIDEyXSxcbiAgICAgICAgaWNvbkltYWdlT2Zmc2V0OiBbLTEwLCAtMTBdLFxuICAgICAgICBpY29uQ29sb3I6IFwiI0ZGNkUzMFwiXG4gICAgICB9XG4gICAgKTtcblxuICAgIG15TWFwLmJlaGF2aW9ycy5kaXNhYmxlKCdzY3JvbGxab29tJyk7XG4gICAgbXlNYXAyLmJlaGF2aW9ycy5kaXNhYmxlKCdzY3JvbGxab29tJyk7XG4gICAgbXlNYXAzLmJlaGF2aW9ycy5kaXNhYmxlKCdzY3JvbGxab29tJyk7XG5cbiAgICBteU1hcC5nZW9PYmplY3RzLmFkZChteVBsYWNlbWFyayk7XG4gICAgbXlNYXAyLmdlb09iamVjdHMuYWRkKG15UGxhY2VtYXJrMik7XG4gICAgbXlNYXAzLmdlb09iamVjdHMuYWRkKG15UGxhY2VtYXJrMyk7XG4gIH1cblxuICBjb25zdCBjbG9zZUJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNjbG9zZS1idG4nKVxuICBjb25zdCBpbmZvcm1hdGlvbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpbmZvcm1hdGlvbicpXG5cbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Nsb3NlLWJ0bicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGluZm9ybWF0aW9uLmNsYXNzTGlzdC50b2dnbGUoJ2NvbnRhY3RzX19sZWZ0LWluZm9ybWF0aW9uLWNsb3NlJylcbiAgfSk7XG5cbiAgbmV3IEp1c3RWYWxpZGF0ZShcIi5jb250YWN0c19fcmlnaHQtZm9ybVwiLCB7XG4gICAgcnVsZXM6IHtcbiAgICAgIG5hbWU6IHtcbiAgICAgICAgcmVxdWlyZWQ6IHRydWUsXG4gICAgICAgIG1pbkxlbmd0aDogMixcbiAgICAgICAgbWF4TGVuZ3RoOiAzMCxcbiAgICAgICAgY3VzdG9tUmVnZXhwOiAvXlthLXpBLVpcXHNdKiQvLFxuICAgICAgfSxcblxuICAgICAgbWFpbDoge1xuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgZW1haWw6IHRydWVcbiAgICAgIH0sXG4gICAgfSxcbiAgICBtZXNzYWdlczoge1xuICAgICAgbmFtZTogXCLQndC10LTQvtC/0YPRgdGC0LjQvNGL0Lkg0YTQvtGA0LzQsNGCXCIsXG4gICAgICBtYWlsOiBcItCd0LXQtNC+0L/Rg9GB0YLQuNC80YvQuSDRhNC+0YDQvNCw0YJcIixcbiAgICB9LFxuXG4gICAgY29sb3JXcm9uZzogXCIjRDExNjE2XCIsXG4gIH0pO1xuXG4gIG5ldyBKdXN0VmFsaWRhdGUoXCIuc3R1ZGlvX19yaWdodC1mb3JtXCIsIHtcbiAgICBydWxlczoge1xuICAgICAgbWFpbDoge1xuICAgICAgICByZXF1aXJlZDogdHJ1ZSxcbiAgICAgICAgZW1haWw6IHRydWVcbiAgICAgIH0sXG4gICAgfSxcbiAgICBtZXNzYWdlczoge1xuICAgICAgbWFpbDogXCLQndC10LTQvtC/0YPRgdGC0LjQvNGL0Lkg0YTQvtGA0LzQsNGCXCIsXG4gICAgfSxcbiAgfSk7XG59KTtcbiJdLCJmaWxlIjoibWFpbi5qcyJ9

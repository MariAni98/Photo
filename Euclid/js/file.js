document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.swiper', {
    // Optional parameters
    loop: true,


    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      bulletActiveClass: 'swiper-pagination-bullet-active',
      clickable: true,
    },


    // And if we need scrollbar
    scrollbar: {
      el: '.swiper-scrollbar',
    },
  });

  document.querySelectorAll('.tabs__btn').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path

      document.querySelectorAll('.tab-content').forEach(function(tabContent) {
        tabContent.classList.remove('tab-content-active')
      });
      document.querySelector(`[data-target="${path}"]`).classList.add('tab-content-active');
  });
});

  const menu = document.querySelector('#menu')
  const burger = document.querySelector('#burger')
  document.querySelector('#burger').addEventListener('click', function() {
    menu.classList.toggle('is-active')
    burger.classList.toggle('burger-is-active')

  });

  document.querySelectorAll('.header__btn').forEach(function(headerBtn) {
    headerBtn.addEventListener('click', function() {

      document.querySelectorAll('.header__input').forEach(function(headerInput) {
        headerInput.classList.add('header__input-is-active')

        document.querySelectorAll('.header__list').forEach(function(headerLlist) {
          headerLlist.classList.toggle('header__list-active')

          document.querySelectorAll('.header__btn').forEach(function(headerBtn) {
            headerBtn.classList.add('header__btn-two')

            document.querySelectorAll('.header__form-two').forEach(function(headerFormTwo) {
              headerFormTwo.classList.add('header__form-two-active')

              document.querySelectorAll('.button-one').forEach(function(buttonOne) {
                buttonOne.classList.add('button-one-active')
              });

              document.querySelectorAll('.header__cancel').forEach(function(headerCancel) {
                headerCancel.classList.add('header__cancel-active')

                document.querySelectorAll('.header__cancel-active').forEach(function(headerCancelActive) {
                  headerCancelActive.addEventListener('click', function() {

                    document.querySelectorAll('.header__form-two-active').forEach(function(headerFormTwoActive) {
                      headerFormTwoActive.classList.remove('header__form-two-active')

                        document.querySelectorAll('.header__btn').forEach(function(headerBtn) {
                          headerBtn.classList.remove('header__btn-two')

                          document.querySelectorAll('.header__list').forEach(function(headerLlist) {
                            headerLlist.classList.remove('header__list-active')
                        });
                      });
                     });
                  });
                });
              });
            });
          });
        });
      });
    });
  });



  document.querySelectorAll('.tabs__btn').forEach(function(tabsBtn) {
    tabsBtn.addEventListener('click', function() {

      document.querySelectorAll('.tabs__btn').forEach(function(tabsBtn) {
        tabsBtn.classList.remove('tabs__btn-active')
      });
       tabsBtn.classList.toggle('tabs__btn-active')
    });
  });
});




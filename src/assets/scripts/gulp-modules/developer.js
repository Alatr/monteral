new Swiper(document.querySelector('[data-swiper-projects]'), {



    // centeredSlides: true,
    slideToClickedSlide: true,
    slidesPerView: 4,
    loop: true,
    height: 100,
    speed: 3000,
    navigation: {
        nextEl: '.arrow-next',
        prevEl: '.arrow-prev',
    },
    breakpoints: {

        // when window width is >= 480px
        320: {
            slidesPerView: 1,
        },
        // when window width is >= 640px
        767: {
            slidesPerView: 3,
        },
        950: {
            slidesPerView: 4,
        }
    }
    // on: {
    //     init: function(self) {
    //         self.bigView = dqs('[data-swiper-current-img-view]');
    //         changeImgSrc(self.bigView, self.slides[self.activeIndex].getAttribute('src'));
    //         // self.bigView.src = self.slides[self.activeIndex].getAttribute('src');
    //     },
    // }
});
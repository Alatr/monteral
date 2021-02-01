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
    // on: {
    //     init: function(self) {
    //         self.bigView = dqs('[data-swiper-current-img-view]');
    //         changeImgSrc(self.bigView, self.slides[self.activeIndex].getAttribute('src'));
    //         // self.bigView.src = self.slides[self.activeIndex].getAttribute('src');
    //     },
    // }
});
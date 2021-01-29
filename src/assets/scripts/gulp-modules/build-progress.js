/**Кастомные селекты */
var selectors = document.querySelectorAll('.custom-select');
let event = new Event('change');
var buildProgressConfig = {
    action: 'construct',

};

selectors.forEach(el => {
    el.addEventListener('mouseenter', function(evt) {
        el.style.zIndex = 100;
    });
    el.addEventListener('mouseleave', function(evt) {
        el.style.zIndex = '';
    });
})

function changeCurrentValue(selector) {
    selector.currentValue = selector.querySelectorAll('.custom-select__item')[0].dataset.value;

    selector.querySelectorAll('.custom-select__item').forEach(select => {

        select.addEventListener('click', () => {
            selector.querySelectorAll('.custom-select__item').forEach(el => el.classList.remove('custom-select__item-current'))
            select.classList.add('custom-select__item-current');
            if (selector.currentValue !== select.dataset.value) {
                selector.currentValue = select.dataset.value;
                selector.dispatchEvent(event);

            }
            // console.log(selector.currentValue);
        })
    });
    selector.addEventListener('change', function(evt) {
        // console.log(evt);
        buildProgressConfig[evt.target.dataset.name] = evt.target.currentValue;
        // console.log(buildProgressConfig);
        fetch('static/val.php')
            .then((response) => response.json())
            .then((res => reInitSlider(buildSlider, res)))
    });
};

changeCurrentValue(selectors[0])
changeCurrentValue(selectors[1])



const buildPopup = new showModal({
    $popup: document.querySelector('.page-first-block'),
    $openBtn: document.querySelector('.page-part'),
    $closeBtn: document.querySelector('[data-build-popup-close]'),
    animationIn: animationPopapIn,
    animationOut: animationPopapOut,
    attrParrentNode: '[data-parrent-node-build]'
});


const swiper = new Swiper(dqs('[data-swiper-slider]'), {
    // Optional parameters

    slidesPerView: 'auto',
    freeMode: true,
    // init: false,
    spaceBetween: 30,
    centeredSlides: true,
    slideToClickedSlide: true,
    navigation: {
        nextEl: dqs('.arrow-next'),
        prevEl: dqs('.arrow-prev'),
    },
    on: {
        init: function(self) {
            self.bigView = dqs('[data-swiper-current-img-view]');
        },
    }

});

function dqs(selector) {
    return document.querySelector(selector);
}
swiper.on('init', () => {
    console.log('INIT');
})
swiper.on('slideChange', (evt) => {
    console.log(evt);
    console.log('-----------');
    console.log(swiper);

    let tl = gsap.timeline();

    tl.to(evt.bigView, { autoAlpha: 0, duration: 0.5 });
    tl.add(() => { evt.bigView.src = evt.slides[evt.activeIndex].getAttribute('src'); })
    tl.to(evt.bigView, { autoAlpha: 1, duration: 0.5 });



})
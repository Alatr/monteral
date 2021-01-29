/* eslint-disable no-undef */
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
        buildProgressConfig[evt.target.dataset.name] = evt.target.currentValue;
    });
}

changeCurrentValue(selectors[0])
changeCurrentValue(selectors[1])

/*  */
const galleries = document.querySelectorAll('[data-progress-gallery]');
const popupSliderConfig = {
    navImages: dqs('[data-swiper-slider]'),
    bigImage: dqs('[data-swiper-big-image]'),
    title: dqs('[data-popup-title]'),
    subtitle: ('[data-popup-subtitle]'),
    swiper: undefined,
    currentPopup: undefined,
}

initPopupSlider(galleries[0]);
galleries.forEach((galleryWithData, index) => {
    const buildPopup = new showModal({
        $popup: document.querySelector('[data-build-gallery-popup]'),
        $openBtn: galleryWithData,
        $closeBtn: document.querySelector('[data-build-popup-close]'),
        animationIn: animationPopapIn,
        animationOut: animationPopapOut,
        attrParrentNode: '[data-build-popup="' + galleryWithData.dataset.buildPopup + '"]',
        onOpenCompleteCallback: function() {
            initPopupSlider(galleryWithData);
            changeTextOnPopup(galleryWithData);
            popupSliderConfig.currentPopup = galleries[index];
            document.querySelector('[data-build-gallery-popup] [data-build-popup-close]').setAttribute('data-build-popup', galleryWithData.dataset.buildPopup);
        },

    });
})


dqs('[data-popup-prev-gallery]').addEventListener('click', function(evt) {
    let prevGallery = popupSliderConfig.currentPopup.previousElementSibling;
    if (prevGallery === null) return;
    initPopupSlider(prevGallery);
    changeTextOnPopup(prevGallery);
    popupSliderConfig.currentPopup = prevGallery;
    document.querySelector('[data-build-gallery-popup] [data-build-popup-close]').setAttribute('data-build-popup', prevGallery.dataset.buildPopup);
});
dqs('[data-popup-next-gallery]').addEventListener('click', function(evt) {
    let prevGallery = popupSliderConfig.currentPopup.nextElementSibling;
    if (prevGallery === null) return;
    initPopupSlider(prevGallery);
    changeTextOnPopup(prevGallery);
    popupSliderConfig.currentPopup = prevGallery;
    document.querySelector('[data-build-gallery-popup] [data-build-popup-close]').setAttribute('data-build-popup', prevGallery.dataset.buildPopup);
});





function changeTextOnPopup(data) {
    popupSliderConfig.title.textContent = data.dataset.month;
    popupSliderConfig.subtitle.textContent = data.dataset.year;

}

function initPopupSlider(param) {

    if (popupSliderConfig.swiper !== undefined) {
        popupSliderConfig.swiper.destroy(false, true);
        clearAndAddImagesForRefreshSlider(param.dataset.images, popupSliderConfig.navImages.children[0]);
        popupSliderConfig.swiper = undefined;
    }



    popupSliderConfig.swiper = new Swiper(popupSliderConfig.navImages, {
        slidesPerView: 'auto',
        freeMode: true,
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
                changeImgSrc(self.bigView, self.slides[self.activeIndex].getAttribute('src'));
                // self.bigView.src = self.slides[self.activeIndex].getAttribute('src');
            },
        }
    });
    popupSliderConfig.swiper.on('init', () => {})
    popupSliderConfig.swiper.on('slideChange', (evt) => {
        let direction = (evt.prevIndex < evt.activeIndex) ? 1 : -1;
        changeImgSrc(evt.bigView, evt.slides[evt.activeIndex].getAttribute('src'), direction);
        evt.prevIndex = evt.activeIndex;
    })

}

function changeImgSrc(image, src, direction = 1) {
    let tl = gsap.timeline();
    tl.fromTo(image, { autoAlpha: 1, x: 0 }, { autoAlpha: 0, x: 50 * direction, duration: 0.25 });
    tl.add(() => { image.src = src });
    tl.fromTo(image, { autoAlpha: 0, x: -50 * direction, duration: 0.5 }, { autoAlpha: 1, x: 0 });

}

function clearAndAddImagesForRefreshSlider(links, container) {
    container.innerHTML = '';
    let imagesToRender = links.split('~');
    imagesToRender.forEach(imageLink => {
        let newImage = document.createElement('img');
        newImage.setAttribute('src', imageLink);
        newImage.classList.add('swiper-slide');
        container.append(newImage);
    })
}


function dqs(selector) {
    return document.querySelector(selector);
}


/**СТрелка переключатель в зависимости от положения на єкране */

function sideSwitchArrow(jQuerySlider, arrow, container) {

    const mediumCordValue = document.documentElement.clientWidth / 2;
    const headBlockYCordValue = 300;
    const footerBlockYCordValue = document.documentElement.clientHeight * 0.8;

    container.style.cursor = 'none';
    arrow.style.cursor = 'none';
    arrow.style.zIndex = 10;

    arrow.__proto__.hide = function() {
        this.style.opacity = "0";
        container.style.cursor = 'auto';
        this.style.pointerEvents = 'none';
    };
    arrow.__proto__.show = function() {
        container.style.cursor = 'none';
        this.style.opacity = '1';
        this.style.pointerEvents = 'auto';
    };
    arrow.dataset.side = 'leftSide';



    container.addEventListener('mouseenter', function() {
        arrow.show();
        container.addEventListener('mousemove', desktopNavButtonHandler);
    });
    container.addEventListener('mouseleave', function() {
        arrow.hide();
        container.removeEventListener('mousemove', desktopNavButtonHandler);
    });

    if (document.documentElement.clientWidth < 769) {
        window.removeEventListener('mousemove', desktopNavButtonHandler);
        arrow.remove();
    }

    /**Записывает координаты обьекта, на котором нужно скрыть стрелку переключения слайдера */
    /** ms ---> main-screen */


    function desktopNavButtonHandler(evt) {
        arrow.style.position = "fixed";
        arrow.style.left = evt.clientX - 18 + "px";
        arrow.style.top = evt.clientY - 18 + "px";
        getCursorSide(evt.clientX);
        handleArrowVisibility(evt);
    }

    function handleArrowVisibility(evt) {
        console.log(footerBlockYCordValue);
        if (evt.clientY < headBlockYCordValue || evt.clientY > footerBlockYCordValue) {
            arrow.hide();
            return
        } else {
            arrow.show();
        }
    }

    function getCursorSide(x, y) {
        if (x < (mediumCordValue)) {
            arrow.classList.add('left-side');
            arrow.dataset.side = 'leftSide';
        } else {
            arrow.classList.remove("left-side");
            arrow.dataset.side = "rightSide";
        }
    }
    arrow.addEventListener("click", function(evt) {
        switchGallerySlide(arrow.dataset.side);
    });

    let navigate = {
        'leftSide': () => {
            document.querySelector('.build-gallery-popup__wrap-nav .arrow-prev').dispatchEvent(new Event('click'));
        },
        'rightSide': () => {

            console.log(document.querySelector('.build-gallery-popup__wrap-nav .arrow-prev'));
            document.querySelector('.build-gallery-popup__wrap-nav .arrow-next').dispatchEvent(new Event('click'));
        },
    };

    function switchGallerySlide(side) {
        navigate[side]();
    }

}
sideSwitchArrow(
        popupSliderConfig.swiper,
        dqs('[data-moving-mouse]'),
        dqs('[data-build-gallery-popup]'))
    /**СТрелка переключатель в зависимости от положения на єкране END */
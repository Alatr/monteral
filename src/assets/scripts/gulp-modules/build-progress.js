/* eslint-disable no-undef */

/**Кастомные селекты */
const selectors = document.querySelectorAll('.custom-select');
const event1 = new Event('change');
const buildProgressConfig = {
    year: document.querySelector('[data-build-filter-name="year"] .custom-select__item-current').dataset.value,
    month: 'null'
};
/*Галереи с фотографиями строительства  */
const galleries = document.querySelectorAll('[data-progress-gallery]');
galleries.forEach((el, index) => {
    el.validCount = 0;
    el.setAttribute('id', 'bild' + index);
});
/*Обект с параметрами слайдера в попапе и самого поп-апа  */
const POPUP_CONFIG = {
    navImages: dqs('[data-swiper-slider]'),
    bigImage: dqs('[data-swiper-big-image]'),
    title: dqs('[data-popup-title]'),
    subtitle: dqs('[data-popup-subtitle]'),
    swiper: undefined,
    currentPopup: undefined,
    filteredPopups: Array.from(galleries),

}
selectors.forEach(handleCustomSelect);

function handleCustomSelect(selector) {
    const listItems = selector.querySelectorAll('.custom-select__item');
    selector.currentValue = selector.querySelectorAll('.custom-select__item')[0].dataset.value;

    listItems.forEach(select => {
        select.addEventListener('click', () => {
            listItems.forEach(el => el.classList.remove('custom-select__item-current'))
            select.classList.add('custom-select__item-current');
            if (selector.currentValue !== select.dataset.value) {
                selector.currentValue = select.dataset.value;
                selector.style.pointerEvents = 'none';
                setTimeout(() => selector.style.pointerEvents = 'all', 1000);
                selector.dispatchEvent(event1);
            }
        })
    });
    selector.addEventListener('mouseenter', function(evt) {
        selector.style.zIndex = 100;
    });
    selector.addEventListener('mouseleave', function(evt) {
        selector.style.zIndex = '';
    });
    selector.addEventListener('change', function() {
        // buildProgressConfig[evt.target.dataset.name] = evt.target.currentValue;
    });
}






document.querySelectorAll('[data-build-filter-name]').forEach(el => {
    /**Первичная фильттрация(добавление первой галереи в попап)*/
    filterBuildGalleries(buildProgressConfig, el, galleries);
    el.addEventListener('change', () => {
        filterBuildGalleries(buildProgressConfig, el, galleries);
        POPUP_CONFIG.filteredPopups = dqsA('[data-is-viewed*="true"]')

    })
})


function filterBuildGalleries(objectWithValidFields, filterSelector, galleriesToFilter) {
    objectWithValidFields[filterSelector.dataset.buildFilterName] = filterSelector.currentValue;
    /**Проверка совпадения по полям */
    Object.keys(objectWithValidFields).forEach(filterValue => {
            galleries.forEach(sngGal => {
                if (objectWithValidFields[filterValue] == 'null' ||
                    sngGal.dataset[filterValue] == objectWithValidFields[filterValue]
                ) {
                    sngGal.validCount += 1;
                }
            })
        })
        /**Отрисовка после оопределения параметров */
    galleriesToFilter.forEach((gallery, index) => {
        if (gallery.validCount === Object.keys(objectWithValidFields).length) {
            gallery.style.display = 'flex';

            if (gallery.dataset.isViewed === 'false') {
                const entranceSpeed = 50 * (1 + (index * 0.5))
                const heightWithMargin = (gallery.getBoundingClientRect().height + parseInt(getComputedStyle(gallery).marginBottom));
                let tl = gsap.timeline({ timeScale: 10 });
                tl.set(gallery, { autoAlpha: 0, x: entranceSpeed })
                tl.fromTo(gallery, { autoAlpha: 0, x: entranceSpeed }, { autoAlpha: 1, x: 0, ease: Expo.easeOut });
                // tl.to(gallery, { marginTop: 0, ease: Expo.easeOut });
            }
            gallery.dataset.isViewed = 'true';

        } else {
            const heightWithMargin = (gallery.getBoundingClientRect().height + parseInt(getComputedStyle(gallery).marginBottom));
            let tl = gsap.timeline({ timeScale: 10 });
            tl.to(gallery, { autoAlpha: 0, x: 50, ease: Expo.easeOut });
            tl.to(gallery, { marginTop: heightWithMargin * -1, ease: Expo.easeOut })
            tl.set(gallery, { display: 'none', }, '+=0.1');
            tl.set(gallery, { marginTop: 0 });

            gallery.dataset.isViewed = 'false';

        }
        gallery.validCount = 0;
    })
    document.querySelector('#build-progress .page__content .page-part').scrollIntoView({behavior:'smooth'})
}


initPopupSlider(galleries[0]);

galleries.forEach((galleryWithData, index) => {
    /*const buildPopup = */
    new showModal({
        $popup: document.querySelector('[data-build-gallery-popup]'),
        $openBtn: galleryWithData,
        $closeBtn: document.querySelector('[data-build-popup-close]'),
        animationIn: animationPopapIn,
        animationOut: animationPopapOut,
        attrParrentNode: '[data-build-popup="' + galleryWithData.dataset.buildPopup + '"]',
        onOpenCompleteCallback: function() {
            initPopupSlider(galleryWithData);
            changeTextOnPopup(galleryWithData);
            POPUP_CONFIG.currentPopup = galleryWithData;
            document.querySelector('[data-build-gallery-popup] [data-build-popup-close]').setAttribute('data-build-popup', galleryWithData.dataset.buildPopup);
        },
    });
})

/**Предыдущий отчет */
dqs('[data-popup-prev-gallery]').addEventListener('click', function() {
    let prevGallery = POPUP_CONFIG.currentPopup.previousElementSibling;
    POPUP_CONFIG.filteredPopups.forEach((el, index) => {
        if (el.getAttribute('id') === POPUP_CONFIG.currentPopup.getAttribute('id')) {
            prevGallery = POPUP_CONFIG.filteredPopups[index - 1];
        }
    });

    if (prevGallery === null || prevGallery === undefined) return;
    initPopupSlider(prevGallery);
    changeTextOnPopup(prevGallery);
    POPUP_CONFIG.currentPopup = prevGallery;
    document.querySelector('[data-build-gallery-popup] [data-build-popup-close]').setAttribute('data-build-popup', prevGallery.dataset.buildPopup);
});
/**Следующий отчет */
dqs('[data-popup-next-gallery]').addEventListener('click', function() {
    let prevGallery = POPUP_CONFIG.currentPopup.nextElementSibling;
    POPUP_CONFIG.filteredPopups.forEach((el, index) => {
        if (el.getAttribute('id') === POPUP_CONFIG.currentPopup.getAttribute('id')) {
            prevGallery = POPUP_CONFIG.filteredPopups[index + 1];
        }
    });
    if (prevGallery === null || prevGallery === undefined) return;
    initPopupSlider(prevGallery);
    changeTextOnPopup(prevGallery);
    POPUP_CONFIG.currentPopup = prevGallery;
    document.querySelector('[data-build-gallery-popup] [data-build-popup-close]').setAttribute('data-build-popup', prevGallery.dataset.buildPopup);
});





function changeTextOnPopup(data) {
    POPUP_CONFIG.title.textContent = POPUP_CONFIG.title.innerHTML;
    POPUP_CONFIG.subtitle.textContent = data.dataset.year;

}

function initPopupSlider(param) {

    if (POPUP_CONFIG.swiper !== undefined) {
        POPUP_CONFIG.swiper.destroy(false, true);
        clearAndAddImagesForRefreshSlider(param.dataset.images, POPUP_CONFIG.navImages.children[0]);
        POPUP_CONFIG.swiper = undefined;
    }



    POPUP_CONFIG.swiper = new Swiper(POPUP_CONFIG.navImages, {
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
    POPUP_CONFIG.swiper.on('init', () => {})
    POPUP_CONFIG.swiper.on('slideChange', (evt) => {
        let direction = (evt.prevIndex < evt.activeIndex) ? 1 : -1;
        changeImgSrc(evt.bigView, evt.slides[evt.activeIndex].getAttribute('src'), direction);
        evt.prevIndex = evt.activeIndex;
    })

}

function changeImgSrc(image, src, direction = 1) {
    let tl = gsap.timeline();
    tl.fromTo(image, { autoAlpha: 1, x: 0 }, { autoAlpha: 0.3, x: 50 * direction, duration: 0.25, ease: Power3.easeIn });
    tl.add(() => { image.src = src });
    tl.fromTo(image, { autoAlpha: 0.3, x: -50 * direction, duration: 0.5 }, { autoAlpha: 1, x: 0, ease: Power3.easeOut }, '<');

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

function dqsA(selector) {
    return document.querySelectorAll(selector);
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
        this.style.opacity = '0';
        container.style.cursor = 'auto';
        this.style.pointerEvents = 'none';
    };
    arrow.__proto__.show = function() {
        container.style.cursor = 'none';
        this.style.opacity = '1';
        this.style.pointerEvents = 'auto';
    };
    arrow.dataset.side = 'leftSide';


    container.addEventListener('touchstart', function(evt) {
        POPUP_CONFIG.x = evt.changedTouches[0].clientX
        POPUP_CONFIG.y = evt.changedTouches[0].clientY
    });

    container.addEventListener('touchend', function(evt) {

        if (evt.changedTouches[0].clientX < POPUP_CONFIG.x) {
            document.querySelector('.build-gallery-popup__wrap-nav .arrow-next').dispatchEvent(new Event('click'));

        } else if ((evt.changedTouches[0].clientX > POPUP_CONFIG.x)) {
            document.querySelector('.build-gallery-popup__wrap-nav .arrow-prev').dispatchEvent(new Event('click'));

        }
        if (evt.changedTouches[0].clientY > POPUP_CONFIG.y &&
            (Math.abs(evt.changedTouches[0].clientX - POPUP_CONFIG.x)) < (document.documentElement.clientWidth * 0.25) &&
            (Math.abs(evt.changedTouches[0].clientY - POPUP_CONFIG.y)) > (document.documentElement.clientHeight * 0.25)
        ) {
            gsap.to(container, { y: 100 })
            document.querySelector('[data-build-popup-close]').click();

        }
    });

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
        arrow.style.position = 'fixed';
        arrow.style.left = evt.clientX - 18 + 'px';
        arrow.style.top = evt.clientY - 18 + 'px';
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
            arrow.classList.remove('left-side');
            arrow.dataset.side = 'rightSide';
        }
    }
    arrow.addEventListener('click', function() {
        switchGallerySlide(arrow.dataset.side);
    });

    let navigate = {
        'leftSide': () => document.querySelector('.build-gallery-popup__wrap-nav .arrow-prev').dispatchEvent(new Event('click')),
        'rightSide': () => document.querySelector('.build-gallery-popup__wrap-nav .arrow-next').dispatchEvent(new Event('click')),
    };

    function switchGallerySlide(side) {
        navigate[side]();
    }

}
sideSwitchArrow(
        POPUP_CONFIG.swiper,
        dqs('[data-moving-mouse]'),
        dqs('[data-build-gallery-popup]'))
    /**СТрелка переключатель в зависимости от положения на єкране END */


const $firstPageNumbers = document.querySelectorAll('.build-status-item__value');
// $firstPageNumbers.forEach(number => animateNumbers(+number.innerHTML, number, 1000))
$firstPageNumbers.forEach(number => {
    const speed = 2;
    var Cont = { val: 0 },
        NewVal = +number.innerHTML;

    TweenLite.to(Cont, speed, {
        val: NewVal,
        roundProps: "val",
        onUpdate: function() {
            number.innerHTML = Cont.val
        }
    });
})

function animateNumbers(to, elem, timeOfAnimation = 1000) {
    if (elem.destNumber === undefined) {
        elem.destNumber = to;
        to = 0;
    }
    elem.innerHTML = to;
    to++;
    console.log(elem.destNumber);
    if (elem.destNumber >= to) setTimeout(() => {
        requestAnimationFrame(() => animateNumbers(to, elem, timeOfAnimation));

    }, timeOfAnimation / elem.destNumber);
}
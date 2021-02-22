/* beautify preserve:start */
@@include('../libs/headroom/headroom.js')
/* beautify preserve:end */
    /* eslint-disable @typescript-eslint/no-unsafe-assignment */
let $menu = document.querySelector('.menu');
let $menuImage = document.querySelector('.js-menu-img');
let $menuTextBlock = document.querySelector('.menu__text-wrap');
let $menuInnerLinks = document.querySelectorAll('.menu__inner-links');

$menuInnerLinks.forEach(link => {
    link.querySelector('*') ? link.previousElementSibling.classList.add(link.dataset.hasChildClass) : null;
})

document.querySelectorAll('[data-image]').forEach(el => {
    el.addEventListener('mouseenter', switchMenuImage);
});


$menuTextBlock.addEventListener('mouseleave', function(evt) {
    // $menuImage.style.opacity = 0;
});

function switchMenuImage(evt) {
    let linkWithImage = evt.target;

    if ($menuImage.dataset.image === linkWithImage.dataset.image) return;

    gsap.set($menuImage, { clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`, })
    let tl = gsap.timeline();
    tl.to($menuImage, {
        clipPath: `polygon(0 0, 0% 0, 0% 100%, 0 100%)`,
        scale: 1.1,
        ease: Power4.easeIn,
        duration: 1.5,
    })
    tl.add(() => {
        $menuImage.dataset.image = linkWithImage.dataset.image;
        $menuImage.src = linkWithImage.dataset.image;
    })
    tl.to($menuImage, {
        clipPath: `polygon(0 0, 100% 0, 100% 100%, 0 100%)`,
        ease: Power4.easeOut,
        scale: 1,
        duration: 1.5,
    })

}

/** */
const classForHoverLink = 'hover';
let $pointsWithChild = document.querySelectorAll('.has-child');
/** */
$pointsWithChild[0].classList.add(classForHoverLink);
$pointsWithChild.forEach(el => {
    el.addEventListener('mouseenter', function(evt) {
        $menu.querySelector(`.${classForHoverLink}`).classList.remove(classForHoverLink);
        el.classList.add(classForHoverLink);
    });
});


window.addEventListener('load', function(evt) {
    let pageId = document.body.getAttribute('id');
    if (!pageId.match(/(home-page)/)) {
        gsap.to('[data-preloader]', 1, { autoAlpha: 0 });
        gsap.to('[data-preloader]', { display: 'none' });
    }
});
/**Скрытие Хедера при скролле вниз */
let headroom = new Headroom(document.querySelector('header'), {
    offset: 100,
    onPin: function(e) {
        // console.log(headroom);
        document.body.classList.add(headroom.classes.pinned);
        document.body.classList.remove(headroom.classes.unpinned);
    },
    // callback when unpinned, `this` is headroom object
    onUnpin: function(e) {
        // console.log(headroom);
        document.body.classList.add(headroom.classes.unpinned);
        document.body.classList.remove(headroom.classes.pinned);
    },
}).init();
/**Скрытие Хедера при скролле вниз */
const upArrows = document.querySelectorAll('[data-up-arrow]');

upArrows.forEach(arrow => {

    let upArrowHandler = new Headroom(arrow, {
        offset: 100,
        onPin: function(e) {
            // console.log(headroom);
            // document.body.classList.add(headroom.classes.pinned);
            // document.body.classList.remove(headroom.classes.unpinned);
        },
        // callback when unpinned, `this` is headroom object
        onUnpin: function(e) {
            // console.log(headroom);
            // document.body.classList.add(headroom.classes.unpinned);
            // document.body.classList.remove(headroom.classes.pinned);
        },
    }).init();
    arrow.addEventListener('click', (evt) => document.body.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" }));
})



/**Changing position of some elements, which should be  fixed on smooth_scroll */

if (document.querySelector('.screen__lang')!==null){
    document.body.append(document.querySelector('.screen__lang'))
}
if (document.querySelector('.screen__social') !== null){
    document.body.append(document.querySelector('.screen__social'))
} if (document.querySelector('.decor-social') !== null) {
    document.body.append(document.querySelector('.decor-social'))
}
    /**Changing position of some elements, which should be  fixed on smooth_scroll END*/
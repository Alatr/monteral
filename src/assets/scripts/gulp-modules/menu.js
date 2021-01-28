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

    let tl = gsap.timeline();
    console.log(tl);
    tl.to($menuImage, { opacity: 0.1, scale: 0.9, duration: 0.75, });
    tl.add(() => {
        $menuImage.dataset.image = linkWithImage.dataset.image;
        $menuImage.src = linkWithImage.dataset.image;
    })
    tl.to($menuImage, { opacity: 1, duration: 0.35, ease: Power4.easeOut, scale: 1 })
        // $menuImage.style.animation = `img-out .5s ease-out`;
        // setTimeout(() => {
        //     $menuImage.dataset.image = linkWithImage.dataset.image;
        //     $menuImage.src = linkWithImage.dataset.image;
        // }, 500);
}
// $menuImage.addEventListener('load', function(evt) {
//     $menuImage.style.opacity = 1;
//     $menuImage.style.animation = `img-in 1s ease-out`;
// });


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
        console.log(headroom);
        document.body.classList.add(headroom.classes.pinned);
        document.body.classList.remove(headroom.classes.unpinned);
    },
    // callback when unpinned, `this` is headroom object
    onUnpin: function(e) {
        console.log(headroom);
        document.body.classList.add(headroom.classes.unpinned);
        document.body.classList.remove(headroom.classes.pinned);
    },
}).init();
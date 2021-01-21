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
    $menuImage.style.animation = `img-out .5s ease-out`;
    setTimeout(() => {
        $menuImage.dataset.image = linkWithImage.dataset.image;
        $menuImage.src = linkWithImage.dataset.image;
    }, 500);
}
$menuImage.addEventListener('load', function(evt) {
    $menuImage.style.opacity = 1;
    $menuImage.style.animation = `img-in 1s ease-out`;
});


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
})

document.querySelector('.header__call').click();
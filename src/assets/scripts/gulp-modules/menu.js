$menu = document.querySelector('.menu');
$menuImage = document.querySelector('.js-menu-img');

$menuInnerLinks = document.querySelectorAll('.menu__inner-links');
$menuInnerLinks.forEach(link => {

    link.querySelector('*') ? link.previousElementSibling.classList.add(link.dataset.hasChildClass) : null;
})

document.querySelectorAll('[data-image]').forEach(el => {
    el.addEventListener('mouseenter', function(evt) {
        $menuImage.src = el.dataset.image;
        $menuImage.style.filter = `blur(${el.dataset.blur}px)`;
    });
})
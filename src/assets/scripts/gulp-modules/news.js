function simulatePathDrawing(path, strokeWidth = '3') {
    if (path.done) return;
    let defaultFillColor = getComputedStyle(path).fill;
    path.style.fill = 'none';
    // var path = document.querySelector('.squiggle-animated path');
    var length = path.getTotalLength();
    // Clear any previous transition
    path.style.transition = path.style.WebkitTransition =
        'none';
    // Set up the starting positions
    path.style.strokeDasharray = length + ' ' + length;
    path.style.strokeDashoffset = length;
    // Trigger a layout so styles are calculated & the browser
    // picks up the starting position before animating
    path.getBoundingClientRect();
    // Define our transition
    path.style.transition = path.style.WebkitTransition =
        'stroke-dashoffset 1.5s ease-in-out';
    // Go!
    path.style.strokeDashoffset = '0';
    path.style.strokeWidth = strokeWidth;
    path.style.stroke = defaultFillColor;
    path.done = true;
    setTimeout(() => {
        path.style.fill = defaultFillColor;
        path.style.strokeWidth = 0;
    }, 1500);
}
window.addEventListener('load', function(evt) {
    document.querySelectorAll('[data-path-draw-effect]').forEach((el, i) => {
        setTimeout(() => {
            simulatePathDrawing(el, 1);
        }, i * 100);
    })
    document.querySelectorAll('[data-gsap-anim-enter]').forEach(el => {
        gsap.from(el, { autoAlpha: 0 })
    })
});


// document.querySelectorAll('[data-repaint-on-hover]').forEach(colorMe)

// function colorMe(element) {
//     element.addEventListener('mouseenter', function(evt) {
//         let pathId = element.querySelector('use').getAttribute('xlink:href');

//         document.querySelectorAll(`${pathId} [fill]`).forEach(el => {
//             el.defaultColor = getComputedStyle(el).fill;
//             el.style.fill = 'red';

//         })
//         document.querySelectorAll(`${pathId} [stroke]`).forEach(el => {
//             el.defaultColor = getComputedStyle(el).stroke;
//             el.style.stroke = 'red';
//         })
//     });
//     element.addEventListener('mouseleave', function(evt) {
//         let pathId = element.querySelector('use').getAttribute('xlink:href');
//         document.querySelectorAll(`${pathId} [fill]`).forEach(el => {
//             console.log(el.defaultColor);
//             el.style.fill = el.defaultColor;
//         })
//         document.querySelectorAll(`${pathId} [stroke]`).forEach(el => {
//             console.log(el.defaultColor);
//             el.style.stroke = el.defaultColor;
//         })
//     });
// }
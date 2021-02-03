document.querySelectorAll('.web-camera-block__play-button').forEach(el => {
    el.addEventListener('click', function(evt) {
        el.nextElementSibling.setAttribute('src', el.nextElementSibling.dataset.src);
        el.remove();
    });
})
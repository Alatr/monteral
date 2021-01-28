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
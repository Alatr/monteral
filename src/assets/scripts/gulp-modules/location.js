/**
 * Water ripple effect.
 * Original code (Java) by Neil Wallis 
 * @link http://www.neilwallis.com/java/water.html
 * 
 * @author Sergey Chikuyonok (serge.che@gmail.com)
 * @link http://chikuyonok.ru
 */
(function() {
    var canvas = document.getElementById('c'),
        /** @type {CanvasRenderingContext2D} */
        ctx = canvas.getContext('2d'),
        width = document.documentElement.clientWidth,
        height = document.documentElement.clientHeight,
        half_width = width >> 1,
        half_height = height >> 1,
        size = width * (height + 2) * 2,
        delay = 1,
        oldind = width,
        newind = width * (height + 3),
        riprad = 3,
        ripplemap = [],
        last_map = [],
        ripple,
        texture,
        line_width = 20,
        step = line_width * 2,
        count = height / line_width;

    canvas.width = width;
    canvas.height = height;

    /*
     * Water ripple demo can work with any bitmap image
     * (see example here: http://media.chikuyonok.ru/ripple/)
     * But I need to draw simple artwork to bypass 1k limitation
     */
    with(ctx) {

        let image = new Image();
        image.src = document.querySelector('.page-first-block__bg img').getAttribute('src');
        drawImage(image, 0, 0, width, height);
        save();
        // rotate(-0.785);
        restore();
    }

    texture = ctx.getImageData(0, 0, width, height);
    ripple = ctx.getImageData(0, 0, width, height);

    for (var i = 0; i < size; i++) {
        last_map[i] = ripplemap[i] = 0;
    }

    /**
     * Main loop
     */
    function run() {
        newframe();
        ctx.putImageData(ripple, 0, 0);
    }

    /**
     * Disturb water at specified point
     */
    function disturb(dx, dy, wide = 256) {
        dx <<= 0;
        dy <<= 0;
        for (var j = dy - riprad; j < dy + riprad; j++) {
            for (var k = dx - riprad; k < dx + riprad; k++) {
                ripplemap[oldind + (j * width) + k] += wide;

            }
        }
    }

    /**
     * Generates new ripples
     */
    function newframe() {
        var a, b, data, cur_pixel, new_pixel, old_data;

        var t = oldind;
        oldind = newind;
        newind = t;
        var i = 0;


        // create local copies of variables to decrease
        // scope lookup time in Firefox
        var _width = width,
            _height = height,
            _ripplemap = ripplemap,
            _last_map = last_map,
            _rd = ripple.data,
            _td = texture.data,
            _half_width = half_width,
            _half_height = half_height;

        for (var y = 0; y < _height; y++) {
            for (var x = 0; x < _width; x++) {
                var _newind = newind + i,
                    _mapind = oldind + i;
                data = (
                    _ripplemap[_mapind - _width] +
                    _ripplemap[_mapind + _width] +
                    _ripplemap[_mapind - 1] +
                    _ripplemap[_mapind + 1]) >> 1;

                data -= _ripplemap[_newind];
                data -= data >> 5;

                _ripplemap[_newind] = data;

                //where data=0 then still, where data>0 then wave
                data = 1024 - data;

                old_data = _last_map[i];
                _last_map[i] = data;

                if (old_data != data) {
                    //offsets
                    a = (((x - _half_width) * data / 1024) << 0) + _half_width;
                    b = (((y - _half_height) * data / 1024) << 0) + _half_height;

                    //bounds check
                    if (a >= _width) a = _width - 1;
                    if (a < 0) a = 0;
                    if (b >= _height) b = _height - 1;
                    if (b < 0) b = 0;

                    new_pixel = (a + (b * _width)) * 4;
                    cur_pixel = i * 4;

                    _rd[cur_pixel] = _td[new_pixel];
                    _rd[cur_pixel + 1] = _td[new_pixel + 1];
                    _rd[cur_pixel + 2] = _td[new_pixel + 2];
                }

                ++i;
            }
        }
    }


    setInterval(run, delay);

    // generate random ripples
    var rnd = Math.random;
    let some = setInterval(function() {
        let randomize = rnd();
        let randomizeH = rnd();
        let randDx = randomize * width;
        let randDy = randomizeH * height;

        for (var e = randDx; e < randDx + 100; e += 10) {
            disturb(e * (3 * Math.cos(e)), e);
        }
    }, 250);

    const stopIcon = `
        <svg 
            data-effect-stop
            style="
                width: 50px;
                height: 50px;
                position: absolute;
                right: 0;
                top: calc(100vh - 50px);
                z-index: 1000;
                transform: translate(-50%,-50%);
                "     
            version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            viewBox="0 0 286.054 286.054" style="enable-background:new 0 0 286.054 286.054;" xml:space="preserve">
            <g>
                <path style="fill:rgba(207, 190, 151, 1);" d="M143.027,0.004C64.04,0.004,0,64.036,0,143.022c0,78.996,64.04,143.027,143.027,143.027
                s143.027-64.031,143.027-143.027C286.054,64.045,222.014,0.004,143.027,0.004z M143.027,259.232
                c-64.183,0-116.209-52.026-116.209-116.209s52.026-116.21,116.209-116.21s116.209,52.026,116.209,116.209
                S207.21,259.232,143.027,259.232z M169.844,98.327h-53.635c-9.869,0-17.878,8.01-17.878,17.878v53.635
                c0,9.869,8.01,17.878,17.878,17.878h53.635c9.869,0,17.878-8.01,17.878-17.878v-53.635
                C187.723,106.336,179.713,98.327,169.844,98.327z"/>
            </g>
        </svg>

    
    `;
    document.body.insertAdjacentHTML('beforeend', stopIcon);
    /**градинент для канвас */
    canvas.insertAdjacentHTML('afterend', `
        <div style="
        content: '';
            position: absolute;
            top: calc(var(--header-height) * -1);
            left: calc(var(--self-side-padding) * -1);
            width: calc(100% + (var(--self-side-padding) * 2));
            height: calc(100% + var(--header-height));
            background: linear-gradient(
        180deg
        , rgba(0, 97, 100, 0) 60%, rgba(0, 97, 100, 0.9) 100%), rgba(0, 0, 0, 0.2);"></div>
    `);
    /**Остановка ефекта */
    document.querySelector('[data-effect-stop]').addEventListener('click', (evt) => {
        clearInterval(some);
        evt.target.remove();
    });
    // document.body.onclick = () => {
    //     let randomize = rnd();
    //     let randomizeH = rnd();
    //     console.log(randomize);
    //     // let randDx = randomize * width;
    //     let randDx = 300;
    //     let randDy = randomizeH * height;
    //     for (var e = randDx; e < randDx + 100; e += 5) {
    //         disturb(e * (3 * Math.cos(e)), e);
    //     }
    // }

})();
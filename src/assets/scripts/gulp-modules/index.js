// @@include('./libs.js');

const eases = {
    ex: "expo.inOut",
    exI: "expo.in",
    exO: "expo.out",
    p4: "power4.inOut",
    p4I: "power4.in",
    p4O: "power4.out",
    p2: "power2.inOut",
    p2I: "power2.in",
    p2O: "power2.out",
    circ: "circ.inOut",
    circO: "circ.out",
    circI: "circ.in",
}

class showModal {
    constructor(obj) {
        this.$popup = obj.$popup;
        this.$openBtn = obj.$openBtn;
        this.$closeBtn = obj.$closeBtn;
        this.attrParrentNode = obj.attrParrentNode;
        this.status = false;
        this.animationIn = obj.animationIn;
        this.animationOut = obj.animationOut;
        this.onOpenCompleteCallback = obj.onOpenCompleteCallback || function() {};
        this.onCloseCompleteCallback = obj.onCloseCompleteCallback || function() {};
        this.$body = document.querySelector('body');


        this.init()
    }


    get isOpen() {
            return this.status;
        }
        /*  */
    enableButton(btn) {
        // console.log(btn);
        btn.disabled = false;
    }
    disableButton(btn) {
            // console.log(btn);
            btn.disabled = true;
        }
        /*  */
    open() {
        this.onOpenCompleteCallback();
        const onComplete = () => {
            this.enableButton(this.$openBtn);
            this.status = true;
        }
        const onStart = () => this.disableButton(this.$openBtn);

        this.animationIn({ onComplete, onStart }).play();

    };

    close() {
        this.onCloseCompleteCallback();
        const onComplete = () => {
            this.enableButton(this.$openBtn);

            this.status = false;
        }
        const onStart = () => this.disableButton(this.$openBtn);

        this.animationOut({ onComplete, onStart }).play();
    };

    toggle() {
        if (this.status) {
            this.$body.classList.remove('modal-active');
            this.close();
        } else {
            this.$body.classList.add('modal-active');
            this.open();
        }
    }

    listeners() {
        const self = this;
        this.$body.addEventListener('click', function(evt) {
            if (evt.target.closest(self.attrParrentNode) != null && !self.$openBtn.disabled) {
                evt.stopImmediatePropagation();
                self.toggle();
                console.log(this);
            }
        });
    }


    init() {
        this.listeners();
    }
}




/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
const popupBlockBtnOpen = document.querySelector('[data-menu-btn]');
const popupBlockBtnClose = document.querySelector('[data-menu-close]');
const popupBlock = document.querySelector('[data-call-popup-block]');




const callPopap = new showModal({
    $popup: popupBlock,
    $openBtn: popupBlockBtnOpen,
    $closeBtn: popupBlockBtnClose,
    animationIn: animationPopapIn,
    animationOut: animationPopapOut,
    attrParrentNode: '[data-parrent-node-popup]'
});


/*
 *  start in
 */
function animationPopapIn(settings) {
    // gsap.set([], {autoAlpha:0});
    const obj = {...settings, paused: true };
    const tl = gsap.timeline(obj);
    tl.fromTo(this.$popup, 1, { autoAlpha: 0 }, { autoAlpha: 1, immediateRender: false })



    return tl;
};
/*
 *  end in
 */
/*
 *  start Out
 */
function animationPopapOut(settings) {
    // gsap.set([], {autoAlpha:0});
    const obj = {...settings, paused: true, };
    const tl = gsap.timeline(obj);
    tl.fromTo(this.$popup, 1, { autoAlpha: 1 }, { autoAlpha: 0, clearProps: "all", immediateRender: false })
        /*  */


    return tl;
};
/*
 *  end Out
 */
/**********************************/




/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */
/*  */














const menuBtnOpen = document.querySelector('[data-menu-btn]');
const menuBtnClose = document.querySelector('[data-menu-close]');
const menuBlock = document.querySelector('[data-menu-block]');


const cross1 = document.querySelector('.cross__1');
const cross2 = document.querySelector('.cross__2');
const line0 = document.querySelector('.burg__0');
const line1 = document.querySelector('.burg__1');
const line2 = document.querySelector('.burg__2');
const menuTextOpen = document.querySelector('[data-text-open]');
const menuTextClose = document.querySelector('[data-text-close]');

/**********************************/
const ease_menuBtnHover1 = BezierEasing(.42, .8, .39, .97);
const ease_menuBtnCross = BezierEasing(.85, 1.34, .14, 1.26);
const ease_menuBtnText = BezierEasing(.03, .94, .43, 1.07);

gsap.set([cross1, cross2], { autoAlpha: 0, scale: 0, transformOrigin: 'center' });
gsap.set([menuTextClose], { autoAlpha: 0, x: -25 });



const menu = new showModal({
    $popup: menuBlock,
    $closeBtn: menuBtnClose,
    $openBtn: menuBtnOpen,
    animationIn: animationMenuIn,
    animationOut: animationMenuOut,
    attrParrentNode: '[data-parrent-node-menu]'
});

/*
 *  start in
 */
function animationMenuIn(settings) {
    // gsap.set([], {autoAlpha:0});
    const obj = {...settings, paused: true };
    const tl = gsap.timeline(obj);
    tl.fromTo(this.$popup, 1, { autoAlpha: 0 }, { autoAlpha: 1, immediateRender: false })

    tl.to([line0, line1, line2], 0.5, { autoAlpha: 1, x: 30, stagger: 0.1, ease: ease_menuBtnHover1 }, '<')
        /*  */
    tl.to(menuTextOpen, 0.3, { autoAlpha: 0, x: 20, ease: ease_menuBtnText }, '<')
    tl.to(menuTextClose, 0.3, { autoAlpha: 1, x: 0, ease: ease_menuBtnText }, '<')
        /*  */
    tl.fromTo([cross1, cross2], 0.6, { autoAlpha: 0, scale: 0 }, { autoAlpha: 1, stagger: 0.1, scale: 1, ease: ease_menuBtnCross }, '<')


    return tl;
};
/*
 *  end in
 */
/*
 *  start Out
 */
function animationMenuOut(settings) {
    // gsap.set([], {autoAlpha:0});
    const obj = {...settings, paused: true, };
    const tl = gsap.timeline(obj);
    tl.fromTo(this.$popup, 1, { autoAlpha: 1 }, { autoAlpha: 0, clearProps: "all", immediateRender: false })
        /*  */
    tl.to(menuTextClose, 0.3, { autoAlpha: 0, x: -20, ease: ease_menuBtnText }, '<')
    tl.to(menuTextOpen, 0.3, { autoAlpha: 1, x: 0, ease: ease_menuBtnText }, '<')
        /*  */
    tl.to([line0, line1, line2], 0.5, { autoAlpha: 1, x: 0, stagger: 0.1, ease: ease_menuBtnHover1 }, '<')
    tl.fromTo([cross1, cross2], 0.6, { autoAlpha: 0, scale: 1 }, { autoAlpha: 1, stagger: 0.1, scale: 0, ease: ease_menuBtnCross }, '<')


    return tl;
};
/*
 *  end Out
 */
/**********************************/

/*
 * hover start
 */
/*
 * hover end
 */

const menuBtnHover = (() => {
    var tl = new TimelineLite({ paused: true });

    tl.fromTo(menuTextOpen, 0.3, { x: 0 }, { x: 8, ease: ease_menuBtnHover1 });
    tl.fromTo(line0, 0.3, { x: 0 }, { x: 8, ease: ease_menuBtnHover1 }, '-=0.20');

    return tl;

})();



menuBtnOpen.addEventListener("mouseover", e => {
    if (!menu.isOpen) {
        menuBtnHover.play();
        return
    }

});

menuBtnOpen.addEventListener("mouseout", e => {
    if (!menu.isOpen) {
        menuBtnHover.reverse();
        return
    }
});


/* 
window.addEventListener('load', function(evt) {
    gsap.to('[data-preloader]', 1, { autoAlpha: 0 });
    gsap.to('[data-preloader]', { display: 'none' });
});
 */







// class sexyInput {
// 	constructor(setting) {
// 		this.selected = false;
// 		this.attrParrentNode = setting.attrParrentNode;
// 		this.$input = setting.$input;
// 		this.$field = setting.$field;
// 		this.$message = setting.$message;

// 		this.$body = document.querySelector('body');

// 		this.init()
// 	}

// 	selectIn(self){
// 		return ({target}) => {
// 			self.showSelectedStyle();
// 			self.addSelectedStyle();
// 		}
// 	}

// 	selectOut(self){
// 		return ({target}) => {
// 			if(target.value !== "") return;

// 			self.showDefaultStyle();
// 			self.removeSelectedStyle();
// 		}
// 	}

// /*  */
// 	showSuccessStyle(){
// 		this.changeStatus(this.$field, 'success');
// 	}
// 	showDefaultStyle(){
// 		this.changeStatus(this.$field, 'default');
// 	}
// 	showErrorStyle(){
// 		this.changeStatus(this.$field, 'error');
// 	}
// 	showSelectedStyle(){
// 		this.changeStatus(this.$field, 'selected');
// 	}
// 	addSelectedStyle(){
// 		this.$field.classList.add('selected');

// 	}
// 	removeSelectedStyle(){
// 		this.$field.classList.remove('selected');
// 	}
// 	writeMessage(text){
// 		this.$message.innerHTML = text;
// 	}
// /*  */

// 	changeStatus(fieldBlock, status){
// 		switch (status) {
// 			case 'default':
// 				fieldBlock.classList.remove('selected');
// 				fieldBlock.setAttribute('data-status', 'field--inactive');

// 				break;
// 			case 'success':
// 				fieldBlock.setAttribute('data-status', 'field--success');

// 				break;
// 			case 'error':
// 				fieldBlock.setAttribute('data-status', 'field--error');


// 				break;
// 			case 'selected':
// 				fieldBlock.classList.add('selected');
// 				fieldBlock.setAttribute('data-status', 'field--active');

// 				break;

// 			default:
// 				throw new Error(`Unknown change status ${status}`);
// 				break;
// 		}

// 	}


// 	/*  */


// 	listeners(input) {
// 		const self = this;
// 		input.addEventListener('focus', self.selectIn(self));
// 		input.addEventListener('blur', self.selectOut(self));
// 	}


// 	init() {
// 		this.listeners(this.$input);
// 	}
// }


// const formFields = [...document.querySelectorAll('.form-field')];
// const prettyInputs =  formFields.map((el)=>{
// 	return new sexyInput({
// 		$field: el,
// 		$input: el.querySelector('input'),
// 		$message: el.querySelector('[data-input-message]'),
// 		attrParrentNode: '[data-field-input]'
// 	});
// });


// document.querySelector('body').addEventListener('click', ()=>{
// 	// prettyInputs[0].showErrorStyle()
// 	// prettyInputs[0].writeMessage('123123123')
// })













// // * GET PROMISE FUNC FOR AJAX REQUEST START
// async function getPromise(data, url, parse) {
// 	let promise = new Promise(function (resolve, reject) {
// 		$.ajax({
// 			url: url,
// 			data: data,
// 			type: 'POST',
// 			global: false,
// 			async: true,
// 			success: function (res) {
// 				let data = (!parse) ? JSON.parse(res) : res
// 				resolve(data);
// 			},
// 			error: function (jqXHR, status, errorThrown) {
// 				reject(jqXHR);
// 			},
// 			beforeSend: function () {},
// 		});
// 	});

// 	return await promise;
// }

// (function ($) {
// 	// var loader = function () {
// 	// 	$(".loader-wrap").delay(500).fadeOut(500);
// 	// };
// 	// loader()



// // валидация формы 

// $('.main-form__input').on('focus', function () {
// 	$(this).parent().addClass('js-input-focus');
// }).blur(function () {
// 	if ($(this).val() === '') {
// 		$(this).parent().removeClass('js-input-focus');
// 	}
// });

// $('#form').on('submit', function (e) {
// 	event.preventDefault();
// 	var parent = e.target;
// 	ajax_form(parent);
// });

// 		function ajax_form(e) {
// 			event.preventDefault();
// 			var err = [];
// 			let serverAnsver = {};
// 			var rulesPattern = {
// 				email: /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
// 				tel: /^\+38\(\d{3}\)\d{7}$/
// 			};
// 			var validatorMethods = {
// 				empty: function (el) {
// 					return (el === '') ? true : false;
// 				},
// 				pattern: function (el, pattern) {
// 					return pattern.test(el);
// 				},
// 				contains: function (el1, el2) {
// 					return (el1 == el2) ? false : true;
// 				},
// 				check: function (el) {
// 					return (el.checked) ? false : true;
// 				},
// 				max: function (el) {
// 					return (el.length > 5) ? true : false;
// 				}
// 			}
// 			var removeAnimationClass = function (selector, classAnimation) {
// 				selector.addClass(classAnimation);
// 				selector.on("animationend", function () {
// 					selector.removeClass(classAnimation);
// 				});
// 			}
// 			var pushError = function (key) {
// 				err.push(key);
// 			}
// 			var showError = function (key) {
// 				var errorMessage = $(this).next().data("errormessage"); // добавляем в input сообщение об ошибке из dataAttr и class
// 				var inputText = $(this).next().find('.main-form__text');
// 				($(this).closest('.main-form-block').hasClass('js-input-focus')) ? removeAnimationClass(inputText, 'shake-focus'): removeAnimationClass(inputText, 'shake')

// 				inputText.text(errorMessage);
// 				$(this).addClass('js-no-valid');
// 				pushError(key)
// 			}
// 			var showDefaultMessage = function () {
// 				var defaultMessage = $(this).next().data("defaultmessage"); // при клике на input убираем сообщение и class
// 				$(this).next().find('.main-form__text').text(defaultMessage);

// 				$(this).removeClass('js-no-valid');
// 			}
// 			var str = $("#" + e.id).serialize();
// 			//var x = document.forms[e.id]["name"].value;
// 			//var y = document.forms[e.id]["tel"].value;
// 			//	console.log(str);


// 			var errors = true; // по умолчанию ошибок в форме нет
// 			$(e).find('.main-form__input-requaired').each(function () {
// 				var rule = $(this).data("rule").split(' ');
// 				if ($(this).data("patterns") != undefined) {
// 					var pattern = $(this).data("patterns").split(' ');
// 				}
// 				if ($(this).data("compare") != undefined) {
// 					var compare = $(this).data("compare").split(' ');
// 				}

// 				rule.forEach((el) => {


// 					switch (el) {
// 						case 'pattern':
// 							pattern.forEach((elPat) => {
// 								errors = !validatorMethods[el]($.trim($(this).val()), rulesPattern[elPat]);
// 								if (errors) showError.call($(this), elPat);
// 							});
// 							break;
// 						case 'contains':
// 							var compareElemOne = $('#' + compare[0]).val();
// 							var compareElemTwo = $('#' + compare[1]).val();
// 							errors = validatorMethods[el](compareElemOne, compareElemTwo);
// 							if (errors) showError.call($(this), el);
// 							break;
// 						case 'check':
// 							errors = validatorMethods[el]($(this)[0]);
// 							if (errors) showError.call($(this), el);
// 							break;
// 						default:
// 							errors = validatorMethods[el]($.trim($(this).val()));
// 							if (errors) showError.call($(this), el);
// 					}
// 				})

// 				$(".main-form__input").on("mouseup", showDefaultMessage);

// 			});
// 			if (err.length == 0) {
// 				get(str, "./static/val.php", true, (data) => {
// 					serverAnsver = data.error;
// 					for (let key in serverAnsver) {
// 						showErrorMessage.call(e, key, serverAnsver[key])
// 					};

// 					if (serverAnsver.length == 0) {
// 						get(str, "./static/val.php", true, () => {
// 							$.ajax({
// 									method: "POST",
// 									url: "./static/val.php",
// 									data: str,
// 									beforeSend: function () {
// 										$(e).find('button.js-main-form__button').text('Отправка...') // замена текста в кнопке при отправке
// 										$('body').css('cursor', 'wait')
// 									},
// 									error: function () {
// 										$(e).find('button.js-main-form__button').text('Ошибка отправки!'); // замена текста в кнопке при отправке в случае
// 									}
// 								})
// 								.done(function (msg) {
// 									$('.form-succses').addClass('form-succses-active');
// 									$(e).find('.main-form__input-requaired').each(function (el) {
// 										$(this).val('');
// 										showDefaultMessage.call($(this));
// 									});
// 									$(e).find('.main-form-block.requaired').removeClass('js-input-focus');
// 									$('body').css('cursor', 'default');
// 									//location.replace('/message/');
// 									$(e).find('button.js-main-form__button').text('Отправить');
// 								});
// 						});
// 					}
// 				});

// 			}

// 			function showErrorMessage(elem, text) {
// 				const element = $(this).find(`[data-type="${elem}"] .main-form__text`);
// 				const inp = element.closest('.requaired').find('.main-form__input-requaired');
// 				inp.addClass('js-no-valid');
// 				removeAnimationClass(element, 'shake-focus')
// 				element.text(text);
// 			}
// 		}


// 		function get(sand, url, parse, callback) {
// 			$.ajax({
// 				url: url,
// 				type: 'get',
// 				data: sand,
// 				global: false,
// 				async: true,
// 				success: function (data) {
// 					var data = (parse) ? JSON.parse(data) : data
// 					callback(data)
// 				},
// 				error: function (jqXHR, status, errorThrown) {
// 					console.log('ОШИБКА AJAX запроса: ' + status, jqXHR);
// 				}
// 			});
// 		}


// })(jQuery);


// console.clear()
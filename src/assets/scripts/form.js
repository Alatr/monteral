import * as yup from 'yup';
import { setLocale } from 'yup';

import i18next from 'i18next';
import initView from './form-view/view.js';
import {langDetect} from './modules/helpers/helpers.js';
import sexyInput from './modules/helpers/sexy-input';

/*  */
const lang = langDetect();
const runApp = (async () => {
  await i18next.init({
    lng: lang, // Текущий язык
    debug: true,
    resources: {
      ru: { // Тексты конкретного языка
        translation: { // Так называемый namespace по умолчанию
          name: 'Имя:*',
          phone: 'Телефон:*',
          send: 'Отправить',
          sending: 'Отправка',
          field_too_short: 'телефон должен содержать не менее {{cnt}} символов',
          field_too_long: 'телефон должен содержать не более {{cnt}} символов',
          only_number: 'здесь только цифры',
          required: 'это поле обязательне',
          sendingSuccessTitle: 'Cообщение отправлено',
          sendingSuccessText: 'Ждите ответа наших менеджеров',
          sendingErrorText: 'Ждите ответа наших менеджеров',
          sendingErrorTitle: 'Ошибка',
          sendingErrorText_0: 'Сообщение не было отправлено за неизвестной ошибки сервера [faill]',
          sendingErrorText_1: 'Сообщение не было отправлено за неизвестной ошибки сервера [0]',
          sendingErrorText_2: 'Сообщение не было отправлено за неизвестной ошибки сервера [null]',
        },
      },
      uk: { // Тексты конкретного языка
        translation: { // Так называемый namespace по умолчанию
          name: 'Ім’я:*',
          phone: 'Телефон:*',
          send: 'Надіслати',
          sending: 'Відправлення',
          field_too_short: 'телефон має містити принаймні {{cnt}} символів',
          field_too_long: 'телефон має містити не більше {{cnt}} символів',
          only_number: 'тут лише цифри',
          required: 'Це поле є обов`язковим',
          sendingSuccessTitle: 'Повідомлення надіслано',
          sendingSuccessText: 'Чекайте відповіді наших менеджерів',
          sendingErrorText: 'Чекайте відповіді наших менеджерів',
          sendingErrorTitle: 'Сталася помилка',
          sendingErrorText_0: 'Повідомлення не було надіслано через невідому помилку серверу [faill]',
          sendingErrorText_1: 'Повідомлення не було надіслано через невідому помилку серверу [0]',
          sendingErrorText_2: 'Повідомлення не було надіслано через невідому помилку серверу [null]',
        },
      },
      en: { // Тексты конкретного языка
        translation: { // Так называемый namespace по умолчанию
          name: 'Name:*',
          phone: 'Phone:*',
          send: 'Sand',
          sending: 'Sanding',
          field_too_short: 'phone must be at least {{cnt}} characters',
          field_too_long: 'phone must be at most {{cnt}} characters',
          only_number: 'only digits here',
          required: 'this field is required',
          sendingSuccessTitle: 'Message sent',
          sendingSuccessText: 'Wait for the answers of our managers',
          sendingErrorText: 'Wait for the answers of our managers',
          sendingErrorTitle: 'An error has occurred',
          sendingErrorText_0: 'The message was not sent due to an unknown server error [faill]',
          sendingErrorText_1: 'The message was not sent due to an unknown server error [0]',
          sendingErrorText_2: 'The message was not sent due to an unknown server error [null]',
        },
      },
    },
  });
})();
/*  */

function app() {
	const state = {
    error: null,
    form: {
      status: 'filling',
      fields: {
        name: {
          valid: true,
          error: null,
        },
      },
    },
  };

  const elements = {
    form: document.querySelector('#todo-form'),
    input: document.querySelector('#todo-input'),
    submitBtn: document.querySelector('#todo-submit'),
    todosBox: document.querySelector('#todos'),
    toast: document.querySelector('.toast'),
  };
}

class FormMonster {
	constructor(setting) {
		this.elements = setting.elements;
		this.$body = document.querySelector('body');

		this.state = {
			error: true,
			form: setting.elements.fields,
			status: 'filling',
		};
		this.fieldsKey = Object.keys(this.elements.fields)
		this.watchedState = initView(this.state, this.elements);
	
		
		this.init()
	}
	validate (formData) {
		const formDataObj = this.fieldsKey.reduce((acc, key) => {
			acc[key] = formData.get(key);
			return acc;
		}, {});
		/*  */
		const shapeObject = this.fieldsKey.reduce((acc, key) => {
			acc[key] = this.elements.fields[key].rule;
			return acc
		}, {});
		/*  */

		let schema = yup.object().shape(shapeObject);


		try {
			schema.validateSync(formDataObj, { abortEarly: false });
			return null;
		} catch (err) {
			return err.inner;
		}
	};

	changeInput(state){
		return (e) => {
			/*  */
			e.preventDefault();
			this.watchedState.status = 'filling'
			/*  */
			const formData = new FormData(this.elements.$form);
			/*  */
      const error = this.validate(formData);
			/*  */
			this.fieldsKey.map((key) => {
				const field = this.elements.fields[key];
				field.valid = true;
				field.error = [];
				
			});
			/*  */
			/*  */
			if (error) {
				error.forEach(({path, message}) => {
					this.watchedState.form[path].valid = false;
					this.watchedState.form[path].error.push(message);
				});
				this.watchedState.error = true;
				this.watchedState.status = 'renderErrorValidation';
				return;
      }
			this.watchedState.error = false;
			this.watchedState.status = 'renderSuccessValidation';
		};
	}
	submitForm(state){
		return (e) => {
			/*  */
      e.preventDefault();
      this.changeInput()(e);
      
      /*  */
      if (this.watchedState.error === false) {
        try {
          this.watchedState.status = 'loading';
    			const formData = new FormData(this.elements.$form);

          // const todo = await sendTodo(formData);
          // this.watchedState.todos.push(todo);
          setTimeout(() => {
            this.watchedState.status = 'successSand';


          }, 3000);
        } catch (err) {
          // this.watchedState.form.status = 'failed';
          // this.watchedState.error = err.message;
        }
        // console.log('error', error, error.path);
        
      }
		};
	}

	listers(){
		/*  */
		this.elements.$form.addEventListener('submit', this.submitForm(this.watchedState));
		/*  */
		this.fieldsKey.map((key) => {
			const input = this.elements.fields[key].inputWrapper.input;
			input.addEventListener('input', this.changeInput(this.watchedState));
		});
	}

	init(){
		this.listers();
	}
}

// const regularTel3 = new RegExp(/\(?([0-9]{3})\)?(?:[ .-])([0-9]{2}[ .-]?)([0-9]{2}[ .-]?)([0-9]{3})/);
// const regularTel4 = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
// const regularTel = /^\(?([0-9]{3})\)?[ .-]?([0-9]{2}[ .-]?)([0-9]{2}[ .-]?)([0-9]{3})$/
const $form = document.querySelector('[data-home-contact]');

const formHome = new FormMonster({
	elements: {
		$form,
		$btnSubmit: $form.querySelector('[data-btn-submit]'),
		fields: {
			name: {
				inputWrapper: new sexyInput({ $field: $form.querySelector('[data-field-name]') }),
				rule: yup.string().required(i18next.t('required')).trim(),
				defaultMessage: i18next.t('name'),
				valid: false,
				error: [],
			},

			phone: {
				inputWrapper: new sexyInput({ $field: $form.querySelector('[data-field-phone]') }),
				rule: yup
							.string()
							.matches(/(^[0-9]+$)/, i18next.t('only_number'))
							.required(i18next.t('required'))
							.min(6, i18next.t('field_too_short', {cnt: 6}))
							.max(15, i18next.t('field_too_long', {cnt: 15})),
							
				defaultMessage: i18next.t('phone'),
				valid: false,
				error: [],
			},
		}

	}
});


const $form2 = document.querySelector('[data-home-contact-page]');

const formHome2 = new FormMonster({
	elements: {
		$form: $form2,
		$btnSubmit: $form2.querySelector('[data-btn-submit]'),
		fields: {
			name: {
				inputWrapper: new sexyInput({ $field: $form2.querySelector('[data-field-name]') }),
				rule: yup.string().required(i18next.t('required')).trim(),
				defaultMessage: i18next.t('name'),
				valid: false,
				error: [],
			},

			phone: {
				inputWrapper: new sexyInput({ $field: $form2.querySelector('[data-field-phone]') }),
				rule: yup
							.string()
							.matches(/(^[0-9]+$)/, i18next.t('only_number'))
							.required(i18next.t('required'))
							.min(6, i18next.t('field_too_short', {cnt: 6}))
							.max(15, i18next.t('field_too_long', {cnt: 15})),
							
				defaultMessage: i18next.t('phone'),
				valid: false,
				error: [],
			},
		}

	}
});






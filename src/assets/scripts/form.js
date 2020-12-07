



class sexyInput {
	constructor(setting) {
		this.selected = false;
		this.$field = setting.$field;
		this.$input = setting.$input || setting.$field.querySelector('input');
		this.$message = setting.$message || setting.$field.querySelector('[data-input-message]');
		
		this.$body = document.querySelector('body');

		this.init()
	}

	selectIn(self){
		return ({target}) => {
			self.showSelectedStyle();
			self.addSelectedStyle();
		}
	}

	selectOut(self){
		return ({target}) => {
			if(target.value !== "") return;
			
			self.showDefaultStyle();
			self.removeSelectedStyle();
		}
	}

/*  */
	showSuccessStyle(){
		this.changeStatus(this.$field, 'success');
	}
	showDefaultStyle(){
		this.changeStatus(this.$field, 'default');
	}
	showErrorStyle(){
		this.changeStatus(this.$field, 'error');
	}
	showSelectedStyle(){
		this.changeStatus(this.$field, 'selected');
	}
	addSelectedStyle(){
		this.$field.classList.add('selected');

	}
	removeSelectedStyle(){
		this.$field.classList.remove('selected');
	}
	writeMessage(text){
		this.$message.innerHTML = text;
	}
/*  */

	changeStatus(fieldBlock, status){
		switch (status) {
			case 'default':
				fieldBlock.classList.remove('selected');
				fieldBlock.setAttribute('data-status', 'field--inactive');
				
				break;
			case 'success':
				fieldBlock.setAttribute('data-status', 'field--success');
				
				break;
			case 'error':
				fieldBlock.setAttribute('data-status', 'field--error');

				
				break;
			case 'selected':
				fieldBlock.classList.add('selected');
				fieldBlock.setAttribute('data-status', 'field--active');
				
				break;
		
			default:
				throw new Error(`Unknown change status ${status}`);
				break;
		}

	}


	/*  */

	
	listeners(input) {
		const self = this;
		input.addEventListener('focus', self.selectIn(self));
		input.addEventListener('blur', self.selectOut(self));
	}


	init() {
		this.listeners(this.$input);
	}
}


const formFields = [...document.querySelectorAll('.form-field')];
const prettyInputs =  formFields.map((el)=>{
	return new sexyInput({ $field: el });
});


document.querySelector('body').addEventListener('click', ()=>{
	// prettyInputs[0].showErrorStyle()
	// prettyInputs[0].writeMessage('123123123')
});






import * as yup from 'yup';
import initView from './form-view/view.js';


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
		
		this.$body = document.querySelector('body');

		this.init()
	}

	init(){
		
	}
}

const $form = document.querySelector('[data-home-contact]');

const formHome = new FormMonster({
	elements: {
		$form,
		fields: [
			{
				input: new sexyInput({ $field: $form.querySelector('[data-field-name]') }),
				rule: ['required', 'string'],
				val: null,
			},
			{
				input: new sexyInput({ $field: $form.querySelector('[data-field-phone]') }),
				rule: ['required', 'number'],
				val: null,
			},
		]

	}
})




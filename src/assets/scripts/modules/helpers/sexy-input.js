
export default class sexyInput {
	constructor(setting) {
		this.selected = false;
		this.$field = setting.$field;
		this.$input = setting.$input || setting.$field.querySelector('input');
    this.$message = setting.$message || setting.$field.querySelector('[data-input-message]');
    this.typeInput = setting.typeInput || 'text';
		
		this.$body = document.querySelector('body');

		this.init()
	}

	get input(){
		return this.$input
	}
	selectIn(self){
		return ({target}) => {
			if(this.getStatusField() !== 'field--error'){
				self.showSelectedStyle();
				self.addSelectedStyle();
			}
		}
	}

	selectOut(self){
		return ({target}) => {
			if(this.getStatusField() === 'field--error' || target.value !== "") return;
			
			self.showDefaultStyle();
			self.removeSelectedStyle();
		}
	}
	/*  */
	getStatusField(){
		return this.$field.getAttribute('data-status');
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
	showLoadingStyle(){
		this.changeStatus(this.$field, 'loading');
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
			case 'loading':
				fieldBlock.classList.add('selected');
				fieldBlock.setAttribute('data-status', 'field--loading');
				break;
		
			default:
				throw new Error(`Unknown change status ${status}`);
				break;
		}

	}


	/*  */

	
	listeners(input) {
    const self = this;
    if(this.typeInput === 'phone'){
      new Cleave(input, {
        numericOnly: true,
        prefix: '+38',
        blocks: [3, 3, 3, 2, 2],
        delimiters: [" (", ") ", "-", "-"],
        noImmediatePrefix: true,
      });
    }
		input.addEventListener('focus', self.selectIn(self));
    input.addEventListener('blur', self.selectOut(self));
	}


	init() {
		this.listeners(this.$input);
	}
}
import onChange from 'on-change';
import i18next from 'i18next';
import MyToster from '../modules/helpers/my-toster';


const toast = new MyToster({
  $wrap: document.querySelector('[data-toast-wrapper]'),
});

// BEGIN


const renderForm = (form, elements) => {
  const fieldsKey = Object.keys(elements.fields);

  switch (form.status) {
    case 'renderErrorValidation':
      elements.$btnSubmit.setAttribute('disabled', true);
      fieldsKey.forEach((key) => {
        const field = elements.fields[key];
        if(field.valid){
          field.inputWrapper.showSuccessStyle();
          field.inputWrapper.writeMessage(field.defaultMessage)
        } else {
          field.inputWrapper.showErrorStyle();
          field.inputWrapper.addSelectedStyle();
          field.inputWrapper.writeMessage(field.error[0]);
        }
      });
      break;
    case 'renderSuccessValidation':
      elements.$btnSubmit.removeAttribute('disabled');

      fieldsKey.forEach((key) => {
        const field = elements.fields[key];
          field.inputWrapper.showSuccessStyle();
          field.inputWrapper.writeMessage(field.defaultMessage)
      });
      break;
      
      
      case 'loading':
        fieldsKey.forEach((key) => {
          const field = elements.fields[key];
            field.inputWrapper.showLoadingStyle();
        });

        elements.$btnSubmit.setAttribute('disabled', true);
        elements.$btnSubmit.querySelector('[data-btn-submit-text]').innerHTML = i18next.t('sending');

        break;
      case 'successSand':
        fieldsKey.forEach((key) => {
          const field = elements.fields[key];
            field.inputWrapper.showDefaultStyle();
            field.inputWrapper.removeSelectedStyle();
        });
        elements.$form.reset();
        elements.$btnSubmit.setAttribute('disabled', false);
        elements.$btnSubmit.querySelector('[data-btn-submit-text]').innerHTML = i18next.t('send');
        /*  */
        toast.addToast({
          type: 'success',
          text: i18next.t('sendingSuccessText'),
          title: i18next.t('sendingSuccessTitle'),
        });
        break;








    case 'filling':
      break;
    case 'failed':
      toast.addToast({
        type: 'error',
        text: 'Повідомлення не було надіслано через невідому помилку серверу',
        title: 'Сталася помилка',
      });
      elements.submitBtn.removeAttribute('disabled');
      elements.input.removeAttribute('disabled');
      elements.input.select();
      break;


    default:
      throw Error(`Unknown form status: ${form.status}`);
  }
};

/* const renderFormErrors = (form, elements) => {
  const error = elements.input.nextSibling;
  if (error) {
    error.remove();
  }

  const field = form.fields.name;
  if (field.valid) {
    elements.input.classList.remove('is-invalid');
  } else {
    elements.input.classList.add('is-invalid');
    const errorElement = buildErrorElement(field.error);
    elements.input.after(errorElement);
  }
};

const renderForm = (error, elements) => {
  if (!error) return;
  const toastBody = elements.toast.querySelector('.toast-body');
  toastBody.textContent = error;
  $('.toast').toast('show');
} */

const initView = (state, elements) => {
  // elements.input.focus();

  const mapping = {
    'status': () => renderForm(state, elements),
    /* 
    'form.fields.name': () => renderFormErrors(state.form, elements),
    'form.submitCount': () => elements.input.focus(),
    error: () => renderAppError(state.error, elements),
    todos: () => renderTodos(state.todos, elements), */
  };

  const watchedState = onChange(state, (path, value) => {
    console.log(path, value);
    if (mapping[path]) {
      mapping[path]();
    }
  });

  return watchedState;
};

export default initView;
// END
import '../css/style.css';
import 'bootstrap/dist/css/bootstrap.css';

import UI from './config/ui.config';
import { validate } from './helpers/validate';
import { showInputError, removeInputError } from './views/form';
import { login } from './services/auth.service';
import { notify } from './views/notification';


const { form, inputEmail, inputPassword } = UI;
const inputs = [inputEmail, inputPassword];
//events
form.addEventListener('submit', e => {
    e.preventDefault();
    onSubmit();
});
inputs.forEach(el => el.addEventListener('focus', () => removeInputError(el)));

//Handlers

async function onSubmit() {
    const isValidForm = inputs.every( el => {
        const isValidInput = validate(el);
        if (!isValidInput) {
            showInputError(el);
        }
        return isValidInput;
    });

    if (!isValidForm) return;

    try {
        await login(inputEmail.ariaValueMax, inputPassword.value);
        // show notify
    } catch(err) {
        // show error
    }

    form.reset();
}

notify({msg: "Some notification 1", className: "alert-danger"});
notify({msg: "Some notification 2", className: "alert-warning"});
notify({msg: "Some notification 3", className: "alert-primary"});
import {BaseForm} from './base';
import {ValidationRules} from 'aurelia-validatejs';

export class ForgotPasswordForm extends BaseForm {
    
    properties = {
        email : '',
        callback : ''
    };
    
    bind() {
        ValidationRules
            .ensure('email').required().email()
            .on(this.properties);
    }
    
    resetPassword() {
        new Promise(() => {
            this.reset();            
            this.validate();
            this.submit(this.config.website.urls.forgot_password);
        })
        .catch(error => {
            console.log(error);
        });
    }
   
}

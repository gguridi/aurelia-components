import {BaseForm} from './base';
import {ValidationRules} from 'aurelia-validatejs';
import {ImplException} from '../exceptions';

export class ResetPasswordForm extends BaseForm {
    
    properties = {
        email : '',
        token : '',
        password : '',
        passwordConfirm : ''
    };

    activate(params, routeConfig) {
        super.activate(params, routeConfig);
        if (params) {
            this.properties.email = params.email || '';
            this.properties.token = params.token || '';
        }
        if (!this.properties.token) {
            this.errors.push('No token present in the request.');
        }
    }    
    
    bind() {
        ValidationRules 
            .ensure('email').required().email()
            .ensure('password').required()
            .ensure('passwordConfirm').required().equality('password')
            .on(this.properties);
    }
    
    resetPassword() {
        new Promise(() => {
            this.reset();
            this.validate();
            this.submit(this.config.website.urls.reset_password);
        })
        .catch(error => {
            console.log(error);
        });
    }        
    
    get loginUrl() {    
        throw new ImplException('loginUrl');
    }        
}

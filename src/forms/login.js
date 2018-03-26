import {BaseForm} from './base';
import {ImplException} from '../exceptions';
import {ValidationRules} from 'aurelia-validatejs';

export class LoginForm extends BaseForm {
    
    properties = {
        email : '',
        password : ''
    };    
    
    bind() {
        ValidationRules
            .ensure('email').required().email()
            .ensure('password').required()
            .on(this.properties);
    }    
    
    login() {
        this.authenticate().catch(error => {
            this.errors.push('Login credentials not provided.');
        });
    }    
    
    authenticate() {
        return this.validate().then(errors => {
            if (errors.length === 0) {
                return this.authentication.login(this.properties.email, this.properties.password);
            }
            throw new Error('Form validation failed.');            
        });
    }
    
    get forgotPasswordUrl() {    
        throw new ImplException('forgotPasswordUrl');
    }    
  
}

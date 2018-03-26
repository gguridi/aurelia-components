import {BootstrapFormValidationRenderer} from './form-validation-renderer';
import {BootstrapFormRenderer} from './validation-renderer';

export function configure(config) {
    config.container.registerHandler(
        'bootstrap-form',
        container => container.get(BootstrapFormValidationRenderer)
    );
    
    config.container.registerHandler(
        'bootstrap-',
        container => container.get(BootstrapFormRenderer)
    );
}

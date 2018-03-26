import {Aurelia, Lazy, NewInstance, inject, transient, bindable} from 'aurelia-framework';
import {DialogController} from 'aurelia-dialog';
import {EventAggregator} from 'aurelia-event-aggregator';
import {validateTrigger, ValidationController} from 'aurelia-validation';

@transient()
@inject(Aurelia, NewInstance.of(ValidationController), DialogController, EventAggregator)
export class Dialog {
    
    errors = [];
    
    constructor(Aurelia, ValidationController, DialogController, EventAggregator) {
        this.aurelia = Aurelia;        
        this.validationController = ValidationController;
        this.dialogController = DialogController;
        this.ea = EventAggregator;
        this.request = this.aurelia.container.get('RCMRequest');
        this.config = this.aurelia.container.get('Config');
    }
    
    activate(data, routeConfig) {
        this.showLoader();
        $.extend(this, {}, data);
        this.configure(data);        
    }
    
    configure(data) {
        this.validationController.validateTrigger = validateTrigger.change;        
    }
    
    get loader() {
        return this.aurelia.container.get('RCMDialogLoader');
    }
    
    showLoader() {
        this.loader.show();
    }
    
    hideLoader() {
        this.loader.hide();
    }
    
    reset() {
        this.errors = [];
    }
    
    cancel(data) {
        this.isCancelled = true;
        data = $.extend({}, data);
        this.dialogController.cancel(data);
    }
    
    ok(data) {
        data = $.extend({}, data);
        this.dialogController.ok(data);
    }
    
    isCancelled() {
        return this.isCancelled || false;
    }
    
    addError(message) {
        this.errors.push(message);
    }
    
    flushErrors() {
        this.errors = [];
    }
}
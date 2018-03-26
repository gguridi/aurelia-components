import {Aurelia, inject, NewInstance, bindable} from 'aurelia-framework';
import {Router} from 'aurelia-router';
import {EventAggregator} from 'aurelia-event-aggregator';
import {DialogService} from 'aurelia-dialog';
import {validateTrigger, ValidationController} from 'aurelia-validation';

@inject(Aurelia, Router, EventAggregator, DialogService, NewInstance.of(ValidationController))
export class BaseForm {
    
    @bindable errors = [];
    @bindable messages = [];
    
    showLoading = true;
    
    constructor(Aurelia, Router, EventAggregator, DialogService, ValidationController) {
        this.aurelia = Aurelia;
        this.router = Router;
        this.ea = EventAggregator;
        this.dialogService = DialogService;
        this.validationController = ValidationController;
        this.config = this.aurelia.container.get('Config');
        this.authentication = this.aurelia.container.get('RCMAuthentication');
        this.initialize();
    }
    
    initialize() {
        
    }
    
    get request() {
        return this.aurelia.container.get('RCMRequest');
    }
    
    get method() {
        return 'post';
    }
    
    activate(params, routeConfig) {
        $.extend(this.properties, params);
        this.configure(params, routeConfig); 
    }
    
    canActivate(params, routeConfig) {
        return this.authentication.check(routeConfig);
    }
    
    attached() {
        this.hideLoader();
    }
    
    configure(params, routeConfig) {
        this.validationController.validateTrigger = validateTrigger.manual;        
    }
    
    validate() {
        return this.validationController.validate();
    }
    
    submit(url) {
        return this.validate().then(errors => {
            if (errors.length === 0) {
                return this.process(url);
            }
            throw new Error('Form validation failed.');            
        });        
    }
    
    process(url) {
        this.showLoader();        
        return this.request
            .request(this.method, url, { 
                body : this.getQuery()
            })
            .then(response => {
                this.hideLoader();
                if (response.isSuccess()) {
                    this.messages = response.messages;
                } else {
                    this.errors = response.messages;
                }
                return response;
            });
    }
    
    reset() {
        this.errors = this.messages = [];
    }
    
    getQuery() {
        return $.extend({}, this.properties);
    }
    
    showLoader() {
        if (this.showLoading) {
            this.aurelia.container.get('RCMLoader').show();
        }
    }
    
    hideLoader() {
        if (this.showLoading) {
            this.aurelia.container.get('RCMLoader').hide();    
        }
    }
    
    showNotifier(options) {
        this.aurelia.container.get('RCMNotifier').show(options);
    }
    
    hideNotifier(options) {
        this.aurelia.container.get('RCMNotifier').hide();
    }    
    
}

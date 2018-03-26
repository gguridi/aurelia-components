import {Dialog} from './dialog';

export class DialogCRUD extends Dialog {
    
    /**
     * Properties of this dialog model.
     */
    properties = {};
    
    get id() {
        return this.collection.constructor.name.toLowerCase();
    }
    
    setFromEvent(property, event) {
        this.properties[property] = event.detail.event.target.value;
    }    
    
    /**
     * Adds the validation rules for this dialog.
     * 
     * import {ValidationRules} from 'aurelia-validatejs';
     * ValidationRules
     *   .ensure('name').required()
     *   .on(this.properties);
     * 
     * @returns {void}
     */
    bind() {
    }

    attached() {
        this.hideLoader();
    }
    
    submit() {
        this.validationController.validate().then(errors => {
            if (errors.length === 0) {
                this.save();
            }            
        });
    }
    
    getMethod() {
        return (typeof this.properties._id === "undefined") ? "post" : "put";
    }
    
    getEndpoint() {
        return this.collection.getEndpoint(this.properties._id);
    }
    
    save() {
        this.showLoader();
        this.request
                .useAuthToken()
                .request(this.getMethod(), this.getEndpoint(), {
                    body : this.getQuery()
                })
                .then(response => {
                    this.hideLoader();
                    (!response.isSuccess()) ? this.error(response) : this.success(response);
                });
    }
    
    error(response) {
        this.errors = response.messages;
    }
    
    success(response) {
        this.ok(this.properties);
        this.collection.showNotifier({
            'type'   : 'success',
            'message': response.SAVE_SUCCESS,
            'delay'  : 5000
        });
    }
    
    getQuery() {
        return $.extend({}, this.properties);
    }
}

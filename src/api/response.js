import {Aurelia, inject, transient, Lazy} from 'aurelia-framework';

@transient()
@inject(Aurelia)
export class Response {
    
    LOGIN_INVALID = 'Invalid login credentials provided.';
    API_SUCCESS = 'success';
    API_ACCESS_DENIED = 'Access denied.';
    API_NOT_AVAILABLE = 'Failed to fetch';
    API_ERROR_LOADING = 'There was a problem loading the data.';
    SAVE_SUCCESS = 'Record was saved successfully.';
    SAVE_ERROR = 'Record could not be saved.';
    RECORD_UPDATE_SUCCESS = 'Record was updated successfully.';
    DELETE_SUCCESS = 'Record was deleted successfully.';
    FLAG_SUCCESS = 'Record was flagged successfully.';
    APPROVE_SUCCESS = 'Record was approved successfully.';
    PASSWORD_RESET_SUCCESS = 'Password reset was successful; please check email.';
    UPLOAD_SUCCESS = 'Upload was successful.';
    RECORD_NOT_FOUND = 'Record not found.';
    
    response = {};
    
    constructor(Aurelia) {
        this.aurelia = Aurelia;
        this.notifier = this.aurelia.container.get('RCMNotifier');
        this.config = this.aurelia.container.get('Config');
    }
    
    process(response) {
        this.response = response;
        if (!this.isSuccess()) {
            this.needsLogin() || this.needsAction() || this.needsDefault();
        }
    }
    
    needsLogin() {
        if ($.inArray(this.API_ACCESS_DENIED, this.response.messages) > 0) {
            let authentication = this.aurelia.container.get('RCMAuthentication');
            authentication.logout();
        }
    }
    
    needsAction() {
        if (this.response.messages.length > 0) {
            return true;
        }
    }
    
    needsDefault() {
        this.notify(this.API_ERROR_LOADING);
    }
    
    get payload() {
        return this.response.payload;
    }
    
    get messages() {
        return this.response.messages || [];
    }
    
    isSuccess() {
        return this.response.status === this.API_SUCCESS;
    }
    
    isFailure() {
        return !this.isSuccess();
    }
    
    isError(message, error) {
        return message.indexOf(error) > -1;
    }
    
    isServerError(message) {
        return this.isError(message, this.API_NOT_AVAILABLE);
    }
    
    notify(message) {
        this.notifier.show({
            'type'   : 'warning',
            'message': message,
            'delay'  : 5000
        });
    }

}

import {BaseForm} from './base';
import {ImplException} from '../exceptions';

export class CRUDForm extends BaseForm {
    
    properties = {};
    
    get route() {
        throw new ImplException('route');
    }
    
    getEndpoint(id) {
        return (id) ? this.endpoint + '/' + id : this.endpoint;
    }
    
    fetch(parameters) {
        this.showLoader();
        return this.request
            .useAuthToken()
            .get(this.getEndpoint(this.id), {
                params: this.getQuery(parameters)
            })
            .then(response => {
                this.setProperties(response.payload);
                this.hideLoader();
                return response;
            });
    }    
    
    submit(url) {
        super.submit(url || this.getEndpoint(this.id));
    }
    
    process(url) {
        super.process(url)
            .then(response => {
                if (response.isSuccess()) {
                    this.success(response);
                } else {
                    this.error(response);
                }
                return response;
            });
    }
    
    configure(params, routeConfig) {
        super.configure(params, routeConfig);
        this.setDocumentId(params);
    }
    
    bind() {
        this.fetch();
    }
    
    setDocumentId(params) {
        if (params && params.documentID && isNaN(params.documentID)) {
            this.id = params.documentID;
        }
    }
    
    setProperties(properties) {
        this.properties = properties;
    }
    
    success(response, message) {
        this.showNotifier({
            'type'   : 'success',
            'message': message || response.SAVE_SUCCESS,
            'delay'  : 5000
        });
    }
    
    error(response, message) {
        this.showNotifier({
            'type'   : 'error',
            'message': message || response.SAVE_ERROR,
            'delay'  : 5000
        });
    }
    
}

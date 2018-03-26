import {Collection} from './collection';
import {DialogCRUD} from './../dialogs/crud';
import {DialogDelete} from './../dialogs/dialog-delete';
import {ImplException} from '../exceptions';

export class CRUD extends Collection {
    
    get endpoint() {
        throw new ImplException('endpoint');
    }
    
    get pageMax() {
        return parseInt(Math.ceil(parseInt(this.totalRecords) / parseInt(this.pagination.limit)));
    }
    
    get request() {
        return this.aurelia.container.get('RCMRequest');
    }
    
    get crudDialog() {
        return DialogCRUD;
    }
    
    get deleteDialog() {
        return DialogDelete;    
    }
    
    getEndpoint(id) {
        return (id) ? this.endpoint + '/' + id : this.endpoint;
    }
    
    fetch(parameters) {
        this.showLoader();
        return this.request
            .useAuthToken()
            .get(this.endpoint, {
                params: this.getQuery(parameters)
            })
            .then(result => {
                this.processRecords(result.payload.records);
                this.totalRecords = result.payload.totalRecords;
                this.pagination.limit = result.payload.pageLimit;
                this.processTotals(result.payload);
                this.hideLoader();
            });
    }
    
    set search(value) {
        let query = {
            search: value,
            searchFields: this.searchFields || 'name,description'
        };
        this.fetch(query);
    }
    
    processRecords(records) {
        this.records = $.map(records,(item) => {
            let entry = this.aurelia.container.get(this.entryModel);
            entry.initialize(item);
            return entry;
        });
    }
    
    /**
     * Processes the totals for this collection.
     * 
     * @param {array} payload
     *   Original response. If you need the processed ones check this.records
     *   
     * @returns {void}
     */
    processTotals(payload) {
        this.totals = this.aurelia.container.get(this.totalsModel);
        this.totals.initialize(this.records).calculate(); 
    }
    
    fetchOne(model){
        this.showLoader();
        return this.request
            .useAuthToken()
            .get(this.getEndpoint(model._id))
            .then(response => {
                this.hideLoader();
                return response.payload;
            });
    }
    
    add(model, options, event) {
        event.stopPropagation();
        let settings = {
            viewModel: this.crudDialog,
            model: $.extend({
                properties: model || {},
                collection: this
            }, options)
        };
        
        this.dialogService.open(settings)
            .then(response => {
            if (!response.wasCancelled) {
                this.fetch();
            }
        });
    }
    
    edit(model, options, event) {
        event.stopPropagation();
        this.fetchOne(model).then(data => {
            this.add(data, options, event);
        });
    }
    
    deleteConfirm(model, options, event) {
        event.stopPropagation();
        this.dialogService.open({
            viewModel: this.deleteDialog,
            model: $.extend({
                properties: model || {},
                collection: this
            }, options)
        }).then(response => {
            if (!response.wasCancelled) {
                return this.deleteModel(model);
            }
        });
    }    
    
    deleteModel(model) {
        return this.request
            .useAuthToken()
            .delete(this.endpoint + '/' + model._id)
            .then(response => {
                this.fetch();
                this.success(model);
                return model;
            })
            .catch(error => {
                this.error(error);
            });
    }
    
    success(model) {
        let processor = this.aurelia.container.get('RCMResponse');
        this.showNotifier({
            'type'   : 'success',
            'message': processor.DELETE_SUCCESS + ' - ' + model.name,
            'delay'  : 5000
        });        
    }
    
    error(error) {
        let dialog = this.aurelia.container.get(this.dialogDelete);
        dialog.error = error.message;        
    }
    
}